import {
  AirTemperature,
  DewPointTemperature,
  ParticulateMatter25,
  Pressure,
  RelativeHumidity,
  SolarRadiation,
  Voltage,
  Wind,
} from "@/assets/icons/variable-icons";

export const variables = [
  {
    label: "Air temperature",
    value: "air_temp",
    apiLookup: ["air_temp"],
    icon: (
      <AirTemperature className="size-9 text-neutral-800 dark:text-neutral-200" />
    ),
  },
  {
    label: "Dew point temp.",
    value: "dew_point_temperature",
    apiLookup: ["dew_point_temperature"],
    icon: (
      <DewPointTemperature className="size-7 text-neutral-800 dark:text-neutral-200" />
    ),
  },
  {
    label: "Relative humidity",
    value: "relative_humidity",
    apiLookup: ["relative_humidity"],
    icon: (
      <RelativeHumidity className="size-9 text-neutral-800 dark:text-neutral-200" />
    ),
  },
  {
    label: "Surface winds",
    value: "wind_speed",
    apiLookup: [
      "wind_speed",
      "wind_gust",
      "wind_direction",
      "wind_cardinal_direction",
    ],
    icon: <Wind className="size-8 text-neutral-800 dark:text-neutral-200" />,
  },
  {
    label: "Station pressure",
    value: "pressure",
    apiLookup: ["pressure"],
    icon: (
      <Pressure className="size-9 text-neutral-800 dark:text-neutral-200" />
    ),
  },
  {
    label: "PM2.5",
    value: "PM_25_concentration",
    apiLookup: ["PM_25_concentration"],
    icon: (
      <ParticulateMatter25 className="size-10 text-neutral-800 dark:text-neutral-200" />
    ),
  },
  {
    label: "Voltage",
    value: "volt",
    apiLookup: ["volt"],
    icon: <Voltage className="size-8 text-neutral-800 dark:text-neutral-200" />,
  },
  {
    label: "Solar radiation",
    value: "solar_radiation",
    apiLookup: ["solar_radiation"],
    icon: (
      <SolarRadiation className="size-4 text-neutral-800 dark:text-neutral-200" />
    ),
  },
];
