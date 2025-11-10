import { Suspense } from "react";
import { CompareDataGrid } from "@/pages/compare-stids/features/compare-data-grid";
import { compareStationsRoute } from "@/router/routes";

export const CompareStations = () => {
  const { stids } = compareStationsRoute.useSearch();

  return (
    <section className="p-2">
      <span>{JSON.stringify(stids, null, 2)}</span>
      <Suspense fallback={<div>Loading comparison data...</div>}>
        <CompareDataGrid />
      </Suspense>
    </section>
  );
};
