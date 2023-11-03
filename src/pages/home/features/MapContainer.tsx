import { useStationMetadata } from "@/api/use-station-data";
import { MapMarker } from "@/assets/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { useCurrentStation } from "@/providers/station-store";
import { STATION } from "@/types/synoptic";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import Map, { Marker, NavigationControl, useMap } from "react-map-gl";

// https://docs.mapbox.com/api/maps/styles/
const MAP_STYLES = {
  "mapbox-light": "mapbox://styles/mapbox/light-v11",
  "mapbox-dark": "mapbox://styles/mapbox/dark-v11",
  "mapbox-navigation-light": "mapbox://styles/mapbox/navigation-day-v1",
  "mapbox-navigation-dark": "mapbox://styles/mapbox/navigation-night-v1",
  "mapbox-streets": "mapbox://styles/mapbox/streets-v12",
  "mapbox-outdoors": "mapbox://styles/mapbox/outdoors-v12",
  "mapbox-satellite": "mapbox://styles/mapbox/satellite-v9",
  "mapbox-satellite-streets": "mapbox://styles/mapbox/satellite-streets-v12",
};

export default function MapContainer() {
  // map is the "id" attribute of <Map/>
  // https://visgl.github.io/react-map-gl/docs/api-reference/use-map
  const { currentStation, setCurrentStation } = useCurrentStation();
  const { theme } = useTheme();
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
      mapStyle={theme === "dark" ? MAP_STYLES["mapbox-dark"] : MAP_STYLES["mapbox-light"]}
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
      {isLoading && <div className="absolute top-0 inset-x-0 z-10 text-center bg-white dark:bg-black">loading...</div>}
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
                <div
                  className={cn(
                    "z-50 w-3 h-3 rounded-full grid place-items-center",
                    currentStation?.STID === station.STID
                      ? "bg-transparent"
                      : "bg-neutral-50 dark:bg-neutral-300 dark:hover:bg-neutral-800 border dark:border-neutral-900 border-neutral-900 hover:bg-neutral-300",
                  )}
                >
                  {currentStation?.STID === station.STID ? <MapMarker /> : null}
                </div>
              </TooltipTrigger>
              <RadixTooltip.Portal>
                <TooltipContent>
                  <MarkerContents station={station} />
                </TooltipContent>
              </RadixTooltip.Portal>
            </Marker>
          </Tooltip>
        );
      })}
    </Map>
  );
}

const MarkerContents: React.FC<{ station: STATION }> = ({ station }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-50">{station.STID}</p>
      <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">{station.NAME}</p>
      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">{station.MNET_SHORTNAME}</p>
    </div>
  );
};
