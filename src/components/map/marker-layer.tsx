import { Layer, Source, useMap } from '@vis.gl/react-maplibre';
import { useEffect, useMemo } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { MarkerVariant, ResolvedTheme } from '@/lib/canvas-utils';
import {
  buildMarkerGeoJson,
  buildMarkerLookup,
  createMarkerSymbolLayerStyle,
  DEFAULT_MARKER_LAYER_ID,
  DEFAULT_MARKER_SOURCE_ID,
  MarkerLayerItem,
  registerMarkerLayerEvents,
  syncMapMarkerImages,
} from '@/lib/layer-utils';

export interface MarkerLayerProps<T = unknown> {
  items: Array<MarkerLayerItem<T>>;
  variant?: MarkerVariant;
  selectedId?: string | null;
  onSelect?: (item: MarkerLayerItem<T>) => void;
  sourceId?: string;
  layerId?: string;
}

export function MarkerLayer<T = unknown>({
  items,
  variant = 'square',
  selectedId = null,
  onSelect,
  sourceId = DEFAULT_MARKER_SOURCE_ID,
  layerId = DEFAULT_MARKER_LAYER_ID,
}: MarkerLayerProps<T>) {
  const { map: mapRef } = useMap();
  const { theme } = useTheme();

  const resolvedTheme: ResolvedTheme = useMemo(() => {
    if (theme === 'dark' || theme === 'light') return theme;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }, [theme]);

  const itemById = useMemo(() => buildMarkerLookup(items), [items]);

  const layerStyle = useMemo(() => createMarkerSymbolLayerStyle(layerId), [layerId]);

  const { geojson, uniqueIconOptions } = useMemo(
    () => buildMarkerGeoJson(items, variant, resolvedTheme, selectedId),
    [items, variant, resolvedTheme, selectedId]
  );

  useEffect(() => {
    const map = mapRef?.getMap();
    if (!map) return;
    syncMapMarkerImages(map, uniqueIconOptions);
  }, [mapRef, uniqueIconOptions]);

  useEffect(() => {
    const map = mapRef?.getMap();
    if (!map) return;
    return registerMarkerLayerEvents(map, layerId, itemById, onSelect);
  }, [mapRef, layerId, itemById, onSelect]);

  return (
    <Source id={sourceId} type='geojson' data={geojson}>
      <Layer {...layerStyle} />
    </Source>
  );
}
