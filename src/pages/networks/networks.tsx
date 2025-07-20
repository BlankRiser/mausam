import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";
import { AllNetworksTable } from "./features/all-networks-table";

export const NetworksPage = () => {
  return (
    <div className="p-2">
      <Suspense
        fallback={
          <div className="w-fit h-fit z-100 absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-transparent flex justify-center items-center">
            <Loader />
          </div>
        }
      >
        <AllNetworksTable />
      </Suspense>
    </div>
  );
};
