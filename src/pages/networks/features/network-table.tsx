import { networksQueryOptions } from "@/api/query-factory";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { MNETLabelItems } from "@/types/networks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo } from "react";

export const NetworksTable = () => {
  const { data } = useSuspenseQuery(networksQueryOptions());

  const columns = useMemo(() => getNetworkDataTableColumns(), []);

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    data: data.MNET,
    columns,
    enableRowSelection: true,
  });

  return (
    <div className="overflow-auto max-h-[calc(100svh-var(--nav-height)-var(--footer-height))]">
      <DataTable table={table} columns={columns} />
    </div>
  );
};

const getNetworkDataTableColumns = (): ColumnDef<MNETLabelItems>[] => {
  return [
    {
      id: "id",
      accessorKey: "ID",
      header: "Network ID",
      cell: ({ row }) => {
        return row.original.ID;
      },
    },
    {
      id: "Name",
      accessorKey: "SHORTNAME",
      header: "Name",
      cell: ({ row }) => {
        return row.original.SHORTNAME;
      },
    },
    {
      id: "total_stations",
      accessorKey: "TOTAL_STATIONS",
      header: "Total Stations",
      cell: ({ row }) => {
        return row.original.TOTAL_STATIONS;
      },
    },
    {
      id: "reporting_stations",
      accessorKey: "REPORTING_STATIONS",
      header: "Reporting Stations",
      cell: ({ row }) => {
        return row.original.REPORTING_STATIONS;
      },
    },
    {
      id: "avtive_from",
      header: "Active From",
      cell: ({ row }) => {
        if (!row.original.PERIOD_OF_RECORD?.start) {
          return "N/A";
        }

        return format(
          new Date(row.original.PERIOD_OF_RECORD.start),
          "MMM dd yyyy",
        );
      },
    },
    {
      id: "avtive_to",
      header: "Active Till",
      cell: ({ row }) => {
        if (!row.original.PERIOD_OF_RECORD?.end) {
          return "N/A";
        }

        return format(
          new Date(row.original.PERIOD_OF_RECORD.end),
          "MMM dd yyyy",
        );
      },
    },
    {
      id: "action",
      header: "",
      cell: ({ row }) => {
        return (
          <Button asChild variant="link">
            <Link
              to={`/networks/$networkId`}
              params={{
                networkId: row.original.ID,
              }}
            >
              View Details
            </Link>
          </Button>
        );
      },
    },
  ];
};
