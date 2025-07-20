import { InfoCard } from "@/components/common/info-card";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { VariableTimeseriesChart } from "@/pages/station/features/variable-timeseries-chart";
import { useCurrentState } from "@/store/station.store";
import { SensorVariables } from "@/types/station";
import { useMediaQuery } from "@uidotdev/usehooks";
import { motion } from "motion/react";

export const StationSummary = () => {
  const currentStation = useCurrentState((s) => s.currentStation);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  if (isSmallDevice) {
    return (
      <Drawer
        open={!!currentStation}
        onOpenChange={(open) =>
          !open && useCurrentState.getState().setCurrentStation(null)
        }
      >
        <DrawerContent className="p-1">
          <Summary />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      // className="absolute top-1/2 translate-y-[-50%] right-4 bg-red-400"
      className="p-1"
    >
      <Summary />
    </motion.div>
  );
};

const Summary = () => {
  const { currentStation, currentVariable } = useCurrentState();

  if (!currentStation) {
    return null;
  }

  return (
    <div
      className={cn([
        "bg-transparent flex flex-col gap-1 rounded-md h-full overflow-y-auto ",
      ])}
    >
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
      <VariableTimeseriesChart
        stationId={currentStation.STID}
        variable={currentVariable as keyof SensorVariables}
      />
    </div>
  );
};
