import { Moon, Sun } from "@/assets/icons";
import { useTheme } from "@/hooks/use-theme";
import { useCurrentState } from "@/providers/station-store";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex gap-2 items-center justify-center w-full">
      <h1 className="text-center text-lg font-semibold text-neutral-800 dark:text-neutral-200 py-4">
        Mausam
      </h1>
      <button onClick={toggleTheme}>
        {" "}
        {theme === "light" ? <Sun /> : <Moon />}
      </button>
    </div>
  );
};

export const StationSummary = () => {
  const { currentStation, currentVariable } = useCurrentState();

  if (!currentStation) {
    return <>Select a station</>;
  }

  return (
    <div className="flex flex-col gap-3 px-2">
      <p className="text-black text-lg">{currentVariable ?? "none"}</p>
      <InfoCard name="Station ID" value={currentStation.STID} />
      <InfoCard name="Station Name" value={currentStation.NAME} />
      <InfoCard name="Timezone" value={currentStation.TIMEZONE} />
      <InfoCard name="Latitude" value={currentStation.LATITUDE} />
      <InfoCard name="Longitude" value={currentStation.LONGITUDE} />
      <InfoCard
        name="Network Short Name"
        value={currentStation.MNET_SHORTNAME ?? ""}
      />
    </div>
  );
};

type InfoCardProps = {
  name: string;
  value: string | number;
};

export const InfoCard: React.FC<InfoCardProps> = ({ name, value }) => {
  return (
    <div className="px-4 py-2 rounded-md bg-neutral-200 dark:bg-neutral-800">
      <p className="text-xs text-neutral-500 dark:text-neutral-300">{name}</p>
      <span>{value}</span>
    </div>
  );
};
