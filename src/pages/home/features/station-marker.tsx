import { LocationMarker } from "@/assets/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getVariableData } from "@/lib/synoptic-utils";
import { cn } from "@/lib/utils";
import { useCurrentState } from "@/providers/station-store";
import { STATION } from "@/types/synoptic";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useMemo } from "react";
import { Marker } from "react-map-gl";
import { toDate, getTimezoneOffset, format, utcToZonedTime } from "date-fns-tz";
import { getFormattedTimezone } from "@/lib/date-utils";

export const StationMarker: React.FC<{
  stations: Array<STATION> | undefined;
}> = ({ stations }) => {
  const currentStation = useCurrentState((state) => state.currentStation);
  const setCurrentStation = useCurrentState((state) => state.setCurrentStation);

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
                    <LocationMarker
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
  const currentVariable = useCurrentState((state) => state.currentVariable);

  const variables = useMemo(
    () => getVariableData(station, currentVariable),
    [station, currentVariable],
  );

  return (
    <div className="divide-y-4">
      <div className="flex flex-col justify-center items-center">
        <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-50">
          {station.STID}
        </p>
        <p className="text-sm text-neutral-700 dark:text-neutral-200">
          {station.NAME}
        </p>
        <p className="text-xs text-neutral-700 dark:text-neutral-200">
          {station.MNET_SHORTNAME}
        </p>
      </div>
      <div className="text-xs">
        {variables?.map((variable) => {
          const formattedDate = getFormattedTimezone({
            dateString: variable.dateTime,
            timezone: station.TIMEZONE,
            formatString: "HH:mm (z)",
          });

          return (
            <div key={variable.sensor} className="flex gap-2">
              <p className=" text-neutral-700 dark:text-neutral-200">
                {currentVariable}
              </p>
              <p className=" text-neutral-700 dark:text-neutral-200">
                {variable.value}
              </p>
              {/* <p className=" text-neutral-700 dark:text-neutral-200">
                {formattedDate}
              </p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
