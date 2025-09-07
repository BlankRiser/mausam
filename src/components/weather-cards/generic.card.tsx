import { cn } from "@/lib/utils";
import type { LatestStationResponse, SensorVariables } from "@/types/station";
import { useMemo } from "react";

export const genericCardDetails = {
  id: "generic",
  component: GenericCard,
  group: [],
};

type GenericCardProps = {
  variable: keyof SensorVariables;
  data: LatestStationResponse;
} & React.ComponentProps<"div">;

export function GenericCard({ variable, data, ...rest }: GenericCardProps) {
  const variableData = useMemo(() => {
    const values: Array<RenderedValues> = [];
    Object.entries(
      data?.STATION?.[0]?.SENSOR_VARIABLES?.[variable] ?? {},
    ).forEach(([key, value]) => {
      const variableValue =
        typeof data?.STATION?.[0]?.OBSERVATIONS?.[key]?.value === "object"
          ? (Object.values(
              data?.STATION?.[0]?.OBSERVATIONS?.[key]?.value ?? {},
            )[0] as string | number)
          : data?.STATION?.[0]?.OBSERVATIONS?.[key]?.value;

      values.push({
        datetime: data?.STATION?.[0]?.OBSERVATIONS?.[key]?.date_time,
        value: variableValue,
        valueUnit: data.UNITS?.[variable],
        position: value?.position,
        positionUnit: data?.STATION?.[0]?.UNITS?.["position"],
      });
    });

    return values;
  }, [data]);

  if (!variableData[0]?.value) {
    return null;
  }
  return (
    <div className={cn([rest.className])} {...rest}>
      <div className="border border-border rounded-xl p-2 flex flex-col gap-2 ">
        <span className="text-4xl">{variableData[0]?.value ?? "N/A"}</span>
        <div className="flex flex-col">
          <span className="text-sm">{variableData[0]?.valueUnit ?? "N/A"}</span>
          <span className="text-sm">{variable}</span>
        </div>
      </div>
    </div>
  );
}

type RenderedValues = {
  datetime?: string;
  value?: string | number;
  valueUnit?: string;
  position?: string;
  positionUnit?: string;
};
