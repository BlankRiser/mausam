import { useTheme } from '@/hooks/use-theme';
import { MapContainer } from './features/MapContainer';
import { StationSummary } from './features/station-summary';
import { useCurrentState } from '@/store/station.store';
import { Workspace, ViewType, Stage, View, useOptionalWorkspace, WorkspaceProvider } from '@danfessler/trellis-react';
import { useEffect } from 'react';

const StationSummaryController = () => {
  const currentStation = useCurrentState((state) => state.currentStation);
  const workspace = useOptionalWorkspace();

  useEffect(() => {
    if (currentStation && workspace) {
      workspace.open('station-summary', {
        placement: 'side',
        reuse: 'type'
      });
    }
  }, [currentStation, workspace]);

  return null;
};

export const Home = () => {
  const { theme } = useTheme();

  return (
    <section className='h-[calc(100dvh-var(--nav-height)-var(--footer-height))] rounded-md bg-neutral-50 dark:bg-neutral-950'>
      <Banner />
      <div className='relative h-full'>
        <WorkspaceProvider>
          <Workspace theme={theme === 'light' ? 'light' : 'darker'} version={2}>
            <ViewType id='map' closable={false} tabbar='never'>
              <MapContainer />
            </ViewType>
            <ViewType id='station-summary' title='Station Summary' closable={true} singleton={true} placement={{ beside: 'map', edge: 'right' }}>
              <div className='@container h-full w-full'>
                <div className='h-full w-full @min-aspect-video:min-h-[40vh] @max-aspect-video:min-w-[28rem]'>
                  <StationSummary />
                </div>
              </div>
            </ViewType>
            <Stage>
              <View type='map' />
            </Stage>
          </Workspace>
          <StationSummaryController />
        </WorkspaceProvider>
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
