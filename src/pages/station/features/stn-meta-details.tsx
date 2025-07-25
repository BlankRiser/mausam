import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StationMetadata } from "@/types/station-metadata";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

const formatter = {
  format: (arr: string[]) => arr?.join(", ")?.replace(/, ([^,]*)$/, " and $1"),
};

export const StnMetaDetails = ({ data }: { data: StationMetadata }) => {
  const navigate = useNavigate({ from: "/station/$stationId" });

  const CardData = useMemo(
    () => [
      {
        label: "Name",
        value: data.STATION?.[0]?.NAME ?? "N/A",
        className: cn([""]),
      },
      {
        label: "STID",
        value: data.STATION?.[0]?.STID ?? "N/A",
        className: cn([""]),
      },
      {
        label: "Status",
        value: data.STATION?.[0]?.STATUS ?? "N/A",
        className: cn([
          data.STATION?.[0]?.STATUS === "ACTIVE"
            ? "text-green-600 dark:text-green-500"
            : "text-red-600 dark:text-red-500",
        ]),
      },
      {
        label: "Network",
        value: data.STATION?.[0]?.SHORTNAME ?? "N/A",
        className: cn(["text-blue-600 dark:text-blue-500"]),
        onClick: () => {
          void navigate({
            to: "/networks/$networkId",
            params: {
              networkId: data.STATION?.[0]?.MNET_ID,
            },
          });
        },
      },
      {
        label: "National Weather Service Zone",
        value: data.STATION?.[0]?.NWSZONE ?? "N/A" ?? "N/A",
        className: cn([""]),
      },
      {
        label: "Longitude",
        value: data.STATION?.[0]?.LONGITUDE ?? "N/A",
        className: cn([""]),
      },
      {
        label: "Latitude",
        value: data.STATION?.[0]?.LATITUDE ?? "N/A",
        className: cn([""]),
      },
      {
        label: "Timezone",
        value: data.STATION?.[0]?.TIMEZONE ?? "N/A",
        className: cn([""]),
      },
      {
        label: "Elevation",
        value: data.STATION?.[0]?.ELEVATION
          ? data.STATION?.[0]?.ELEVATION + data.STATION?.[0]?.UNITS.elevation
          : "N/A",
        className: cn([""]),
      },
      {
        label: "Sensor Variables",
        value:
          Object.keys(data.STATION?.[0]?.SENSOR_VARIABLES ?? {}).length ??
          "N/A",
        className: cn([""]),
      },
      {
        label: "Data Providers",
        value:
          formatter.format(data.STATION?.[0]?.PROVIDERS.map((p) => p.name)) ??
          "N/A",
        className: cn([""]),
      },
    ],
    [data.STATION, navigate],
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-fit">
      {CardData.map((card, index) => (
        <Card
          key={card.value.toString() + index.toString()}
          className={cn([
            "px-4 py-2 rounded-sm bg-neutral-100 dark:bg-neutral-800",
            card.onClick
              ? "cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700"
              : "",
            card.className,
          ])}
          onClick={card.onClick}
        >
          <p className="text-xs text-neutral-500 dark:text-neutral-300">
            {card.label}
          </p>
          <span>{card.value}</span>
        </Card>
      ))}
    </div>
  );
};
