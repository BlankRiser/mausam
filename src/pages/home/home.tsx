import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useCurrentState } from "@/store/station.store";
import { MapContainer } from "./features/MapContainer";
import { StationSummary } from "./features/station-summary";

export const Home = () => {
  const currentStation = useCurrentState((state) => state.currentStation);

  return (
    <section className="bg-neutral-50 dark:bg-neutral-950 rounded-md h-[calc(100dvh-var(--nav-height)-var(--footer-height))]">
      <Banner />
      <div className=" h-full">
        <div className={cn(["col-span-1 h-full"])}>
          <MapContainer />
        </div>
        <motion.div
          className={cn([
            "h-full will-change-auto",
            !currentStation
              ? "hidden"
              : "fixed top-[calc(var(--nav-height)+var(--banner-height)-1px)] right-0 max-w-md w-full",
          ])}
        >
          <StationSummary />
        </motion.div>
      </div>
    </section>
  );
};

const Banner = () => {
  return (
    <div className="w-full bg-blue-500 grid place-items-center p-2 h-[var(--banner-height)]">
      <div className="max-w-7xl mx-auto text-center">
        <a
          className="text-sm text-white hover:underline underline-offset-4"
          href="https://docs.synopticdata.com/services/weather-data-api"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built using Synoptic Weather API.
        </a>{" "}
        <a
          href="https://viewer.synopticdata.com/"
          className="text-sm text-white hover:underline underline-offset-4"
        >
          Visit Synoptic Viewer for a more detailed view.
        </a>
      </div>
    </div>
  );
};
