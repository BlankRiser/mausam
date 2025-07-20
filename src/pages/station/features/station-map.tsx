import { MAP_STYLES } from "@/assets/data/mapbox";
import { LocationMarker } from "@/assets/icons";
import { useTheme } from "@/hooks/use-theme";
import { useKeysStore } from "@/store/env-keys.store";
import { StationMetadata } from "@/types/station-metadata";
import Map, { Marker } from "react-map-gl";

export const StationMap = ({ data }: { data: StationMetadata }) => {
  const { theme } = useTheme();
  const mapboxToken = useKeysStore((state) => state.mapboxToken);

  return (
    <div className="w-full h-full rounded-md overflow-hidden">
      <Map
        id="single-station-map"
        hash="map"
        reuseMaps={true}
        mapboxAccessToken={mapboxToken}
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
        mapStyle={
          theme === "dark"
            ? MAP_STYLES["mapbox-dark"]
            : MAP_STYLES["mapbox-streets"]
        }
      >
        <Marker
          longitude={+data?.STATION?.[0]?.LONGITUDE}
          latitude={+data?.STATION?.[0]?.LATITUDE}
        >
          <LocationMarker className="size-8 text-blue-600 dark:text-blue-400" />
        </Marker>
      </Map>
    </div>
  );
};
