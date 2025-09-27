"use client";

import { useNavigate } from "@tanstack/react-router";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { motion } from "motion/react";
import { Fragment, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VariableTimeseriesChart } from "@/pages/station/features/variable-timeseries-chart";
import { stationRoute } from "@/router/routes";
import { useGlobalDataStore } from "@/store/global-data.store";
import { LatestStationResponse, SensorVariables } from "@/types/station";
import { MinmaxBoxChart } from "@/pages/station/features/minmax-box-chart";

export default function ExpandingLatestTable({
  data,
}: {
  data: LatestStationResponse;
}) {
  const { stationId } = stationRoute.useParams();

  const columns = useMemo(() => getLatestStnDataTableColumns(), []);
  const rows = useMemo(() => transformData(data), [data]);

  const table = useReactTable({
    data: rows,
    columns,
    getRowCanExpand: (row) => Boolean(row.original.variable),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="rounded-md border border-neutral-200 dark:border-neutral-800 overflow-hidden"
    >
      <div className="[&>div]:max-h-[50rem]">
        <Table className="[&_td]:border-neutral-200 [&_th]:border-neutral-200 dark:[&_td]:border-neutral-800 dark:[&_th]:border-neutral-800 border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
          <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="whitespace-nowrap [&:has([aria-expanded])]:w-px [&:has([aria-expanded])]:py-0 [&:has([aria-expanded])]:pr-0"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        <div className="w-full py-2 space-y-2 max-w-[calc(100vw-2rem)]">
                          <VariableTimeseriesChart
                            key={row.original.variable}
                            stationId={stationId}
                            variable={
                              row.original.variable as keyof SensorVariables
                            }
                          />
                          <MinmaxBoxChart
                            stationId={stationId}
                            variable={row.original.variable}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}

const getLatestStnDataTableColumns = (): ColumnDef<TransformedData>[] => {
  return [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) => {
        return row.getCanExpand() ? (
          <Button
            {...{
              className: "size-7 shadow-none text-muted-foreground",
              onClick: row.getToggleExpandedHandler(),
              "aria-expanded": row.getIsExpanded(),
              "aria-label": row.getIsExpanded()
                ? `Collapse details for ${row.original.variable}`
                : `Expand details for ${row.original.variable}`,
              size: "icon",
              variant: "ghost",
            }}
          >
            {row.getIsExpanded() ? (
              <ChevronUpIcon
                className="opacity-60"
                size={16}
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className="opacity-60"
                size={16}
                aria-hidden="true"
              />
            )}
          </Button>
        ) : undefined;
      },
    },
    {
      id: "variable",
      header: () => {
        return <p className="px-2">Variable</p>;
      },
      cell: ({ row }) => {
        return <RenderVariableLabel variable={row.original.variable} />;
      },
    },
    {
      id: "identifier",
      header: "Synoptic Identifier",
      cell: ({ row }) => {
        return row.original.variable;
      },
    },
    {
      id: "position",
      header: "Sensor Position",
      cell: ({ row }) => {
        const { value, unit } = row.original.position;

        if (!value) {
          return (
            <span className="text-neutral-400 dark:text-neutral-600">-</span>
          );
        }

        return `${value} ${unit}`;
      },
    },
    {
      id: "sensor-date-time",
      header: "Date Time",
      cell: ({ row }) => {
        if (row.original.observation.dateTime === "N/A") {
          return (
            <span className="text-right text-neutral-400 dark:text-neutral-600">
              -
            </span>
          );
        }

        return (
          <span className="text-nowrap">
            {format(
              new Date(row.original.observation.dateTime),
              "MMM d, yyyy h:mm a",
            )}
          </span>
        );
      },
    },
    {
      id: "sensor-value",
      header: () => {
        return <p className="text-right px-2">Current Value</p>;
      },
      cell: ({ row }) => {
        const { value, unit } = row.original.observation;

        if (!value) {
          return (
            <p className="text-right text-neutral-400 dark:text-neutral-600 px-2">
              -
            </p>
          );
        }

        if (typeof value === "object") {
          // If this value is an object, it probably is cloud layer with `sky_condition` and `height_agl` keys
          return (
            <p className="text-right text-nowrap px-2">
              {value["sky_condition"]} at {value["height_agl"]}{" "}
              <span className="text-neutral-400 dark:text-neutral-600">
                {unit}{" "}
              </span>
            </p>
          );
        }

        return (
          <p className="text-right text-nowrap px-2">
            {value}{" "}
            <span className="text-neutral-400 dark:text-neutral-600">
              {["text", "code", undefined].includes(unit) ? "" : unit}
            </span>
          </p>
        );
      },
    },
  ];
};

interface TransformedData {
  variable: string;
  sensorKey: string;
  hasMultipleSensors: boolean;
  position: {
    value: string;
    unit: string;
  };
  observation: {
    dateTime: string;
    value: number;
    unit: string;
  };
}

const transformData = (data: LatestStationResponse) => {
  const station = data.STATION?.[0];
  const sensorRows: Array<TransformedData> = [];

  if (!station || Object.keys(station.SENSOR_VARIABLES).length === 0) {
    return sensorRows;
  }
  const sensorVariables = station.SENSOR_VARIABLES ?? {};

  Object.entries(sensorVariables).forEach(([key, value]) => {
    const hasMultipleSensors = Object.keys(value).length > 1;
    Object.entries(value).forEach(([sensorKey, sensorValue]) => {
      if (station["OBSERVATIONS"]?.[sensorKey]) {
        sensorRows.push({
          variable: key,
          sensorKey: key + "|" + sensorKey,
          hasMultipleSensors,
          position: {
            value: sensorValue["position"]!,
            unit: station["UNITS"]["position"],
          },

          observation: {
            dateTime: station["OBSERVATIONS"][sensorKey]["date_time"] ?? "N/A",
            value: station["OBSERVATIONS"][sensorKey]["value"] ?? -Infinity,
            unit: data.UNITS[key],
          },
        });
      }
    });
  });

  return sensorRows;
};

const RenderVariableLabel = ({ variable }: { variable: string }) => {
  const { stationId } = stationRoute.useParams();
  const navigate = useNavigate({ from: "/station/$stationId" });
  const variableLabels = useGlobalDataStore((s) => s.variableLabels);

  const variableLabel = variableLabels
    ? variableLabels[variable]?.long_name
    : variable;

  const handleClick = () => {
    void navigate({
      to: "/station/$stationId",
      params: {
        stationId: stationId,
      },
      search: {
        variable: variable,
      },
    });
  };

  return (
    <Button variant="dim" onClick={handleClick}>
      {variableLabel}
    </Button>
  );
};
