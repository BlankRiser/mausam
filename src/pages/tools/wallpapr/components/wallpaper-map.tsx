import { MAP_STYLES } from "@/assets/data/mapbox";
import { MapWrapper } from "@/components/common/map-wrapper";
import { MapRef } from "@vis.gl/react-maplibre";
import { useRef } from "react";

export function WallpaperMap() {
  const mapRef = useRef<MapRef>(null);

  return (
    <div className="w-full h-[calc(100dvh-2.6rem)] flex items-center justify-center bg-muted/50 p-4">
      <div className="w-full h-full max-h-[100%] rounded-xl overflow-hidden shadow-2xl ring-1 ring-border relative">
        <MapWrapper
          ref={mapRef}
          id="wallpaper-map"
          hash="wallpaper-map"
          reuseMaps={true}
          mapStyle={MAP_STYLES["openfreemap-liberty"]}
          canvasContextAttributes={{ preserveDrawingBuffer: true }}
          initialViewState={{
            zoom: 14.65,
            latitude: 12.91524,
            longitude: 77.62513,
          }}
        >
          <div className="w-full h-full" />
        </MapWrapper>
      </div>
    </div>
  );
}
