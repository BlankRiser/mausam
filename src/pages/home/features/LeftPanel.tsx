import { Moon, Sun } from "@/assets/icons";
import { InfoCard } from "@/components/common/info-card";
import { useTheme } from "@/hooks/use-theme";
import { useCurrentState } from "@/providers/station-store";
import { indexRoute } from "@/router/routes";
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
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex flex-col gap-0.5 items-center py-4">
      <div className="flex gap-2 items-center justify-center w-full">
        <h1 className="text-center text-lg font-semibold text-neutral-800 dark:text-neutral-200 ">
          Mausam
        </h1>
        <button onClick={toggleTheme}>
          {theme === "light" ? <Sun /> : <Moon />}
        </button>
      </div>
      <a
        className="text-sm text-blue-600 dark:text-blue-400"
        href="https://docs.synopticdata.com/services/weather-data-api"
      >
        Built using Synoptic Weather Data API
      </a>
    </div>
  );
};

const StationSummary = () => {
  const { currentStation, currentVariable } = useCurrentState();
  const { variableLabels } = indexRoute.useLoaderData();

  const selectedVariable = useMemo(
    () => variableLabels.get(currentVariable)!.long_name,
    [currentVariable, variableLabels],
  );

  if (!currentStation) {
    return <>Select a station</>;
  }

  return (
    <div className="flex flex-col gap-1 bg-neutral-200 dark:bg-neutral-700 p-2 rounded-md">
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
