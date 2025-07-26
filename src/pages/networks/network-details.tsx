import { Suspense } from "react";
import { NetworkStationsTable } from "./features/network-stations-table";

export const NetworkDetailsPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="text-black dark:text-white">
            Loading stations from network...
          </div>
        }
      >
        <NetworkStationsTable />
      </Suspense>
    </div>
  );
};
