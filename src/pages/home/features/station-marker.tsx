import { Link } from '@tanstack/react-router';
import { Popup } from '@vis.gl/react-maplibre';
import { MoveUpRight } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { MarkerLayer } from '@/components/map/marker-layer';
import { Button } from '@/components/ui/button';
import { MarkerVariant } from '@/lib/canvas-utils';
import { getFormattedTimezone } from '@/lib/date-utils';
import { MarkerLayerItem, prepareStationMarkers } from '@/lib/layer-utils';
import { getVariableData } from '@/lib/synoptic-utils';
import { useCurrentState } from '@/store/station.store';
import { Station } from '@/types/station';

export const StationMarker: React.FC<{
  stations: Array<Station>;
  units: Record<string, string>;
  variant?: MarkerVariant;
}> = ({ stations, units, variant = 'rectangle' }) => {
  const currentStation = useCurrentState((state) => state.currentStation);
  const setCurrentStation = useCurrentState((state) => state.setCurrentStation);
  const currentVariable = useCurrentState((state) => state.currentVariable);

  const markerItems = useMemo(
    () => prepareStationMarkers(stations, currentVariable),
    [stations, currentVariable]
  );

  const selectedId = currentStation?.STID ?? null;

  const activeSelectedStation = useMemo(() => {
    if (!selectedId || !stations) return null;
    for (let i = 0; i < stations.length; i++) {
      if (stations[i].STID === selectedId) return stations[i];
    }
    return null;
  }, [selectedId, stations]);

  const handleSelect = useCallback(
    (item: MarkerLayerItem<Station>) => {
      setCurrentStation(item.data);
    },
    [setCurrentStation]
  );

  if (!stations) return null;

  return (
    <>
      <MarkerLayer
        items={markerItems}
        variant={variant}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
      {activeSelectedStation && (
        <Popup
          latitude={+activeSelectedStation.LATITUDE}
          longitude={+activeSelectedStation.LONGITUDE}
          className='bg-transparent'
          closeButton={false}
          closeOnClick={false}
          onClose={() => setCurrentStation(null)}
          offset={[0, -8]}
        >
          <MarkerTooltipContents station={activeSelectedStation} units={units} />
        </Popup>
      )}
    </>
  );
};

const MarkerTooltipContents: React.FC<{
  station: Station;
  units: Record<string, string>;
}> = ({ station, units }) => {
  const currentVariable = useCurrentState((state) => state.currentVariable);

  const variables = useMemo(() => getVariableData(station, currentVariable), [station, currentVariable]);

  return (
    <div className='relative'>
      <div className='absolute right-[calc(95%)] bottom-[45%]'>
        <span className='writing-vertical-lr left-0 ml-1 rotate-180 px-2 text-lg font-medium text-blue-700 backdrop-blur-3xl [writing-mode:vertical-rl] dark:text-blue-400 '>
          {station.STID}
        </span>
      </div>
      <div className='relative aspect-video h-full w-full bg-blue-500 mask-[var(--container-mask)] mask-cover mask-center'>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 1688 918'
          className='fill-white dark:fill-black'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M74 12v467.986a22.999 22.999 0 0 1-12.602 20.515l-48.892 24.781A21.002 21.002 0 0 0 1 544.014V905.5c0 6.075 4.925 11 11 11h1588.5c6.08 0 11-4.925 11-11V790.173c0-8.201 4.37-15.782 11.46-19.896l53.08-30.784a21.012 21.012 0 0 0 10.46-18.166V12c0-6.075-4.92-11-11-11H85c-6.075 0-11 4.925-11 11Z'
            strokeWidth='2'
          />
        </svg>
        <div id='top-half' className='absolute inset-0 bottom-[50%] grid grid-cols-4 p-1 px-4 '>
          <div className='col-span-3'>
            {variables?.map((variable) => {
              const formattedDate = getFormattedTimezone({
                dateString: variable.dateTime,
                timezone: station.TIMEZONE,
                formatString: 'HH:mm MMM dd yyyy (z)',
              });

              const formattedValue = variable.value ? `${variable.value} ${units[currentVariable]}` : 'N/A';

              return (
                <div key={variable.sensor} className='flex h-full flex-col justify-center gap-0.5 text-primary'>
                  <span className={'text-lg font-medium'}>{formattedValue}</span>
                  <span className='text-xs text-muted-foreground'>{formattedDate}</span>
                </div>
              );
            })}
          </div>
          <div className='col-span-1 grid place-items-center'>
            <Link
              to={`/station/$stationId`}
              params={{
                stationId: station.STID,
              }}
              search={{
                variable: currentVariable,
              }}
            >
              <Button variant='outline' size='icon'>
                <MoveUpRight className='h-4 w-4 text-blue-500' />
              </Button>
            </Link>
          </div>
        </div>
        <div id='bottom-half' className='absolute inset-0 top-[50%]'>
          <div className='size-full px-1.5 py-3 text-accent-foreground'>
            <p className='truncate text-base font-medium'>{station.NAME}</p>
            <p className='text-xs'>{station.SHORTNAME ?? ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
