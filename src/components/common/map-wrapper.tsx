import { Map, MapProps } from "@vis.gl/react-maplibre";
import { MAP_STYLES } from "@/assets/data/mapbox";
import { useTheme } from "@/hooks/use-theme";
import { forwardRef } from "react";

export const MapWrapper = forwardRef<any, MapProps>(({ children, ...mapProps }, ref) => {
  const { theme } = useTheme();

  const mapStyle = theme === "dark" ? "/assets/dark-map.json" : MAP_STYLES["openfreemap-liberty"];

  return (
    <Map ref={ref} style={{ width: "100%", height: "100%" }} mapStyle={mapStyle} {...mapProps}>
      {children}
    </Map>
  );
});

MapWrapper.displayName = "MapWrapper";
