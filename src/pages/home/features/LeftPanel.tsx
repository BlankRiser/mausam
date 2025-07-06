import { InfoCard } from "@/components/common/info-card";
import { useCurrentState } from "@/store/station.store";
import { rootRoute } from "@/router/root-route";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

export const LeftPanel = () => {
  return (
    <section className="w-full overflow-y-auto h-full px-2 space-y-2">
      <StationSummary />
    </section>
  );
};



const StationSummary = () => {
  const { currentStation, currentVariable } = useCurrentState();
  const { variableLabels } = rootRoute.useLoaderData();

  const selectedVariable = useMemo(() => {
    const variable = variableLabels.get(currentVariable);
    return variable ? variable.long_name : "Unknown Variable";
  }, [currentVariable, variableLabels]);

  if (!currentStation) {
    return <div className="h-full grid place-items-center">Select a station</div>;
  }

  return (
    <div className="flex flex-col gap-1 bg-neutral-200 dark:bg-neutral-900 p-2 rounded-md">
      <div className="flex justify-between items-center">
        <span>Station Details</span>
        <Link
          to="/station/$stationId"
          params={{
            stationId: currentStation.STID,
          }}
          search={{
            variable: currentVariable
          }}
          className="text-sm text-blue-600 dark:text-blue-400 underline underline-offset-4"
        >
          Get more details
        </Link>
      </div>
      <InfoCard name="Status" value={currentStation.STATUS} />
      <InfoCard name="Station Name" value={currentStation.NAME} />
      <InfoCard
        name="Synoptic ID"
        value={currentStation.STID}
        linkValue={{
          to: "/station/$stationId",
          params: {
            stationId: currentStation.STID,
          },
        }}
      />
      <InfoCard
        name="Network"
        value={currentStation?.SHORTNAME ?? "N/A"}
        linkValue={{
          to: "/networks/$networkId",
          params: {
            networkId: currentStation.MNET_ID.toString(),
          },
        }}
      />
      <InfoCard name="NWS Zone" value={currentStation.NWSZONE} />
      <InfoCard name="Latitude" value={currentStation.LATITUDE} />
      <InfoCard name="Longitude" value={currentStation.LONGITUDE} />
      <InfoCard name="Timezone" value={currentStation.TIMEZONE} />
    </div>
  );
};
