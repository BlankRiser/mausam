import {
  Activity,
  Cloud,
  CloudRain,
  Compass,
  Droplets,
  Eye,
  Flame,
  Gauge,
  Snowflake,
  Sun,
  Thermometer,
  Waves,
  Wind as WindIcon,
  Zap,
} from 'lucide-react';
import { ReactNode } from 'react';
import {
  AirTemperature,
  DewPointTemperature,
  ParticulateMatter25,
  Pressure,
  RelativeHumidity,
  SolarRadiation,
  Voltage,
  Wind,
} from '@/assets/icons/variable-icons';

export const variables = [
  {
    label: 'Air temperature',
    value: 'air_temp',
    apiLookup: ['air_temp'],
    icon: <AirTemperature className='size-9 text-neutral-800 dark:text-neutral-200' />,
  },
  {
    label: 'Dew point temp.',
    value: 'dew_point_temperature',
    apiLookup: ['dew_point_temperature'],
    icon: <DewPointTemperature className='size-7 text-neutral-800 dark:text-neutral-200' />,
  },
  {
    label: 'Relative humidity',
    value: 'relative_humidity',
    apiLookup: ['relative_humidity'],
    icon: <RelativeHumidity className='size-9 text-neutral-800 dark:text-neutral-200' />,
  },
  {
    label: 'Surface winds',
    value: 'wind_speed',
    apiLookup: ['wind_speed', 'wind_gust', 'wind_direction', 'wind_cardinal_direction'],
    icon: <Wind className='size-8 text-neutral-800 dark:text-neutral-200' />,
  },
  {
    label: 'Station pressure',
    value: 'pressure',
    apiLookup: ['pressure'],
    icon: <Pressure className='size-9 text-neutral-800 dark:text-neutral-200' />,
  },
  {
    label: 'PM2.5',
    value: 'PM_25_concentration',
    apiLookup: ['PM_25_concentration'],
    icon: <ParticulateMatter25 className='size-10 text-neutral-800 dark:text-neutral-200' />,
  },
  {
    label: 'Voltage',
    value: 'volt',
    apiLookup: ['volt'],
    icon: <Voltage className='size-8 text-neutral-800 dark:text-neutral-200' />,
  },
  {
    label: 'Solar radiation',
    value: 'solar_radiation',
    apiLookup: ['solar_radiation'],
    icon: <SolarRadiation className='size-4 text-neutral-800 dark:text-neutral-200' />,
  },
];

export function getVariableIcon(variableKey: string): ReactNode {
  const key = variableKey.toLowerCase();

  if (key === 'air_temp') {
    return <AirTemperature className='size-5 shrink-0 text-current' />;
  }
  if (key === 'dew_point_temperature') {
    return <DewPointTemperature className='size-4 shrink-0 text-current' />;
  }
  if (key === 'relative_humidity') {
    return <RelativeHumidity className='size-5 shrink-0 text-current' />;
  }
  if (key === 'wind_speed') {
    return <Wind className='size-5 shrink-0 text-current' />;
  }
  if (key === 'pressure') {
    return <Pressure className='size-5 shrink-0 text-current' />;
  }
  if (key === 'pm_25_concentration') {
    return <ParticulateMatter25 className='size-5 shrink-0 text-current' />;
  }
  if (key === 'volt') {
    return <Voltage className='size-5 shrink-0 text-current' />;
  }
  if (key === 'solar_radiation') {
    return <SolarRadiation className='size-4 shrink-0 text-current' />;
  }

  if (key.includes('temp') || key.includes('tmp') || key.includes('heat') || key.includes('chill')) {
    return <Thermometer className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('direction') || key.includes('cardinal')) {
    return <Compass className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('wind') || key.includes('gust') || key.includes('vel')) {
    return <WindIcon className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('snow') || key.includes('ice') || key.includes('freez')) {
    return <Snowflake className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('precip') || key.includes('rain')) {
    return <CloudRain className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('humid') || key.includes('moist') || key.includes('evapo') || key.includes('dew')) {
    return <Droplets className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('press') || key.includes('altimeter')) {
    return <Gauge className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('rad') || key.includes('sun') || key.includes('uv')) {
    return <Sun className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('cloud') || key.includes('ceiling') || key.includes('weather') || key.includes('metar')) {
    return <Cloud className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('water') || key.includes('wave') || key.includes('tide') || key.includes('stream') || key.includes('gage')) {
    return <Waves className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('volt') || key.includes('electric') || key.includes('lightning')) {
    return <Zap className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('visib')) {
    return <Eye className='size-4 shrink-0 text-current' />;
  }
  if (key.includes('fire') || key.includes('fuel')) {
    return <Flame className='size-4 shrink-0 text-current' />;
  }

  return <Activity className='size-4 shrink-0 text-current' />;
}
