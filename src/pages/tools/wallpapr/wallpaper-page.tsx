import { GlobalErrorBoundary } from "@/components/common/GlobalErrorBoundary";
import { MapProvider } from "@vis.gl/react-maplibre";
import { WallpaperControls } from "./components/wallpaper-controls";
import { WallpaperMap } from "./components/wallpaper-map";

export function WallpaperPage() {
  return (
    <GlobalErrorBoundary>
      <MapProvider>
        <div className="flex h-[calc(100dvh-2.8rem)] w-full bg-background overflow-hidden">
          <div className="w-80 shrink-0 h-full border-r bg-card z-10 shadow-xl">
            <WallpaperControls />
          </div>
          <div className="flex-1 h-full relative">
            <WallpaperMap />
          </div>
        </div>
      </MapProvider>
    </GlobalErrorBoundary>
  );
}
