import { BarChart } from "@/components/charts/bar-chart";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatLargeNumber } from "@/lib/utils";
import { stationRoute } from "@/router/routes";
import { useGlobalDataStore } from "@/store/global-data.store";
import {
  LatestStationResponse,
  MinMax,
  SensorVariables,
} from "@/types/station";
import { useMemo } from "react";

export const MinmaxBoxChart = ({ data }: { data: LatestStationResponse }) => {
  const variableLabels = useGlobalDataStore((s) => s.variableLabels);
  const { variable } = stationRoute.useSearch();

  const formattedVariable = variableLabels?.[variable]?.long_name ?? variable;

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
          {formattedVariable}{" "}
          {!!data && data?.UNITS?.[variable] ? `(${data.UNITS[variable]})` : ""}
        </CardTitle>
      </CardHeader>

      {minmaxData.length === 0 ? (
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
