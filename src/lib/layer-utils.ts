import type { FeatureCollection, Point } from 'geojson';
import type {
  Map as MapLibreMap,
  MapLayerMouseEvent,
  MapStyleImageMissingEvent,
  SymbolLayerSpecification,
} from 'maplibre-gl';
import {
  buildMarkerIconId,
  MarkerRenderOptions,
  MarkerVariant,
  parseMarkerIconId,
  renderMarkerImage,
  ResolvedTheme,
} from './canvas-utils';
import { MinMax, Station } from '@/types/station';

export const DEFAULT_MARKER_SOURCE_ID = 'canvas-markers-source';
export const DEFAULT_MARKER_LAYER_ID = 'canvas-markers-layer';

export interface MarkerLayerItem<T = unknown> {
  id: string;
  longitude: number;
  latitude: number;
  label: string;
  variant?: MarkerVariant;
  data: T;
}

export function createMarkerSymbolLayerStyle(
  layerId: string = DEFAULT_MARKER_LAYER_ID
): Omit<SymbolLayerSpecification, 'source'> {
  return {
    id: layerId,
    type: 'symbol',
    layout: {
      'icon-image': ['get', 'iconId'],
      'icon-size': 1,
      'icon-anchor': 'center',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'symbol-sort-key': ['get', 'sortKey'],
    },
  };
}

export function buildMarkerLookup<T>(items: Array<MarkerLayerItem<T>> | undefined): Map<string, MarkerLayerItem<T>> {
  const lookup = new Map<string, MarkerLayerItem<T>>();
  if (!items) return lookup;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    lookup.set(item.id, item);
  }
  return lookup;
}

export function buildMarkerGeoJson<T>(
  items: Array<MarkerLayerItem<T>>,
  defaultVariant: MarkerVariant,
  theme: ResolvedTheme,
  selectedId: string | null
): {
  geojson: FeatureCollection<Point>;
  uniqueIconOptions: Map<string, MarkerRenderOptions>;
} {
  const uniqueIconOptions = new Map<string, MarkerRenderOptions>();
  const features: FeatureCollection<Point>['features'] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const isSelected = item.id === selectedId;
    const opts: MarkerRenderOptions = {
      variant: item.variant ?? defaultVariant,
      label: item.label,
      theme,
      isSelected,
    };
    const iconId = buildMarkerIconId(opts);
    if (!uniqueIconOptions.has(iconId)) {
      uniqueIconOptions.set(iconId, opts);
    }

    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [item.longitude, item.latitude],
      },
      properties: {
        id: item.id,
        iconId,
        sortKey: isSelected ? 1 : 0,
      },
    });
  }

  return {
    geojson: {
      type: 'FeatureCollection',
      features,
    },
    uniqueIconOptions,
  };
}

export function syncMapMarkerImages(
  map: MapLibreMap,
  uniqueIconOptions: Map<string, MarkerRenderOptions>
): void {
  for (const [iconId, opts] of uniqueIconOptions) {
    if (!map.hasImage(iconId)) {
      const rendered = renderMarkerImage(opts);
      if (rendered) {
        map.addImage(
          iconId,
          { width: rendered.width, height: rendered.height, data: rendered.data },
          { pixelRatio: rendered.pixelRatio }
        );
      }
    }
  }
}

export function registerMarkerLayerEvents<T>(
  map: MapLibreMap,
  layerId: string,
  itemById: Map<string, MarkerLayerItem<T>>,
  onSelect?: (item: MarkerLayerItem<T>) => void
): () => void {
  const handleStyleImageMissing = (e: MapStyleImageMissingEvent) => {
    if (map.hasImage(e.id)) return;
    const parsed = parseMarkerIconId(e.id);
    if (!parsed) return;
    const rendered = renderMarkerImage(parsed);
    if (rendered && !map.hasImage(e.id)) {
      map.addImage(
        e.id,
        { width: rendered.width, height: rendered.height, data: rendered.data },
        { pixelRatio: rendered.pixelRatio }
      );
    }
  };

  const handleLayerClick = (e: MapLayerMouseEvent) => {
    if (!onSelect) return;
    const feature = e.features?.[0];
    const id = feature?.properties?.id as string | undefined;
    if (!id) return;
    const item = itemById.get(id);
    if (item) {
      e.originalEvent.stopPropagation();
      onSelect(item);
    }
  };

  const handleMouseEnter = () => {
    map.getCanvas().style.cursor = 'pointer';
  };

  const handleMouseLeave = () => {
    map.getCanvas().style.cursor = '';
  };

  map.on('styleimagemissing', handleStyleImageMissing);
  map.on('click', layerId, handleLayerClick);
  map.on('mouseenter', layerId, handleMouseEnter);
  map.on('mouseleave', layerId, handleMouseLeave);

  return () => {
    map.off('styleimagemissing', handleStyleImageMissing);
    map.off('click', layerId, handleLayerClick);
    map.off('mouseenter', layerId, handleMouseEnter);
    map.off('mouseleave', layerId, handleMouseLeave);
  };
}

export interface SensorVariableDetails {
  latest: {
    value: number;
    date_time: string;
  };
  minMax?: MinMax;
}

export function getSensorVariableDetails(
  station: Station,
  selectedVariable: keyof typeof station.SENSOR_VARIABLES
): SensorVariableDetails | null {
  const sensorVariable = station.SENSOR_VARIABLES?.[selectedVariable];
  if (!sensorVariable) return null;

  let latest: SensorVariableDetails['latest'] | undefined;
  let minMax: SensorVariableDetails['minMax'];

  for (const key in sensorVariable) {
    if (station.OBSERVATIONS?.[key]) {
      latest = station.OBSERVATIONS[key] as SensorVariableDetails['latest'];
    }
    minMax = station.MINMAX?.[key] as SensorVariableDetails['minMax'];
  }

  if (!latest) return null;
  return { latest, minMax };
}

export function prepareStationMarkers(
  stations: Array<Station> | undefined,
  currentVariable: keyof Station['SENSOR_VARIABLES']
): Array<MarkerLayerItem<Station>> {
  if (!stations?.length) return [];
  const items: Array<MarkerLayerItem<Station>> = [];

  for (let i = 0; i < stations.length; i++) {
    const station = stations[i];
    const data = getSensorVariableDetails(station, currentVariable);
    if (!data?.latest || data.latest.value == null || !data.latest.value) continue;

    const longitude = +station.LONGITUDE;
    const latitude = +station.LATITUDE;
    if (Number.isNaN(longitude) || Number.isNaN(latitude)) continue;

    items.push({
      id: station.STID,
      longitude,
      latitude,
      label: data.latest.value.toFixed(0),
      data: station,
    });
  }

  return items;
}
