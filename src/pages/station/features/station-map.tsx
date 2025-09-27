/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: Map is a component from maplibre */

import { Marker } from "@vis.gl/react-maplibre";
import { LocationMarker } from "@/assets/icons";
import { MapWrapper } from "@/components/common/map-wrapper";
import { useTheme } from "@/hooks/use-theme";
import { StationMetadata } from "@/types/station-metadata";

export const StationMap = ({ data }: { data: StationMetadata }) => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-full rounded-md overflow-hidden">
      <MapWrapper
        id="single-station-map"
        hash="map"
        reuseMaps={true}
        initialViewState={{
          longitude: +data?.STATION?.[0]?.LONGITUDE,
          latitude: +data?.STATION?.[0]?.LATITUDE,
          zoom: 12,
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "default",
        }}
      >
        <Marker
          longitude={+data?.STATION?.[0]?.LONGITUDE}
          latitude={+data?.STATION?.[0]?.LATITUDE}
        >
          <LocationMarker className="size-8 text-blue-600 dark:text-blue-400" />
        </Marker>
      </MapWrapper>
    </div>
  );
};
