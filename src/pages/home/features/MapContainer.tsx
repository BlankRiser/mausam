import { useStationMetadata } from "@/api/use-station-data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Map, { Marker, NavigationControl, useMap } from "react-map-gl";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useCurrentStation } from "@/providers/station-store";

export default function MapContainer() {
  // map is the "id" attribute of <Map/>
  // https://visgl.github.io/react-map-gl/docs/api-reference/use-map
  const { setCurrentStation } = useCurrentStation();
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
          <Tooltip key={station.STID} delayDuration={0}>
            <Marker
              latitude={+station.LATITUDE}
              longitude={+station.LONGITUDE}
              onClick={() => {
                setCurrentStation(station);
              }}
            >
              <TooltipTrigger>
                <div className="z-50 w-3 h-3 bg-neutral-50 border rounded-full border-neutral-900 hover:bg-neutral-300" />
              </TooltipTrigger>
              <RadixTooltip.Portal>
                <TooltipContent>
                  <p>{station.NAME}</p>
                </TooltipContent>
              </RadixTooltip.Portal>
            </Marker>
          </Tooltip>
        );
      })}
    </Map>
  );
}
