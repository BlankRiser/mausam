import {
  stationLatestQueryOptions,
  stationMetadataQueryOptions,
} from "@/api/query-factory";
import { stationRoute } from "@/router/routes";
import { useSuspenseQueries } from "@tanstack/react-query";
import { StnMetaDetails } from "./features/stn-meta-details";
import { LatestStnDataTable } from "./features/latest-table";

export const StationDetails = () => {
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

  return (
    <div className="p-2 space-y-4">
      <StnMetaDetails data={metadata.data} />
      <LatestStnDataTable data={latest.data} />
    </div>
  );
};
