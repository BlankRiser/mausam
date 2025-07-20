import { networksMetadataQueryOptions } from "@/api/query-factory";
import { networkRoute } from "@/router/routes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

export const NetworkDetailsPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="text-black dark:text-white">
            Loading network details...
          </div>
        }
      >
        <NetworkStations />
      </Suspense>
    </div>
  );
};

const NetworkStations = () => {
  const { networkId } = networkRoute.useParams();
  const { data: networkStations } = useSuspenseQuery(
    networksMetadataQueryOptions({
      network: networkId,
    }),
  );
  return <div>{JSON.stringify(networkStations.STATION[0], null, 2)}</div>;
};
