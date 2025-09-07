import { Compass } from "@/components/charts/compass";
import { cn } from "@/lib/utils";
import { LatestStationResponse } from "@/types/station";
import { useMemo } from "react";

export const windCardDetails = {
  id: "wind",
  component: WindCard,
  group: ["wind_speed", "wind_direction", "wind_gust"],
};

type RenderedValues = {
  datetime: string;
  value: string | number;
  valueUnit: string;
  position: string;
  positionUnit: string;
};

type WindCardProps = {
  data: LatestStationResponse;
} & React.ComponentProps<"div">;

export function WindCard({ data, ...rest }: WindCardProps) {
  const windSpeed = useMemo(() => {
    const values: Array<RenderedValues> = [];
    Object.entries(
      data?.STATION?.[0]?.SENSOR_VARIABLES?.wind_speed ?? {},
    ).forEach(([key, value]) => {
      values.push({
        datetime: data?.STATION?.[0]?.OBSERVATIONS?.[key]?.date_time ?? "N/A",
        value: data?.STATION?.[0]?.OBSERVATIONS?.[key]?.value ?? "N/A",
        valueUnit: data.UNITS?.["wind_speed"] ?? "N/A",
        position: value?.position ?? "N/A",
        positionUnit: data?.STATION?.[0]?.UNITS?.["position"] ?? "N/A",
      });
    });

    return values;
  }, [data]);

  const windDirection = useMemo(() => {
    const values: Array<RenderedValues> = [];
    Object.entries(
      data?.STATION?.[0]?.SENSOR_VARIABLES?.wind_direction ?? {},
    ).forEach(([key, value]) => {
      values.push({
        datetime: data?.STATION?.[0]?.OBSERVATIONS?.[key]?.date_time ?? "N/A",
        value: data?.STATION?.[0]?.OBSERVATIONS?.[key]?.value ?? "N/A",
        valueUnit: data.UNITS?.["wind_direction"] ?? "N/A",
        position: value?.position ?? "N/A",
        positionUnit: data?.STATION?.[0]?.UNITS?.["position"] ?? "N/A",
      });
    });

    return values;
  }, [data]);

  const windGust = useMemo(() => {
    const values: Array<RenderedValues> = [];
    Object.entries(
      data?.STATION?.[0]?.SENSOR_VARIABLES?.wind_gust ?? {},
    ).forEach(([key, value]) => {
      values.push({
        datetime: data?.STATION?.[0]?.OBSERVATIONS?.[key]?.date_time ?? "N/A",
        value: data?.STATION?.[0]?.OBSERVATIONS?.[key]?.value ?? "N/A",
        valueUnit: data.UNITS?.["wind_gust"] ?? "N/A",
        position: value?.position ?? "N/A",
        positionUnit: data?.STATION?.[0]?.UNITS?.["position"] ?? "N/A",
      });
    });

    return values;
  }, [data]);

  return (
    <div
      className={cn([rest.className, "data-[selected=true]:bg-red-200"])}
      {...rest}
    >
      <div className="flex gap-4 w-full border border-border rounded-xl p-2">
        <Compass angle={Number(windDirection[0]?.value) ?? 0} />
        <div className="flex flex-col gap-2">
          <span>
            {windDirection[0]?.value} {windDirection[0]?.valueUnit}
          </span>
          <div className="flex flex-col gap-2 items-baseline-last">
            <span className="text-3xl">{windSpeed[0]?.value}</span>
            <div className="flex flex-col">
              <span className="text-sm">{windSpeed[0]?.valueUnit}</span>
              <span className="text-sm">Wind Speed</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-baseline-last">
            <span className="text-3xl">{windGust[0]?.value}</span>
            <div className="flex flex-col">
              <span className="text-sm">{windGust[0]?.valueUnit}</span>
              <span className="text-sm">Wind Gust</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
