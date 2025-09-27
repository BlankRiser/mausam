import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { networkQueryOptions } from "@/api/query-factory";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { networkRoute } from "@/router/routes";

export const NetworkMetaDetails = () => {
  const { networkId } = networkRoute.useParams();

  const { data } = useSuspenseQuery(
    networkQueryOptions({
      networkId: networkId,
    }),
  );

  const CardData = useMemo(
    () => [
      {
        label: "Network",
        value: data.MNET?.[0]?.SHORTNAME ?? "N/A",
        className: cn([""]),
      },
      {
        label: "Network Name",
        value: data.MNET?.[0]?.LONGNAME ?? "N/A",
        className: cn([""]),
      },
      {
        label: "ID",
        value: data.MNET?.[0]?.ID ?? "N/A",
        className: cn([""]),
      },
      {
        label: "Reporting Stations",
        value: data.MNET?.[0]?.REPORTING_STATIONS ?? "N/A",
      },
      {
        label: "Total Stations",
        value: data.MNET?.[0]?.TOTAL_STATIONS ?? "N/A",
      },
      {
        label: "Restricted Stations",
        value: data.MNET?.[0]?.TOTAL_RESTRICTED ?? "N/A",
      },
    ],
    [data.MNET],
  );

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 h-fit">
      {CardData.map((card, index) => (
        <Card
          key={card.value.toString() + index.toString()}
          className={cn([
            "px-4 py-2 rounded-sm bg-neutral-50 dark:bg-neutral-950",
            card.className,
          ])}
        >
          <p className="text-xs text-neutral-500 dark:text-neutral-300">
            {card.label}
          </p>
          <span>{card.value}</span>
        </Card>
      ))}
    </section>
  );
};
