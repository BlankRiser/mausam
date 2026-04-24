import { useMediaQuery } from '@uidotdev/usehooks';
import { motion } from 'motion/react';
import { InfoCard } from '@/components/common/info-card';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { useCurrentState } from '@/store/station.store';

export const StationSummary = () => {
  const currentStation = useCurrentState((s) => s.currentStation);

  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');

  if (isSmallDevice) {
    return (
      <Drawer
        open={!!currentStation}
        onOpenChange={(open) => !open && useCurrentState.getState().setCurrentStation(null)}
      >
        <DrawerContent className='p-1'>
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
      className='h-full bg-gradient-to-bl from-neutral-50 to-transparent p-1 backdrop-blur-sm dark:from-neutral-950'
      style={{
        // clipPath: "polygon(70% 0, 100% 0, 100% 100%, 0 100%, 36% 54%)",
        mask: 'linear-gradient(to top, transparent, var(--background) 60%)',
      }}
    >
      <Summary />
    </motion.div>
  );
};

const Summary = () => {
  const currentStation = useCurrentState((s) => s.currentStation);

  if (!currentStation) {
    return null;
  }

  return (
    <div className={cn(['flex h-full flex-col gap-1 overflow-y-auto rounded-md bg-transparent '])}>
      <InfoCard name='Status' value={currentStation.STATUS} />
      <InfoCard name='Station Name' value={currentStation.NAME} />
      <InfoCard
        name='Synoptic ID'
        value={currentStation.STID}
        linkValue={{
          to: '/station/$stationId',
          params: {
            stationId: currentStation.STID,
          },
        }}
      />
      <InfoCard
        name='Network'
        value={currentStation?.SHORTNAME ?? 'N/A'}
        linkValue={{
          to: '/networks/$networkId',
          params: {
            networkId: currentStation.MNET_ID.toString(),
          },
        }}
      />
      <InfoCard name='NWS Zone' value={currentStation.NWSZONE} />
      <InfoCard
        name='Lat/Long'
        value={`${currentStation.LATITUDE}, ${currentStation.LONGITUDE}`}
        href={`https://www.google.com/maps/search/?api=1&query=${currentStation.LATITUDE},${currentStation.LONGITUDE}`}
      />
      <InfoCard name='Timezone' value={currentStation.TIMEZONE} />
    </div>
  );
};
