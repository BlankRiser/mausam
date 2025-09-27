import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { stationLatestQueryOptions } from "@/api/query-factory";
import { BarChart } from "@/components/charts/bar-chart";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLargeNumber } from "@/lib/utils";
import { useGlobalDataStore } from "@/store/global-data.store";
import { MinMax, SensorVariables } from "@/types/station";

export const MinmaxBoxChart = ({
  stationId,
  variable,
}: {
  stationId: string;
  variable: string;
}) => {
  const variableLabels = useGlobalDataStore((s) => s.variableLabels);
  const formattedVariable = variableLabels?.[variable]?.long_name ?? variable;

  const { data, isPending, isFetched } = useSuspenseQuery(
    stationLatestQueryOptions({
      stid: stationId,
    }),
  );

  const minmaxData = useMemo(() => {
    if (data?.STATION?.length === 0) return [];

    const sensorVariables = data?.STATION?.[0]?.["SENSOR_VARIABLES"];
    const minMaxRecords = data?.STATION?.[0]?.["MINMAX"];

    return getMinMaxData(sensorVariables, minMaxRecords, variable);
  }, [data.STATION, variable]);

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>
          Min/Max values of {formattedVariable}{" "}
          {!!data && data?.UNITS?.[variable] ? `(${data.UNITS[variable]})` : ""}{" "}
          last 7 days
        </CardTitle>
      </CardHeader>

      {isPending ? (
        <Skeleton className="h-80 w-full" />
      ) : !isPending && isFetched && minmaxData.length === 0 ? (
        <div className="h-full min-h-80 grid place-items-center">
          <p className="text-center">No data available</p>
        </div>
      ) : (
        <>
          <BarChart
            data={minmaxData}
            index="date"
            categories={["min", "max"]}
            yAxisWidth={48}
            valueFormatter={(value) => formatLargeNumber(value)}
          />
        </>
      )}
    </Card>
  );
};

const getMinMaxData = (
  sensorVariables: SensorVariables,
  minMaxData: Record<string, MinMax>,
  sensor?: string,
) => {
  if (!sensorVariables || !minMaxData) return [];

  const sensorKey = Object.keys(
    sensorVariables ?? {},
  )?.[0] as keyof typeof sensorVariables;
  const selectedSensor =
    sensorVariables[(sensor as keyof typeof sensorVariables) ?? sensorKey];

  const firstSensor = Object.keys(selectedSensor ?? {})?.[0];

  const labelledData = [] as Array<{
    date: string;
    min: number | undefined;
    max: number | undefined;
  }>;

  // Check is MINMAX object contains the sensor
  if (minMaxData[firstSensor]) {
    minMaxData[firstSensor]["dates"].forEach((d, index) => {
      labelledData.push({
        date: d,
        min: minMaxData[firstSensor]["value_min_utc"]?.[index],
        max: minMaxData[firstSensor]["value_max_utc"]?.[index],
      });
    });
  }

  return labelledData;
};
