import { DataTable } from "@/components/ui/data-table";
import { rootRoute } from "@/router/root-route";
import { LatestStationResponse } from "@/types/station";
import { VariableLabelItems } from "@/types/variables";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

export const LatestStnDataTable = ({
  data,
}: {
  data: LatestStationResponse;
}) => {
  const { variableLabels } = rootRoute.useLoaderData();
  const columns = useMemo(
    () => getLatestStnDataTableColumns(variableLabels),
    [variableLabels],
  );

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    data: transformData(data),
    columns,
    enableRowSelection: true,
  });

  if (
    data.STATION.length === 0 ||
    Object.keys(data.STATION[0].SENSOR_VARIABLES ?? {}).length === 0
  ) {
    return <LatestStnDataTableFallback />;
  }

  return <DataTable table={table} columns={columns} className="h-96" />;
};

const getLatestStnDataTableColumns = (
  variableLabels: Map<string, VariableLabelItems>,
): ColumnDef<TransformedData>[] => {
  return [
    {
      id: "variable",
      header: "Variable",
      cell: ({ row }) => {
        if (variableLabels) {
          return (
            variableLabels.get(row.original.variable)?.long_name ??
            row.original.variable
          );
        }
        return row.original.variable;
      },
    },
    {
      id: "position",
      header: "Sensor Position",
      cell: ({ row }) => {
        const { value, unit } = row.original.position;

        if (!value) {
          return "N/A";
        }

        return `${value} ${unit}`;
      },
    },
    {
      id: "sensor-date-time",
      header: "Date Time",
      cell: ({ row }) => {
        return row.original.observation.dateTime;
      },
    },
    {
      id: "sensor-value",
      header: "Value",
      cell: ({ row }) => {
        const { value, unit } = row.original.observation;

        if (!value) {
          return "N/A";
        }

        return (
          <p>
            {value}{" "}
            <span className="text-neutral-400 dark:text-neutral-600">
              {unit}{" "}
            </span>
          </p>
        );
      },
    },
  ];
};

const transformData = (data: LatestStationResponse) => {
  const station = data.STATION[0];
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

interface TransformedData {
  variable: string;
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

const LatestStnDataTableFallback = () => {
  return (
    <div className="rounded-md grid place-items-center border border-neutral-200 dark:border-neutral-800">
      <span className="">
        There seems to be an issue with the data. <br /> Please try again later.
      </span>
    </div>
  );
};
