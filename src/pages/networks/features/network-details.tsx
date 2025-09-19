import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { NetworkMetaDetails } from "@/pages/networks/features/network-meta-details";
import { NetworkStationsGlobe } from "@/pages/networks/features/network-stations-globe";
import { NetworkStationsTable } from "@/pages/networks/features/network-stations-table";

export const NetworkDetailsPage = () => {
  return (
    <div className="p-2 flex flex-col gap-2">
      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-14" />
            ))}
          </div>
        }
      >
        <NetworkMetaDetails />
      </Suspense>
      <Suspense
        fallback={
          <div>
            <Skeleton className="h-[calc(50dvh-var(--nav-height)-2rem)] w-full mx-auto" />
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className="col-span-1">
            <NetworkStationsGlobe />
          </div>
          <div className="col-span-1 md:col-span-3">
            <NetworkStationsTable />
          </div>
        </div>
      </Suspense>
    </div>
  );
};
