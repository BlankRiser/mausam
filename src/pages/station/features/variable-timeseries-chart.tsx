import { variableTimeseriesQueryOptions } from "@/api/query-factory";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { rootRoute } from "@/router/root-route";
import { stationRoute } from "@/router/routes";
import { LatestStationResponse, SensorVariables } from "@/types/station";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export const VariableTimeseriesChart = ({
  variable,
}: {
  variable: keyof SensorVariables;
}) => {
  const { stationId } = stationRoute.useParams();

  const { variableLabels } = rootRoute.useLoaderData();
  const formattedVariable = variableLabels.get(variable)?.long_name ?? variable;
  const { data, isFetched } = useQuery(
    variableTimeseriesQueryOptions({ stid: stationId, vars: [variable] }),
  );

  const chartData = useMemo(
    () => getChartData(data!, variable),
    [data, variable],
  );

  const chartConfig = {
    dateTime: {
      label: "Date",
      color: "#f00",
    },
    value: {
      label: formattedVariable,
      color: "#0f0",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{formattedVariable} Timeseries </CardTitle>
        <CardDescription>
          You can select a different sensor variable from the dropdown to the
          right.
        </CardDescription>
      </CardHeader>
      {isFetched && data?.STATION?.length === 0 ? (
        <div className="aspect-video grid place-items-center">
          <p className="text-center">No data available</p>
        </div>
      ) : (
        <div>
          {isFetched && (
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f00" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f00" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0f0" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    return value;
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return value;
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="value"
                  type="natural"
                  fill="url(#fillMobile)"
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          )}
        </div>
      )}
    </Card>
  );
};

const getChartData = (
  data: LatestStationResponse,
  variable: keyof SensorVariables,
) => {
  if (!data || data.STATION?.length === 0 || variable.length === 0) {
    return [];
  }

  const sensorVariableSet = Object.keys(
    data?.STATION?.[0]?.SENSOR_VARIABLES[variable] ?? {},
  )[0];

  const observations = data?.STATION?.[0]?.OBSERVATIONS;
  if (!observations || !observations["date_time"]) {
    return [];
  }

  const chartData: Array<{ dateTime: string; value: number }> = [];

  if (Array.isArray(observations["date_time"])) {
    (observations["date_time"] as string[]).forEach((value, index) => {
      const sensorValue = observations[sensorVariableSet];
      if (Array.isArray(sensorValue)) {
        chartData.push({
          dateTime: format(
            new Date(parseInt(value) * 1000),
            "yyyy-MM-dd hh-mm",
          ),
          value: sensorValue[index] as number,
        });
      }
    });
  }

  return chartData;
};
