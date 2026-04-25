import { Link } from '@tanstack/react-router';
import { Marker, Popup } from '@vis.gl/react-maplibre';
import { MoveUpRight } from 'lucide-react';
import { memo, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { getFormattedTimezone } from '@/lib/date-utils';
import { getVariableData } from '@/lib/synoptic-utils';
import { cn } from '@/lib/utils';
import { useCurrentState } from '@/store/station.store';
import { MinMax, Station } from '@/types/station';

export const StationMarker: React.FC<{
  stations: Array<Station>;
  units: Record<string, string>;
}> = ({ stations, units }) => {
  const currentStation = useCurrentState((state) => state.currentStation);
  if (!stations) return null;

  return (
    <>
      {stations?.map((station) => {
        return (
          <StationMarkerItem
            key={station.STID}
            station={station}
            units={units}
            isSelected={currentStation?.STID === station.STID}
          />
        );
      })}
    </>
  );
};

const StationMarkerItem = memo(
  ({ station, units, isSelected }: { station: Station; units: Record<string, string>; isSelected: boolean }) => {
    const setCurrentStation = useCurrentState((state) => state.setCurrentStation);
    const currentVariable = useCurrentState((state) => state.currentVariable);

    const data = useMemo(() => getSensorVariableDetails(station, currentVariable), [currentVariable, station]);

    const markerStyles = useMemo(
      () =>
        cn([
          'grid h-6 min-w-6 place-items-center rounded-sm will-change-auto',
          'border border-blue-300 bg-blue-50/90 transition-colors hover:bg-blue-100 dark:border-blue-700/50 dark:bg-blue-900/20',
          isSelected
            ? "relative bg-blue-200 outline-2 outline-blue-500 after:absolute after:grid after:h-5 after:w-5 after:animate-ping after:place-items-center after:rounded-full after:ring-3 after:ring-blue-500 after:content-[''] dark:bg-blue-800 dark:outline-blue-400"
            : '',
          'text-center font-sans text-xs mix-blend-difference',
        ]),
      [isSelected]
    );

    if (Object.keys(data ?? {}).length === 0 || !data?.latest.value) return null;

    return (
      <>
        <Marker
          latitude={+station.LATITUDE}
          longitude={+station.LONGITUDE}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setCurrentStation(station);
          }}
        >
          <div className={markerStyles}>{data.latest.value.toFixed(0)}</div>
        </Marker>
        {isSelected && (
          <Popup
            latitude={+station.LATITUDE}
            longitude={+station.LONGITUDE}
            className='bg-transparent'
            closeButton={false}
            closeOnClick={false}
            onClose={() => setCurrentStation(null)}
            offset={[0, -8]}
          >
            <MarkerTooltipContents station={station} units={units} />
          </Popup>
        )}
      </>
    );
  }
);

StationMarkerItem.displayName = 'StationMarkerItem';

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
            stroke-width='2'
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

const getSensorVariableDetails = (station: Station, selectedVariable: keyof typeof station.SENSOR_VARIABLES) => {
  if (Object.keys(station.SENSOR_VARIABLES).length === 0) return null;

  const sensorVariable = station.SENSOR_VARIABLES[selectedVariable];
  const details = {} as SensorVariableDetails;

  Object.entries(sensorVariable ?? {}).map(([key, _value]) => {
    if (station.OBSERVATIONS?.[key]) {
      details['latest'] = station.OBSERVATIONS[key] as SensorVariableDetails['latest'];
    }

    details['minMax'] = station.MINMAX?.[key] as SensorVariableDetails['minMax'];
  });

  return details;
};

interface SensorVariableDetails {
  latest: {
    value: number;
    date_time: string;
  };
  minMax?: MinMax;
}
