import { variableTimeseriesQueryOptions } from "@/api/query-factory";
import { LineChart, TooltipProps } from "@/components/charts/line-chart";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGlobalDataStore } from "@/store/global-data.store";
import { LatestStationResponse, SensorVariables } from "@/types/station";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Info } from "lucide-react";
import { useMemo } from "react";

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

export const VariableTimeseriesChart = ({
  stationId,
  variable,
}: {
  stationId: string;
  variable: keyof SensorVariables;
}) => {
  const variableLabels = useGlobalDataStore((s) => s.variableLabels);

  const formattedVariable = variableLabels?.[variable]?.long_name ?? variable;

  const { data, isFetched } = useQuery(
    variableTimeseriesQueryOptions({ stid: stationId, vars: [variable] }),
  );

  const { chartData } = useMemo(
    () => getChartData({ data: data!, variable }),
    [data, variable],
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex gap-2 justify-between items-center">
            <span className="text-nowrap">
              {formattedVariable}{" "}
              {isFetched && data?.UNITS?.[variable]
                ? `(${data.UNITS[variable]})`
                : ""}
            </span>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent className="text-sm font-normal max-w-sm">
                Shows the timeseries data for the last 24 hours for the selected
                variable.
              </TooltipContent>
            </Tooltip>
          </div>
        </CardTitle>
      </CardHeader>
      {(isFetched && data?.STATION?.length === 0) || chartData.length === 0 ? (
        <div className="h-full min-h-80 grid place-items-center">
          <p className="text-center">No data available</p>
        </div>
      ) : (
        <>
          {isFetched && (
            <LineChart
              data={chartData}
              index="dateTime"
              categories={["value"]}
              customTooltip={CustomTooltip}
              valueFormatter={(value) => {
                return numberFormatter.format(value);
              }}
            />
          )}
        </>
      )}
    </Card>
  );
};

interface TooltipData {
  dateTime: string;
  value: number;
}

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  const variableLabels = useGlobalDataStore((s) => s.variableLabels);

  if (!active || !payload || payload.length === 0) return null;
  const variable = payload[0].payload.variable as keyof SensorVariables;
  const formattedVariable: string =
    variableLabels?.[variable]?.long_name ?? variable;

  const data = [
    {
      label: formattedVariable,
      value: (payload?.[0].payload as TooltipData)?.value,
    },
  ];

  return (
    <>
      <div className="w-60 rounded-md border border-gray-500/10 bg-blue-500 px-2 py-1.5 text-sm shadow-md dark:border-gray-400/20 ">
        <p className="flex items-center justify-between">
          <span className="text-gray-50 dark:text-gray-50">Date</span>
          <span className="font-medium text-gray-50 dark:text-gray-50">
            {label}
          </span>
        </p>
      </div>
      <div className="mt-1 w-60 space-y-1 rounded-md border border-gray-500/10  bg-white p-2 text-sm shadow-md dark:border-gray-400/20 dark:bg-black">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2.5">
            <div className="flex w-full justify-between">
              <span className=" text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  {numberFormatter.format(item.value)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const getChartData = ({
  data,
  variable,
}: {
  data: LatestStationResponse;
  variable: keyof SensorVariables;
}) => {
  if (!data || data?.STATION?.length === 0 || variable?.length === 0) {
    return { chartData: [], sets: [] };
  }

  const variableSets = Object.keys(
    data?.STATION?.[0]?.SENSOR_VARIABLES[variable] ?? {},
  );

  const sensorVariableSet = variableSets[0];

  const observations = data?.STATION?.[0]?.OBSERVATIONS;
  if (!observations || !observations["date_time"]) {
    return { chartData: [], sets: [] };
  }

  const chartData: Array<{
    dateTime: string;
    value: number;
    variable: keyof SensorVariables;
  }> = [];

  if (Array.isArray(observations["date_time"])) {
    (observations["date_time"] as string[]).forEach((value, index) => {
      const sensorValue = observations[sensorVariableSet];
      if (Array.isArray(sensorValue)) {
        chartData.push({
          variable: variable,
          dateTime: format(new Date(parseInt(value) * 1000), "HH:mm"),
          value: sensorValue[index] as number,
        });
      }
    });
  }

  return { chartData, sets: variableSets };
};
