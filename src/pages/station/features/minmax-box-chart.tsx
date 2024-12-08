import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { rootRoute } from "@/router/root-route";
import {
  LatestStationResponse,
  MinMax,
  SensorVariables,
} from "@/types/station";
import { format, isToday, isYesterday, parse } from "date-fns";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export const MinmaxBoxChart = ({ data }: { data: LatestStationResponse }) => {
  const { variableLabels } = rootRoute.useLoaderData();

  const [selectedVariable, _setSelectedVariable] = useState(
    Object.keys(
      data.STATION[0]["SENSOR_VARIABLES"],
    )?.[0] as keyof (typeof data.STATION)[0]["SENSOR_VARIABLES"],
  );

  const formattedVariable =
    variableLabels.get(selectedVariable)?.long_name ?? selectedVariable;

  const minmaxData = useMemo(() => {
    if (data.STATION.length === 0) return [];

    const sensorVariables = data.STATION[0]["SENSOR_VARIABLES"];
    const minMaxRecords = data.STATION[0]["MINMAX"];

    return getMinMaxData(sensorVariables, minMaxRecords, selectedVariable);
  }, [data.STATION, selectedVariable]);

  const chartConfig = {
    max: {
      label: "Maximum",
      color: "#6366f1",
    },
    min: {
      label: "Minimum",
      color: "#ec4899",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{formattedVariable} Min/Max</CardTitle>
        <CardDescription>
          You can select a different sensor variable from the dropdown to the
          right.
        </CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={minmaxData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => {
              const parsedDate = parse(
                value as string,
                "yyyy-MM-dd",
                new Date(),
              );

              if (isToday(parsedDate)) {
                return "Today";
              }

              if (isYesterday(parsedDate)) {
                return "Yesterday";
              }

              return format(parsedDate, "MMM dd");
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="max" fill="var(--color-max)" radius={4} />
          <Bar dataKey="min" fill="var(--color-min)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
};

const getMinMaxData = (
  sensorVariables: SensorVariables,
  minMaxData: Record<string, MinMax>,
  sensor?: string,
) => {
  const sensorKey = Object.keys(
    sensorVariables,
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
