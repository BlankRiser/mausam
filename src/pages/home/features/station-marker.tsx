import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getFormattedTimezone } from "@/lib/date-utils";
import { getVariableData } from "@/lib/synoptic-utils";
import { cn } from "@/lib/utils";
import { useCurrentState } from "@/store/station.store";
import { Station } from "@/types/station";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useMemo } from "react";
import { Marker } from "react-map-gl";

export const StationMarker: React.FC<{
  stations: Array<Station>;
  units: Record<string, string>;
}> = ({ stations, units }) => {
  const currentStation = useCurrentState((state) => state.currentStation);
  const setCurrentStation = useCurrentState((state) => state.setCurrentStation);
  const currentVariable = useCurrentState((state) => state.currentVariable);

  if (!stations) return null;

  return (
    <div>
      {stations?.map((station) => {
        const data = getSensorVariableDetails(station, currentVariable);
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
                  key={station.STID}
                  className={cn(
                    "z-50 min-w-6 min-h-6 p-1 rounded-full grid place-items-center",
                    "bg-neutral-50/90 dark:bg-neutral-800/90 dark:hover:bg-neutral-800 border dark:border-neutral-800 border-neutral-900 hover:bg-neutral-100 transition-colors",
                    currentStation?.STID === station.STID
                      ? "relative after:absolute after:ring after:content-[''] after:ring-blue-500 after:animate-ping after:w-5 after:h-5 after:grid after:place-items-center after:rounded-full"
                      : "",
                  )}
                >
                  <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
                    {data?.latest.value?.toFixed(0)}
                  </span>
                </div>
              </TooltipTrigger>
              <RadixTooltip.Portal>
                <TooltipContent>
                  <MarkerTooltipContents station={station} units={units} />
                </TooltipContent>
              </RadixTooltip.Portal>
            </Marker>
          </Tooltip>
        );
      })}
    </div>
  );
};

const MarkerTooltipContents: React.FC<{
  station: Station;
  units: Record<string, string>;
}> = ({ station, units }) => {
  const currentVariable = useCurrentState((state) => state.currentVariable);

  const variables = useMemo(
    () => getVariableData(station, currentVariable),
    [station, currentVariable],
  );

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center">
        <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-50">
          {station.STID}
        </p>
        <p className="text-sm text-neutral-700 dark:text-neutral-200">
          {station.NAME}
        </p>
        <p className="text-xs text-neutral-700 dark:text-neutral-200">
          {station.STATUS}
        </p>
      </div>
      <div className="text-xs">
        {variables?.map((variable) => {
          const formattedDate = getFormattedTimezone({
            dateString: variable.dateTime,
            timezone: station.TIMEZONE,
            formatString: "HH:mm (z)",
          });

          const formattedValue = variable.value
            ? `${variable.value} ${units[currentVariable]}`
            : "N/A";

          return (
            <div key={variable.sensor} className="flex gap-2">
              <p className=" text-neutral-700 dark:text-neutral-200">
                {formattedValue}
              </p>
              <p className=" text-neutral-700 dark:text-neutral-200">
                {formattedDate}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const getSensorVariableDetails = (
  station: Station,
  selectedVariable: keyof typeof station.SENSOR_VARIABLES,
) => {
  if (Object.keys(station.SENSOR_VARIABLES).length === 0) return null;

  const sensorVariable = station.SENSOR_VARIABLES[selectedVariable];
  const details = {} as SensorVariableDetails;

  Object.entries(sensorVariable ?? {}).map(([key, _value]) => {
    if (station.OBSERVATIONS?.[key]) {
      details["latest"] = station.OBSERVATIONS[key] as Latest;
    }
    // @ts-expect-error - this is a hack to get around the fact that the API is not typed
    details["minMax"] = station.MINMAX?.[key];
  });

  return details;
};

interface SensorVariableDetails {
  latest: Latest;
  minMax?: MinMax;
}

type MinMax = {
  dates: Array<string>;
  value_min_local: Array<number>;
  value_max_local: Array<number>;
  datetime_min_local: Array<string>;
  datetime_max_local: Array<string>;
  datetime_timezone: string;
};

interface Latest {
  value: number;
  date_time: string;
}
