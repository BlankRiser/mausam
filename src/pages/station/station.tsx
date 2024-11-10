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
    <div className="p-2 space-y-2">
      <StnMetaDetails data={metadata.data} />
      <div className="grid md:grid-cols-2 gap-2">
        <div className="order-last md:order-first">
          <LatestStnDataTable data={latest.data} />
        </div>
        <div className="order-first md:order-last h-48 md:h-96">
          <StationMap data={metadata.data} />
        </div>
      </div>
    </div>
  );
};
