import {
  stationLatestQueryOptions,
  stationMetadataQueryOptions,
} from "@/api/query-factory";
import { ignoreVariables } from "@/data/ignore-list";
import { stationRoute } from "@/router/routes";
import { LatestStationResponse, SensorVariables } from "@/types/station";
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
      <div className="grid md:grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <StnMetaDetails data={metadata.data} />
          <LatestStnDataTable data={latest.data} />
        </div>
        <div className="w-full h-48 md:h-full">
          <StationMap data={metadata.data} />
        </div>
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

const getVariables = (data: LatestStationResponse) => {
  if (!data || data.STATION.length === 0) return [];
  return Object.keys(data.STATION?.[0]?.SENSOR_VARIABLES ?? {}).filter(
    (variable) => ignoreVariables.includes(variable) === false,
  ) as Array<keyof SensorVariables>;
};
