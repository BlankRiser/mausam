import { useStationMetadata } from "@/api/use-station-data";
import { MAP_STYLES } from "@/assets/data/mapbox";
import { MapMarker } from "@/assets/icons";
import { GlobalErrorBoundary } from "@/components/common/GlobalErrorBoundary";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { variables } from "@/data/variables";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { useCurrentStation } from "@/providers/station-store";
import { STATION } from "@/types/synoptic";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import Map, { Marker, NavigationControl, useMap } from "react-map-gl";

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
          <MapContents stations={data?.["STATION"]} />
        </Map>
        {isLoading || isMutating ? (
          <div className="w-full h-full z-[100] absolute inset-0 bg-transparent flex justify-center items-center">
            <Loader />
          </div>
        ) : null}

        <div className="absolute right-4 inset-y-0 grid place-items-center  ">
          <div className="bg-clip-padding backdrop-filter backdrop-blur-md rounded-lg text-black bg-neutral-100/50 dark:bg-neutral-800/70 shadow-md dark:text-white">
            {variables.map((variable) => {
              return (
                <div key={variable.label} className="p-1">
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn([
                          "grid place-items-center hover:shadow-sm",
                          variable.label === "Air temperature" &&
                            "bg-neutral-100",
                        ])}
                      >
                        {variable.icon}
                      </Button>
                    </TooltipTrigger>
                    <RadixTooltip.Portal>
                      <TooltipContent>
                        <p>{variable.label}</p>
                      </TooltipContent>
                    </RadixTooltip.Portal>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </GlobalErrorBoundary>
  );
}

const MapContents: React.FC<{
  stations: Array<STATION> | undefined;
}> = ({ stations }) => {
  const { currentStation, setCurrentStation } = useCurrentStation();

  if (!stations) return null;

  return (
    <div>
      {stations?.map((station) => {
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
                  {currentStation?.STID === station.STID ? (
                    <MapMarker
                      width={18}
                      height={18}
                      className="text-black dark:text-white"
                    />
                  ) : null}
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
    </div>
  );
};

const MarkerContents: React.FC<{
  station: STATION;
}> = ({ station }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-50">
        {station.STID}
      </p>
      <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
        {station.NAME}
      </p>
      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">
        {station.MNET_SHORTNAME}
      </p>
    </div>
  );
};
