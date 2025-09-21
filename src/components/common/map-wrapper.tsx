/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: Map is a component from react-map-gl */
import Map, { MapProps } from "react-map-gl";
import { MAP_STYLES } from "@/assets/data/mapbox";
import { useTheme } from "@/hooks/use-theme";
import { useKeysStore } from "@/store/env-keys.store";

export const MapWrapper: React.FC<MapProps> = ({ ...mapProps }) => {
  const { theme } = useTheme();
  const mapboxToken = useKeysStore((state) => state.mapboxToken);

  if (theme === "dark") {
    return (
      <Map
        {...(mapboxToken &&
          {
            //   mapboxAccessToken: mapboxToken,
          })}
        style={{
          width: "100%",
          height: "100%",
        }}
        mapStyle={"/assets/dark-map.json"}
        {...mapProps}
      />
    );
  }
  return (
    <Map
      {...(mapboxToken && {
        mapboxAccessToken: mapboxToken,
      })}
      style={{
        width: "100%",
        height: "100%",
      }}
      mapStyle={MAP_STYLES["openfreemap-liberty"]}
      {...mapProps}
    />
  );
};
