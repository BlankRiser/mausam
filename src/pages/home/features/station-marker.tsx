import { Marker, Popup } from "@vis.gl/react-maplibre";
import { memo, useMemo } from "react";
import { getFormattedTimezone } from "@/lib/date-utils";
import { getVariableData } from "@/lib/synoptic-utils";
import { cn } from "@/lib/utils";
import { useCurrentState } from "@/store/station.store";
import { Station } from "@/types/station";

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
    const setCurrentStation = useCurrentState((state) => state.setCurrentStation);
    const currentVariable = useCurrentState((state) => state.currentVariable);

    const data = useMemo(
      () => getSensorVariableDetails(station, currentVariable),
      [currentVariable, station],
    );

    const markerStyles = useMemo(
      () =>
        cn([
          "w-6 h-6 rounded-full grid place-items-center",
          "bg-neutral-50/90 dark:bg-neutral-800/90 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 transition-colors",
          isSelected
            ? "relative outline-2 outline-blue-500 dark:outline-blue-400 after:absolute after:ring-3 after:content-[''] after:ring-blue-500 after:animate-ping after:w-5 after:h-5 after:grid after:place-items-center after:rounded-full"
            : "",
          "font-sans text-xs mix-blend-difference text-center",
        ]),
      [isSelected],
    );

    if (Object.keys(data ?? {}).length === 0 || !data?.latest.value) return null;

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
  },
);

StationMarkerItem.displayName = "StationMarkerItem";

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
    <div className="px-3 py-1.5 text-black bg-neutral-200/70 dark:bg-neutral-900/70 backdrop-blur-sm shadow-md dark:text-white rounded-md">
      <span className="text-lg font-medium text-neutral-800 dark:text-neutral-50">
        {station.STID}
      </span>
      <div>
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
            <div key={variable.sensor} className="flex flex-col gap-1">
              <span className="text-neutral-700 dark:text-neutral-200 text-sm">
                {formattedDate}
              </span>
              <span
                className={
                  "bg-black text-neutral-200 dark:bg-white dark:text-neutral-700 px-2 py-0.5"
                }
              >
                {formattedValue}
              </span>
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
