import { useStationMetadata } from "@/api/use-station-data";
import { MapMarker } from "@/assets/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useCurrentStation } from "@/providers/station-store";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import Map, { Marker, NavigationControl, useMap } from "react-map-gl";

export default function MapContainer() {
  // map is the "id" attribute of <Map/>
  // https://visgl.github.io/react-map-gl/docs/api-reference/use-map
  const { currentStation, setCurrentStation } = useCurrentStation();
  const { map } = useMap();

  const { mutate, data, isLoading } = useStationMetadata({
    map: map,
  });

  const fetchMapData = () => {
    mutate();
  };

  return (
    <Map
      id="map"
      hash="map"
      reuseMaps
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_KEY}
      initialViewState={{
        longitude: -113.698,
        latitude: 37.155,
        zoom: 7,
      }}
      style={{ width: "100%", height: "100%", cursor: "default" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onZoomEnd={() => {
        fetchMapData();
      }}
      onDragEnd={() => {
        fetchMapData();
      }}
      onMoveEnd={() => {
        fetchMapData();
      }}
      onLoad={() => {
        fetchMapData();
      }}
    >
      {isLoading && <div className="absolute top-0 inset-x-0 z-10 text-center bg-white">loading...</div>}
      <NavigationControl position="top-left" />
      {data?.STATION?.map((station) => {
        return (
          <Tooltip key={station.STID} delayDuration={0} open={currentStation?.STID === station.STID}>
            <Marker
              latitude={+station.LATITUDE}
              longitude={+station.LONGITUDE}
              onClick={() => {
                setCurrentStation(station);
              }}
            >
              <TooltipTrigger>
                <div
                  className={cn(
                    "z-50 w-3 h-3 rounded-full grid place-items-center",
                    currentStation?.STID === station.STID
                      ? "bg-transparent"
                      : "bg-neutral-50 border border-neutral-900 hover:bg-neutral-300",
                  )}
                >
                  {currentStation?.STID === station.STID ? <MapMarker /> : null}
                </div>
              </TooltipTrigger>
              <RadixTooltip.Portal>
                <TooltipContent className="flex flex-col justify-center items-center">
                  <p className="text-lg font-semibold text-neutral-50">{station.STID}</p>
                  <p className="text-sm font-semibold text-neutral-200">{station.NAME}</p>
                  <p className="text-xs font-semibold text-neutral-200">{station.MNET_SHORTNAME}</p>
                </TooltipContent>
              </RadixTooltip.Portal>
            </Marker>
          </Tooltip>
        );
      })}
    </Map>
  );
}
