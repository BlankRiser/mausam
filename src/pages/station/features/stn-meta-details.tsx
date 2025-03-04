import { cn } from "@/lib/utils";
import { StationMetadata } from "@/types/station-metadata";
import { useMemo } from "react";

const formatter = {
  format: (arr: string[]) => arr.join(", ").replace(/, ([^,]*)$/, " and $1"),
};

export const StnMetaDetails = ({ data }: { data: StationMetadata }) => {
  const CardData = useMemo(
    () => [
      {
        label: "Status",
        value: data.STATION[0].STATUS,
        className: cn([
          data.STATION[0].STATUS === "ACTIVE"
            ? "text-green-600"
            : "text-red-600",
        ]),
      },
      {
        label: "STID",
        value: data.STATION[0].STID,
        className: cn(["text-blue-600"]),
      },
      {
        label: "Name",
        value: data.STATION[0].NAME,
        className: cn(["text-blue-600"]),
      },
      {
        label: "Network ID",
        value: data.STATION[0].MNET_ID,
        className: cn([""]),
      },
      {
        label: "National Weather Service Zone",
        value: data.STATION[0].NWSZONE ?? "N/A",
        className: cn([""]),
      },
      {
        label: "Longitude",
        value: data.STATION[0].LONGITUDE,
        className: cn([""]),
      },
      {
        label: "Latitude",
        value: data.STATION[0].LATITUDE,
        className: cn([""]),
      },
      {
        label: "Timezone",
        value: data.STATION[0].TIMEZONE,
        className: cn([""]),
      },
      {
        label: "Elevation",
        value: data.STATION[0].ELEVATION + data.STATION[0].UNITS.elevation,
        className: cn([""]),
      },
      {
        label: "Sensor Variables",
        value: Object.keys(data.STATION[0].SENSOR_VARIABLES ?? {}).length,
        className: cn([""]),
      },
      {
        label: "Data Providers",
        value: formatter.format(data.STATION[0].PROVIDERS.map((p) => p.name)),
        className: cn([""]),
      },
    ],
    [data.STATION],
  );

  return (
    <div className="flex flex-wrap gap-2 h-fit">
      {CardData.map((card, index) => (
        <div
          key={index}
          className={cn([
            "px-4 py-2 rounded bg-neutral-100 dark:bg-neutral-800",
            card.className,
          ])}
        >
          <p className="text-xs text-neutral-500 dark:text-neutral-300">
            {card.label}
          </p>
          <span>{card.value}</span>
        </div>
      ))}
    </div>
  );
};
