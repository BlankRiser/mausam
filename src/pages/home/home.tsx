import { cn } from "@/lib/utils";
import { useCurrentState } from "@/store/station.store";
import { motion } from "motion/react";
import { MapContainer } from "./features/MapContainer";
import { StationSummary } from "./features/station-summary";

export const Home = () => {
  const currentStation = useCurrentState((state) => state.currentStation);

  return (
    <section className="bg-neutral-50 dark:bg-neutral-950 rounded-md h-[calc(100dvh-var(--nav-height)-var(--footer-height))]">
      <Banner />
      <div className="grid grid-cols-1 md:grid-cols-4 h-full">
        <div
          className={cn([
            !currentStation
              ? "md:col-span-4"
              : "col-span-1 md:col-span-2 lg:col-span-3",
            "col-span-1 h-full",
          ])}
        >
          <MapContainer />
        </div>
        <motion.div
          className={cn([
            "h-full",
            !currentStation ? "hidden" : "md:col-span-2 lg:col-span-1",
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
    <div className="w-full bg-blue-500 grid place-items-center p-2">
      <a
        className="text-sm text-white hover:underline underline-offset-4"
        href="https://docs.synopticdata.com/services/weather-data-api"
        target="_blank"
        rel="noopener noreferrer"
      >
        Built using Synoptic Weather API
      </a>
    </div>
  );
};
