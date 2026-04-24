import { useMediaQuery } from '@uidotdev/usehooks';
import { NavigationControl } from '@vis.gl/react-maplibre';
import { StationMarker } from './station-marker';
import { VariableSelector } from './variable-selector';
import { useStationMetadata } from '@/api/use-station-data';
import { GlobalErrorBoundary } from '@/components/common/GlobalErrorBoundary';
import { MapWrapper } from '@/components/common/map-wrapper';
import { Loader } from '@/components/ui/loader';
import { Skeleton } from '@/components/ui/skeleton';

export const MapContainer = () => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
  const { data, refetch, isFetching } = useStationMetadata();

  return (
    <GlobalErrorBoundary>
      <div className='relative h-full w-full'>
        <MapWrapper
          id='map'
          hash='map'
          reuseMaps={true}
          onZoomEnd={() => {
            console.log('zoom end');
            void refetch();
          }}
          onDragEnd={() => {
            void refetch();
          }}
          onMoveEnd={() => {
            void refetch();
          }}
          initialViewState={{
            longitude: -113.698,
            latitude: 37.155,
            zoom: 7,
          }}
        >
          <Skeleton className='h-fit w-fit' />
          {!isSmallDevice && <NavigationControl position='bottom-left' />}
          {!!data && <StationMarker stations={data.STATION} units={data.UNITS} />}
        </MapWrapper>
        {isFetching ? (
          <div className='absolute top-1/2 left-1/2 z-100 flex h-fit w-fit translate-x-[-50%] translate-y-[-50%] items-center justify-center bg-transparent'>
            <Loader />
          </div>
        ) : null}
        <div className='absolute inset-x-0 bottom-8 grid place-items-center '>
          <VariableSelector />
        </div>
      </div>
    </GlobalErrorBoundary>
  );
};
