import { useStationDataResponse, useStationMetadata } from "@/api/use-station-data";
import { MAP_STYLES } from "@/assets/data/mapbox";
import { MapMarker } from "@/assets/icons";
import { GlobalErrorBoundary } from "@/components/common/GlobalErrorBoundary";
import { Loader } from "@/components/ui/loader";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { useCurrentStation } from "@/providers/station-store";
import { STATION } from "@/types/synoptic";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useState } from "react";
import Map, { Marker, NavigationControl, useMap } from "react-map-gl";

export default function MapContainer() {
    const { currentStation, setCurrentStation } = useCurrentStation();
    const { theme } = useTheme();

    // map is the "id" attribute of <Map/>
    // https://visgl.github.io/react-map-gl/docs/api-reference/use-map
    const { map } = useMap();

    const [stationData, setStationData] = useState<useStationDataResponse | undefined>(undefined);

    const { mutate, isLoading } = useStationMetadata({
        map: map,
        setStationData: setStationData,
    });

    const fetchMapData = () => {
        mutate();
    };

    return (
        <GlobalErrorBoundary>
            <div className="relative w-full h-full">
                {isLoading && (
                    <div className="w-full h-full z-[100] absolute bg-transparent inset-0 flex justify-center items-center">
                        <Loader />
                    </div>
                )}
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
                    mapStyle={theme === "dark" ? MAP_STYLES["mapbox-dark"] : MAP_STYLES["mapbox-streets"]}
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
                    <NavigationControl position="top-left" />
                    {stationData?.STATION?.map((station) => {
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
                </Map>
            </div>
        </GlobalErrorBoundary>
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
