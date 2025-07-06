import {
  stationLatestQueryOptions,
  stationMetadataQueryOptions,
} from "@/api/query-factory";
import { stationRoute } from "@/router/routes";
import { SensorVariables } from "@/types/station";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { MinmaxBoxChart } from "./features/minmax-box-chart";
import { StationMap } from "./features/station-map";
import { LatestStnDataTable } from "./features/station-table";
import { StnMetaDetails } from "./features/stn-meta-details";
import { VariableTimeseriesChart } from "./features/variable-timeseries-chart";

export const StationDetailsPage = () => {
  const navigate = useNavigate({ from: "/station/$stationId" });
  const { stationId } = stationRoute.useParams();

  const [metadata, latest] = useSuspenseQueries({
    queries: [
      stationMetadataQueryOptions({
        stid: stationId,
      }),
      stationLatestQueryOptions({
        stid: stationId,
      }),
    ],
  });

  useEffect(() => {
    if (latest.isFetched) {
      void navigate({
        to: "/station/$stationId",
        params: {
          stationId: stationId,
        },
        search: {
          variable: Object.keys(
            latest.data?.STATION?.[0]?.SENSOR_VARIABLES ?? {},
          )[0],
        },
      });
    }
  }, [latest.data?.STATION, latest.isFetched, navigate, stationId]);

  return (
    <div className="p-2 space-y-2 ">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <div className="col-span-2 md:col-span-1 w-full h-48 md:h-full">
          <StationMap data={metadata.data} />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <StnMetaDetails data={metadata.data} />
        </div>
      </div>
      <LatestStnDataTable data={latest.data} />
      <div className="grid md:grid-cols-2 gap-2">
        <MinmaxBoxChart data={latest.data} />
        <VariableTimeseries />
      </div>
    </div>
  );
};

export const VariableTimeseries = () => {
  const { variable } = stationRoute.useSearch();

  return (
    <div className="space-y-2">
      <VariableTimeseriesChart variable={variable as keyof SensorVariables} />
    </div>
  );
};

// const getVariables = (data: LatestStationResponse) => {
//   if (!data || data.STATION.length === 0) return [];
//   return Object.keys(data.STATION?.[0]?.SENSOR_VARIABLES ?? {}).filter(
//     (variable) => ignoreVariables.includes(variable) === false,
//   ) as Array<keyof SensorVariables>;
// };
