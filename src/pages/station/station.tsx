import {
  stationLatestQueryOptions,
  stationMetadataQueryOptions,
} from "@/api/query-factory";
import { stationRoute } from "@/router/routes";
import { useSuspenseQueries } from "@tanstack/react-query";
import { LatestStnDataTable } from "./features/latest-table";
import { StnMetaDetails } from "./features/stn-meta-details";
import { MinmaxBoxChart } from "./features/minmax-box-chart";

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
      <div className="flex flex-col gap-2">
        <div className="">
          <LatestStnDataTable data={latest.data} />
        </div>
        {/* <div className="order-first md:order-last h-48 md:h-96">
          <StationMap data={metadata.data} />
        </div> */}
        <div className="w-1/2 h-12">
          <MinmaxBoxChart data={latest.data} />
        </div>
      </div>
    </div>
  );
};
