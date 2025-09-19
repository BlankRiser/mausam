import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Suspense, useEffect, useState } from "react";
import {
  stationLatestQueryOptions,
  stationMetadataQueryOptions,
} from "@/api/query-factory";
import { Skeleton } from "@/components/ui/skeleton";
import ExpandingLatestTable from "@/pages/station/features/expanding-latest-table";
import { stationRoute } from "@/router/routes";
import { SensorVariables } from "@/types/station";
import { MinmaxBoxChart } from "./features/minmax-box-chart";
import { StationMap } from "./features/station-map";
import { StnMetaDetails } from "@/pages/station/features/stn-meta-details";
import { VariableTimeseriesChart } from "@/pages/station/features/variable-timeseries-chart";
export const StationDetailsPage = () => {
  return (
    <div className="p-2 space-y-2 ">
      <Suspense fallback={<MetadataDetailsFallback />}>
        <MetadataDetails />
      </Suspense>
      {/* <Suspense fallback={<ReportingDetailsFallback />}>
        <StationCards />
      </Suspense> */}
      <Suspense fallback={<ReportingDetailsFallback />}>
        <ReportingDetails />
      </Suspense>
    </div>
  );
};

const MetadataDetails = () => {
  const { stationId } = stationRoute.useParams();
  const { data } = useSuspenseQuery(
    stationMetadataQueryOptions({
      stid: stationId,
    }),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      key={data?.STATION?.[0]?.STID}
      className="grid grid-cols-2 md:grid-cols-3 gap-2"
    >
      <div className="col-span-2 md:col-span-1 w-full h-48 md:h-full">
        <StationMap data={data} />
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <StnMetaDetails data={data} />
      </div>
    </motion.div>
  );
};

const MetadataDetailsFallback = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Skeleton className="col-span-1 h-64 w-full" />
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

const ReportingDetails = () => {
  const navigate = useNavigate({ from: "/station/$stationId" });
  const { stationId } = stationRoute.useParams();

  const [displayAll, setDisplayAll] = useState(false);

  const { data, isFetched } = useSuspenseQuery(
    stationLatestQueryOptions({
      stid: stationId,
    }),
  );

  useEffect(() => {
    if (isFetched) {
      void navigate({
        to: "/station/$stationId",
        params: {
          stationId: stationId,
        },
        search: {
          variable: Object.keys(data?.STATION?.[0]?.SENSOR_VARIABLES ?? {})[0],
        },
      });
    }
  }, [data?.STATION, isFetched, navigate, stationId]);

  return (
    <>
      {/* <LatestStnDataTable data={data} /> */}
      <ExpandingLatestTable data={data} />
      <div className="grid md:grid-cols-2 gap-2">
        <MinmaxBoxChart data={data} />
        <VariableTimeseries />
      </div>
      {displayAll && (
        <DisplayAllVariables
          variables={
            Object.keys(data?.STATION?.[0]?.SENSOR_VARIABLES ?? {}) as Array<
              keyof SensorVariables
            >
          }
        />
      )}
      <div className="bg-gradient-to-b from-white dark:from-gray-900 to-transparent rounded-md p-2 grid place-items-center">
        <button
          onClick={() => {
            setDisplayAll((p) => !p);
          }}
          className="cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-500 text-sm text-zinc-500 dark:text-zinc-400"
        >
          {displayAll ? "Hide all the variables" : "Show all the variables"}
        </button>
      </div>
    </>
  );
};

export const VariableTimeseries = () => {
  const { variable } = stationRoute.useSearch();
  const { stationId } = stationRoute.useParams();

  return (
    <div className="space-y-2">
      <VariableTimeseriesChart
        stationId={stationId}
        variable={variable as keyof SensorVariables}
      />
    </div>
  );
};

const ReportingDetailsFallback = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-80 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    </div>
  );
};

const DisplayAllVariables = ({
  variables,
}: {
  variables: Array<keyof SensorVariables>;
}) => {
  const { stationId } = stationRoute.useParams();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {variables.map((variable) => (
        <VariableTimeseriesChart
          key={variable}
          stationId={stationId}
          variable={variable}
        />
      ))}
    </div>
  );
};
