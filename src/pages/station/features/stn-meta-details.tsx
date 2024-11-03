import { StationMetadata } from "@/types/station-metadata";
import { useMemo } from "react";

export const StnMetaDetails = ({ data }: { data: StationMetadata }) => {
  const CardData = useMemo(
    () => [
      {
        label: "STID",
        value: data.STATION[0].STID,
      },
      {
        label: "Name",
        value: data.STATION[0].NAME,
      },
      {
        label: "Network",
        value: data.STATION[0].MNET_ID,
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
    ],
    [],
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
