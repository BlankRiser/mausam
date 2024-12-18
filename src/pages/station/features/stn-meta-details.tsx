import { StationMetadata } from "@/types/station-metadata";
import { useMemo } from "react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

export const StnMetaDetails = ({ data }: { data: StationMetadata }) => {
  const CardData = useMemo(
    () => [
      {
        label: "Status",
        value: data.STATION[0].STATUS,
      },
      {
        label: "STID",
        value: data.STATION[0].STID,
      },
      {
        label: "Name",
        value: data.STATION[0].NAME,
      },
      {
        label: "Network ID",
        value: data.STATION[0].MNET_ID,
      },
      {
        label: "National Weather Service Zone",
        value: data.STATION[0].NWSZONE ?? "N/A",
      },
      {
        label: "Longitude",
        value: data.STATION[0].LONGITUDE,
      },
      {
        label: "Latitude",
        value: data.STATION[0].LATITUDE,
      },
      {
        label: "Timezone",
        value: data.STATION[0].TIMEZONE,
      },
      {
        label: "Elevation",
        value: data.STATION[0].ELEVATION + data.STATION[0].UNITS.elevation,
      },
      {
        label: "Sensor Variables",
        value: Object.keys(data.STATION[0].SENSOR_VARIABLES ?? {}).length,
      },
      {
        label: "Data Providers",
        value: formatter.format(data.STATION[0].PROVIDERS.map((p) => p.name)),
      },
    ],
    [data.STATION],
  );

  return (
    <div className="flex flex-wrap gap-2 ">
      {CardData.map((card, index) => (
        <div
          key={index}
          className="px-4 py-2 rounded bg-neutral-100 dark:bg-neutral-800"
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
