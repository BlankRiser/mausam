import { Marker, Popup } from "@vis.gl/react-maplibre";
import { memo, useMemo } from "react";
import { getFormattedTimezone } from "@/lib/date-utils";
import { getVariableData } from "@/lib/synoptic-utils";
import { cn } from "@/lib/utils";
import { useCurrentState } from "@/store/station.store";
import { Station } from "@/types/station";
import { latest } from "maplibre-gl";
import { Button, ButtonArrow } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const StationMarker: React.FC<{
  stations: Array<Station>;
  units: Record<string, string>;
}> = ({ stations, units }) => {
  const currentStation = useCurrentState((state) => state.currentStation);
  if (!stations) return null;

  return (
    <>
      {stations?.map((station) => {
        return (
          <StationMarkerItem
            key={station.STID}
            station={station}
            units={units}
            isSelected={currentStation?.STID === station.STID}
          />
        );
      })}
    </>
  );
};

const StationMarkerItem = memo(
  ({
    station,
    units,
    isSelected,
  }: {
    station: Station;
    units: Record<string, string>;
    isSelected: boolean;
  }) => {
    const setCurrentStation = useCurrentState(
      (state) => state.setCurrentStation
    );
    const currentVariable = useCurrentState((state) => state.currentVariable);

    const data = useMemo(
      () => getSensorVariableDetails(station, currentVariable),
      [currentVariable, station]
    );

    const markerStyles = useMemo(
      () =>
        cn([
          "w-6 h-6 rounded-sm grid place-items-center will-change-auto",
          "bg-blue-50/90 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700/50 hover:bg-blue-100 transition-colors",
          isSelected
            ? "relative outline-2 bg-blue-200 dark:bg-blue-800 outline-blue-500 dark:outline-blue-400 after:absolute after:ring-3 after:content-[''] after:ring-blue-500 after:animate-ping after:w-5 after:h-5 after:grid after:place-items-center after:rounded-full"
            : "",
          "font-sans text-xs mix-blend-difference text-center",
        ]),
      [isSelected]
    );

    if (Object.keys(data ?? {}).length === 0 || !data?.latest.value)
      return null;

    return (
      <>
        <Marker
          latitude={+station.LATITUDE}
          longitude={+station.LONGITUDE}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setCurrentStation(station);
          }}
        >
          <div className={markerStyles}>{data.latest.value.toFixed(0)}</div>
        </Marker>
        {isSelected && (
          <Popup
            latitude={+station.LATITUDE}
            longitude={+station.LONGITUDE}
            className="bg-transparent"
            closeButton={false}
            closeOnClick={false}
            onClose={() => setCurrentStation(null)}
            offset={[0, -8]}
          >
            <MarkerTooltipContents station={station} units={units} />
          </Popup>
        )}
      </>
    );
  }
);

StationMarkerItem.displayName = "StationMarkerItem";

const MarkerTooltipContents: React.FC<{
  station: Station;
  units: Record<string, string>;
}> = ({ station, units }) => {
  const currentVariable = useCurrentState((state) => state.currentVariable);

  const variables = useMemo(
    () => getVariableData(station, currentVariable),
    [station, currentVariable]
  );

  return (
    <div
      className="relative"
      // className="p-0.5 text-black bg-neutral-200/70 dark:bg-neutral-900/70 backdrop-blur-sm shadow-md dark:text-white rounded-md"
    >
      <div className="absolute bottom-[45%] right-[calc(95%)]">
        <span className="text-lg font-medium text-primary writing-vertical-lr left-0 ml-1 [writing-mode:vertical-rl] rotate-180 px-2 backdrop-blur-3xl bg-blue-500/15">
          {station.STID}
        </span>
      </div>
      <div className="relative aspect-video mask-cover mask-center mask-[var(--container-mask)] bg-blue-500 w-full h-full">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1688 918"
          className="fill-white dark:fill-black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M74 12v467.986a22.999 22.999 0 0 1-12.602 20.515l-48.892 24.781A21.002 21.002 0 0 0 1 544.014V905.5c0 6.075 4.925 11 11 11h1588.5c6.08 0 11-4.925 11-11V790.173c0-8.201 4.37-15.782 11.46-19.896l53.08-30.784a21.012 21.012 0 0 0 10.46-18.166V12c0-6.075-4.92-11-11-11H85c-6.075 0-11 4.925-11 11Z"
            stroke-width="2"
          />
        </svg>
        <div
          id="top-half"
          className="absolute bottom-[50%] inset-0 px-4 p-1 grid grid-cols-4 "
        >
          <div className="col-span-3">
            {variables?.map((variable) => {
              const formattedDate = getFormattedTimezone({
                dateString: variable.dateTime,
                timezone: station.TIMEZONE,
                formatString: "yyyy-MM-dd HH:mm (z)",
              });

              const formattedValue = variable.value
                ? `${variable.value} ${units[currentVariable]}`
                : "N/A";

              return (
                <div
                  key={variable.sensor}
                  className="h-full flex flex-col gap-0.5 justify-center text-primary"
                >
                  <span className={"text-base font-medium "}>
                    {formattedValue}
                  </span>
                  <span className="text-muted-foreground">{formattedDate}</span>
                </div>
              );
            })}
          </div>
          <div className="col-span-1 grid place-items-center">
            <Link
              to={`/station/$stationId`}
              params={{
                stationId: station.STID,
              }}
              search={{
                variable: currentVariable,
              }}
            >
              <Button variant="outline" size="icon">
                <MoveUpRight className="w-4 h-4 text-blue-500" />
              </Button>
            </Link>
          </div>
        </div>
        <div id="bottom-half" className="absolute top-[50%] inset-0">
          <div className="size-full text-accent-foreground px-1.5 py-3">
            <p className="truncate text-sm font-medium">{station.NAME}</p>
            <p className="text-xs">{station.SHORTNAME ?? ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const getSensorVariableDetails = (
  station: Station,
  selectedVariable: keyof typeof station.SENSOR_VARIABLES
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
