import { useStationMetadata } from "@/api/use-station-data";
import { MAP_STYLES } from "@/assets/data/mapbox";
import { GlobalErrorBoundary } from "@/components/common/GlobalErrorBoundary";
import { Loader } from "@/components/ui/loader";
import { useTheme } from "@/hooks/use-theme";
import { useEffect, useState } from "react";
import Map, { NavigationControl, useMap } from "react-map-gl";
import { StationMarker } from "./station-marker";
import VariableSelector from "./variable-selector";

export default function MapContainer() {
  // map is the "id" attribute of <Map/>
  // https://visgl.github.io/react-map-gl/docs/api-reference/use-map
  const { map } = useMap();
  const { theme } = useTheme();

  const [isMutating, setIsMutating] = useState(false);

  const { data, mutate, isLoading, isSuccess } = useStationMetadata({
    map: map,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsMutating(false);
    }
  }, [isSuccess]);

  const fetchMapData = () => {
    if (isMutating) return;
    mutate();
  };

  return (
    <GlobalErrorBoundary>
      <div className="relative w-full h-full">
        <Map
          id="map"
          hash="map"
          reuseMaps
          onLoad={fetchMapData}
          onZoomEnd={fetchMapData}
          onDragEnd={fetchMapData}
          onMoveEnd={fetchMapData}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_KEY}
          initialViewState={{
            longitude: -113.698,
            latitude: 37.155,
            zoom: 7,
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
          <NavigationControl position="top-left" />
          <StationMarker stations={data?.["STATION"]} />
        </Map>
        {isLoading || isMutating ? (
          <div className="w-fit h-fit z-[100] absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-transparent flex justify-center items-center">
            <Loader />
          </div>
        ) : null}

        <div className="absolute right-4 inset-y-0 grid place-items-center ">
          <VariableSelector />
        </div>
      </div>
    </GlobalErrorBoundary>
  );
}
