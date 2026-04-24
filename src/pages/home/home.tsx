import { motion } from 'motion/react';
import { MapContainer } from './features/MapContainer';
import { StationSummary } from './features/station-summary';
import { cn } from '@/lib/utils';
import { useCurrentState } from '@/store/station.store';

export const Home = () => {
  const currentStation = useCurrentState((state) => state.currentStation);

  return (
    <section className='h-[calc(100dvh-var(--nav-height)-var(--footer-height))] rounded-md bg-neutral-50 dark:bg-neutral-950'>
      <Banner />
      <div className=' h-full'>
        <div className={cn(['col-span-1 h-full'])}>
          <MapContainer />
        </div>
        <motion.div
          className={cn([
            'h-full will-change-auto',
            !currentStation
              ? 'hidden'
              : 'fixed top-[calc(var(--nav-height)+var(--banner-height)-1px)] right-0 w-full max-w-md',
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
    <div className='grid h-[var(--banner-height)] w-full place-items-center bg-blue-500 p-2'>
      <div className='mx-auto max-w-7xl text-center'>
        <a
          className='text-sm text-white underline-offset-4 hover:underline'
          href='https://docs.synopticdata.com/services/weather-data-api'
          target='_blank'
          rel='noopener noreferrer'
        >
          Built using Synoptic Weather API.
        </a>{' '}
        <a href='https://viewer.synopticdata.com/' className='text-sm text-white underline-offset-4 hover:underline'>
          Visit Synoptic Viewer for a more detailed view.
        </a>
      </div>
    </div>
  );
};
