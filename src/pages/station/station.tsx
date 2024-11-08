import {
  stationLatestQueryOptions,
  stationMetadataQueryOptions,
} from "@/api/query-factory";
import { stationRoute } from "@/router/routes";
import { useSuspenseQueries } from "@tanstack/react-query";
import { StnMetaDetails } from "./features/stn-meta-details";
import { LatestStnDataTable } from "./features/latest-table";
import { StationMap } from "./features/station-map";

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
      <div className="grid grid-cols-2 gap-2">
        <LatestStnDataTable data={latest.data} />
        <StationMap data={latest.data} />
      </div>
      <StnMetaDetails data={metadata.data} />
    </div>
  );
};
