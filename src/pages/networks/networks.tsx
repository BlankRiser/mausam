import { Suspense } from "react";
import { NetworksTable } from "./features/network-table";
import { Loader } from "@/components/ui/loader";

export const NetworksPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="fixed inset-0 grid place-items-center">
            <Loader />
          </div>
        }
      >
        <NetworksTable />
      </Suspense>
    </div>
  );
};
