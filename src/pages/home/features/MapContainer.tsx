import { useMediaQuery } from "@uidotdev/usehooks";
import { NavigationControl } from "@vis.gl/react-maplibre";
import { useStationMetadata } from "@/api/use-station-data";
import { GlobalErrorBoundary } from "@/components/common/GlobalErrorBoundary";
import { MapWrapper } from "@/components/common/map-wrapper";
import { Loader } from "@/components/ui/loader";
import { StationMarker } from "./station-marker";
import { VariableSelector } from "./variable-selector";

export const MapContainer = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { data, refetch, isFetching } = useStationMetadata();

  return (
    <GlobalErrorBoundary>
      <div className="relative w-full h-full">
        <MapWrapper
          id="map"
          hash="map"
          reuseMaps={true}
          onZoomEnd={() => {
            console.log("zoom end");
            void refetch();
          }}
          onDragEnd={() => {
            void refetch();
          }}
          onMoveEnd={() => {
            void refetch();
          }}
          initialViewState={{
            longitude: -113.698,
            latitude: 37.155,
            zoom: 7,
          }}
        >
          <div className="z-10 bg-red-400 h-[50vh] w-[40vw]">
            ljadnlasdlkmlkm
          </div>
          {!isSmallDevice && <NavigationControl position="bottom-left" />}
          {!!data && (
            <StationMarker stations={data.STATION} units={data.UNITS} />
          )}
        </MapWrapper>
        {isFetching ? (
          <div className="w-fit h-fit z-100 absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-transparent flex justify-center items-center">
            <Loader />
          </div>
        ) : null}
        <div className="absolute bottom-8 inset-x-0 grid place-items-center ">
          <VariableSelector />
        </div>
      </div>
    </GlobalErrorBoundary>
  );
};
