/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: Map is a component from maplibre */

import { Map, MapProps } from "@vis.gl/react-maplibre";
import { MAP_STYLES } from "@/assets/data/mapbox";
import { useTheme } from "@/hooks/use-theme";

export const MapWrapper: React.FC<MapProps> = ({ children, ...mapProps }) => {
  const { theme } = useTheme();

  if (theme === "dark") {
    return (
      <Map
        style={{
          width: "100%",
          height: "100%",
        }}
        mapStyle="/assets/dark-map.json"
        {...mapProps}
      >
        {children}
      </Map>
    );
  }
  return (
    <Map
      style={{
        width: "100%",
        height: "100%",
      }}
      mapStyle={MAP_STYLES["openfreemap-liberty"]}
      {...mapProps}
    >
      {children}
    </Map>
  );
};
