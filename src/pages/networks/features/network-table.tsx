import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { networksQueryOptions } from "@/api/query-factory";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { throttle } from "@/lib/utils";
import { networksIndexRoute } from "@/router/routes";
import { MNETLabelItems } from "@/types/networks";

export const NetworkTableSearch = () => {
  const navigate = useNavigate({ from: "/networks/" });
  const networksIndexSearchParams = networksIndexRoute.useSearch();
  const [searchValue, setSearchValue] = useState(networksIndexSearchParams.q ?? "");

  const throttledNavigate = useMemo(
    () =>
      throttle((q: string) => {
        navigate({ search: () => ({ q }) });
      }, 250),
    [navigate],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trimStart();
    const isDeleting = newValue.length < searchValue.length || newValue === "";
    setSearchValue(newValue);
    if (isDeleting) {
      throttledNavigate.cancel();
      navigate({ search: () => ({ q: newValue }) });
    } else {
      throttledNavigate(newValue);
    }
  };

  return (
    <Input
      placeholder="Search network name or id"
      value={searchValue}
      ref={(ref) => ref?.focus()}
      onChange={handleChange}
    />
  );
};

export const NetworksTable = () => {
  const networksIndexSearchParams = networksIndexRoute.useSearch();
  const { data } = useSuspenseQuery(networksQueryOptions());
  const columns = useMemo(() => getNetworkDataTableColumns(), []);

  const table = useReactTable({
    data: data.MNET,
    columns,
    enableRowSelection: true,
    filterFns: {
      networkSearch: (row, value) => {
        if (!value) return true;

        const searchValue = value.toLowerCase();
        const networkId = row.original.ID?.toLowerCase() || "";
        const networkName = row.original.SHORTNAME?.toLowerCase() || "";

        return networkId.includes(searchValue) || networkName.includes(searchValue);
      },
    },
    state: {
      globalFilter: networksIndexSearchParams.q ?? "",
    },
    enableGlobalFilter: true,
    globalFilterFn: "auto",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="overflow-auto">
      <DataTable
        table={table}
        columns={columns}
        className="[&>div]:max-h-[calc(100dvh-var(--nav-height)-4rem)]"
      />
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

        return (
          <span className="text-nowrap">
            {format(new Date(row.original.PERIOD_OF_RECORD.start), "MMM dd yyyy")}
          </span>
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

        return (
          <span className="text-nowrap">
            {format(new Date(row.original.PERIOD_OF_RECORD.end), "MMM dd yyyy")}
          </span>
        );
      },
    },
    {
      id: "action",
      header: "",
      cell: ({ row }) => {
        return (
          <Button asChild variant="primary" mode="link" underline="solid">
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
