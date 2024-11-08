import { useStationMetadata } from "@/api/use-station-data";
import { MAP_STYLES } from "@/assets/data/mapbox";
import { GlobalErrorBoundary } from "@/components/common/GlobalErrorBoundary";
import { Loader } from "@/components/ui/loader";
import { useTheme } from "@/hooks/use-theme";
import { useKeysStore } from "@/store/env-keys.store";
import Map, { NavigationControl } from "react-map-gl";
import { StationMarker } from "./station-marker";
import VariableSelector from "./variable-selector";

export default function MapContainer() {
  const { theme } = useTheme();
  const { isLoading, data, refetch, isFetching } = useStationMetadata();

  return (
    <GlobalErrorBoundary>
      <div className="relative w-full h-full">
        <Map
          id="map"
          hash="map"
          reuseMaps={true}
          onZoomEnd={() => {
            void refetch();
          }}
          onDragEnd={() => {
            void refetch();
          }}
          onMoveEnd={() => {
            void refetch();
          }}
          mapboxAccessToken={useKeysStore.getState().mapboxToken}
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
          <StationMarker stations={data?.STATION} />
        </Map>
        {isLoading || isFetching ? (
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
