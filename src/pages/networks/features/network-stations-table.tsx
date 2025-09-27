import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { networksMetadataQueryOptions } from "@/api/query-factory";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { networkRoute } from "@/router/routes";
import type { MetadataStation } from "@/types/station-metadata";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";

export const StationTableSearch = () => {
  const navigate = useNavigate({ from: "/networks/$networkId" });
  const stationsIndexSearchParams = networkRoute.useSearch();
  return (
    <Input
      placeholder="Search station name or id"
      defaultValue={stationsIndexSearchParams.q ?? ""}
      onChange={(e) => {
        // regex to prevent anything other than alphabets and numbers
        const regex = /^[a-zA-Z0-9]*$/;
        if (regex.test(e.target.value)) {
          navigate({
            search: () => ({ q: e.target.value }),
          });
        }
      }}
    />
  );
};

export const NetworkStationsTable = () => {
  const stationsIndexSearchParams = networkRoute.useSearch();

  const { networkId } = networkRoute.useParams();
  const { data } = useSuspenseQuery(
    networksMetadataQueryOptions({
      network: networkId,
    }),
  );

  const columns = useMemo(() => getNetworkStationsDataTableColumns(), []);

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    data: data.STATION,
    columns,
    enableRowSelection: true,
    filterFns: {
      networkSearch: (row, value) => {
        if (!value) return true;

        const searchValue = value.toLowerCase();
        const networkId = row.original.ID?.toLowerCase() || "";
        const networkName = row.original.SHORTNAME?.toLowerCase() || "";

        return (
          networkId.includes(searchValue) || networkName.includes(searchValue)
        );
      },
    },
    state: {
      globalFilter: stationsIndexSearchParams.q ?? "",
    },
    enableGlobalFilter: true,
    globalFilterFn: "auto",
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (data.SUMMARY.RESPONSE_CODE === 500) {
    return null;
  }

  return (
    <div className="overflow-auto">
      <DataTable
        table={table}
        columns={columns}
        className="[&>div]:max-h-[calc(50dvh-var(--nav-height)-2rem)]"
      />
    </div>
  );
};

const getNetworkStationsDataTableColumns = (): ColumnDef<MetadataStation>[] => {
  return [
    {
      id: "stid",
      accessorKey: "STID",
      header: "Synoptic ID",
      cell: ({ row }) => {
        return row.original.STID;
      },
    },
    {
      id: "name",
      accessorKey: "NAME",
      header: "Station Name",
      cell: ({ row }) => {
        return row.original.NAME;
      },
    },
    {
      id: "status",
      accessorKey: "STATUS",
      header: "Station Status",
      cell: ({ row }) => {
        return (
          <Badge
            variant={
              row.original.STATUS === "ACTIVE" ? "success" : "destructive"
            }
            appearance="ghost"
          >
            <BadgeDot /> {row.original.STATUS}
          </Badge>
        );
      },
    },
    {
      id: "latlong",
      accessorKey: "LATLONG",
      header: "Latitude/Longitude",
      cell: ({ row }) => {
        return (
          <a
            href={`https://www.google.com/maps?q=${row.original.LATITUDE},${row.original.LONGITUDE}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 dark:text-blue-400"
          >
            {row.original.LATITUDE},{row.original.LONGITUDE}
          </a>
        );
      },
    },
    {
      id: "elevation",
      accessorKey: "ELEVATION",
      header: ({ table }) =>
        `Elevation (${table.getRowModel().rows[0]?.original?.UNITS?.elevation ?? "N/A"})`,
      cell: ({ row }) => {
        return `${parseInt(row.original.ELEVATION ?? "0").toFixed(0)}`;
      },
    },
    {
      id: "sensor_variables",
      header: "Sensor Variables",
      cell: ({ row }) => {
        const sensorVariables = Object.keys(
          row.original.SENSOR_VARIABLES ?? {},
        );

        return (
          <div>
            <Tooltip>
              <TooltipTrigger>{sensorVariables.length}</TooltipTrigger>
              <TooltipContent>
                <ul className="list-disc pl-4 max-h-48 overflow-y-auto">
                  {sensorVariables.length > 0 &&
                    sensorVariables.map((variable) => (
                      <li key={variable}>{variable}</li>
                    ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
    {
      id: "action",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button asChild variant="primary" mode="link" underline="solid">
              <a
                href={`https://viewer.synopticdata.com/metadata/${row.original.STID}/all/now`}
              >
                View Metadata
              </a>
            </Button>
            <Button asChild variant="primary" mode="link" underline="solid">
              <a
                href={`https://viewer.synopticdata.com/table/${row.original.STID}/all/now`}
              >
                View Station
              </a>
            </Button>
          </div>
        );
      },
    },
  ];
};
