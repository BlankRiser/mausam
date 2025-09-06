import { Suspense } from "react";
import { NetworksTable, NetworkTableSearch } from "./features/network-table";
import { Loader } from "@/components/ui/loader";

export const NetworksPage = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 grid place-items-center">
          <Loader />
        </div>
      }
    >
      <div className="space-y-2 p-2">
        <NetworkTableSearch />
        <NetworksTable />
      </div>
    </Suspense>
  );
};
