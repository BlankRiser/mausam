import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { rootRoute } from "@/router/root-route";
import { stationRoute } from "@/router/routes";
import { LatestStationResponse } from "@/types/station";
import { useNavigate } from "@tanstack/react-router";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export const LatestStnDataTable = ({
  data,
}: {
  data: LatestStationResponse;
}) => {
  const { stationId } = stationRoute.useParams();
  const navigate = useNavigate({ from: "/station/$stationId" });
  const { variable: selectedVariable } = stationRoute.useSearch();

  const [rowSelection, setRowSelection] = useState({
    [selectedVariable ?? ""]: true
  });

  const columns = useMemo(() => getLatestStnDataTableColumns(), []);
  const rows = useMemo(() => transformData(data), [data]);

  useEffect(() => {
    const variable = Object.keys(rowSelection)[0];
    void navigate({
      to: "/station/$stationId",
      params: {
        stationId: stationId,
      },
      search: {
        variable: variable,
      },
    });
  }, [navigate, rowSelection, stationId]);

  const table = useReactTable({
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: (value) => {
      setRowSelection(value);
    },
    getRowId: (row) => row.sensorKey,
    getCoreRowModel: getCoreRowModel(),
    data: rows,
    columns,
  });

  if (
    data?.STATION?.length === 0 ||
    Object.keys(data.STATION?.[0].SENSOR_VARIABLES ?? {}).length === 0
  ) {
    return <LatestStnDataTableFallback />;
  }

  return <DataTable table={table} columns={columns} showStripes={true} />;
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

const getLatestStnDataTableColumns = ((): ColumnDef<TransformedData>[] => {
  return [
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
});

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
          sensorKey: sensorKey,
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



const LatestStnDataTableFallback = () => {
  return (
    <div className="aspect-video rounded-md grid place-items-center border border-neutral-200 dark:border-neutral-800">
      <span className="">
        There seems to be an issue with the data. <br /> Please try again later.
      </span>
    </div>
  );
};

const RenderVariableLabel = ({ variable }: { variable: string }) => {
  const { variableLabels } = rootRoute.useLoaderData();
  const { stationId } = stationRoute.useParams();
  const navigate = useNavigate({ from: "/station/$stationId" });

  const handle = () => {
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

  const variableLabel = variableLabels
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ? (variableLabels.get(variable)?.long_name ?? variable)
    : variable;

  return (
    <Button variant={"ghost"} size="sm" onClick={handle}>
      {variableLabel}
    </Button>
  );
};
