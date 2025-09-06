import { networksMetadataQueryOptions } from "@/api/query-factory";
import { DeniedAccess } from "@/components/common/denied-access";
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
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

export const NetworkStationsTable = () => {
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
  });

  if (data.SUMMARY.RESPONSE_CODE === 500) {
    return <DeniedAccess />;
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
        return `${row.original.LATITUDE},${row.original.LONGITUDE}`;
      },
    },
    {
      id: "elevation",
      accessorKey: "ELEVATION",
      header: ({ table }) =>
        `Elevation (${table.getRowModel().rows[0].original.UNITS.elevation})`,
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
