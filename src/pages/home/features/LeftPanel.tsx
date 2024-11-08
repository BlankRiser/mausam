import { InfoCard } from "@/components/common/info-card";
import { useCurrentState } from "@/store/station.store";
import { rootRoute } from "@/router/root-route";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

export const LeftPanel = () => {
  return (
    <section className="w-full overflow-y-auto h-full px-2 space-y-2">
      <Header />
      <StationSummary />
    </section>
  );
};

const Header = () => {
  return (
    <div className="">
      <a
        className="text-sm text-blue-600 dark:text-blue-400 underline underline-offset-4"
        href="https://docs.synopticdata.com/services/weather-data-api"
      >
        Built using Synoptic Weather Data API
      </a>
    </div>
  );
};

const StationSummary = () => {
  const { currentStation, currentVariable } = useCurrentState();
  const { variableLabels } = rootRoute.useLoaderData();

  const selectedVariable = useMemo(
    () => variableLabels.get(currentVariable)!.long_name,
    [currentVariable, variableLabels],
  );

  if (!currentStation) {
    return <>Select a station</>;
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
          className="text-sm text-blue-600 dark:text-blue-400 underline underline-offset-4"
        >
          Get more details
        </Link>
      </div>
      <InfoCard name="STID" value={currentStation.STID} />
      <InfoCard name="Station Variable" value={selectedVariable} />
      <InfoCard name="Station Name" value={currentStation.NAME} />
      <InfoCard name="Timezone" value={currentStation.TIMEZONE} />
      <InfoCard name="Latitude" value={currentStation.LATITUDE} />
      <InfoCard name="Longitude" value={currentStation.LONGITUDE} />
    </div>
  );
};
