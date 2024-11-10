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
      <AirTemperature
        width={40}
        height={40}
        className="text-neutral-800 dark:text-neutral-200"
      />
    ),
  },
  {
    label: "Dew point temp.",
    value: "dew_point_temperature",
    apiLookup: ["dew_point_temperature"],
    icon: (
      <DewPointTemperature
        width={40}
        height={40}
        className="text-neutral-800 dark:text-neutral-200"
      />
    ),
  },
  {
    label: "Relative humidity",
    value: "relative_humidity",
    apiLookup: ["relative_humidity"],
    icon: (
      <RelativeHumidity
        width={40}
        height={40}
        className="text-neutral-800 dark:text-neutral-200"
      />
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
    icon: (
      <Wind
        width={40}
        height={40}
        className="text-neutral-800 dark:text-neutral-200"
      />
    ),
  },
  {
    label: "Station pressure",
    value: "pressure",
    apiLookup: ["pressure"],
    icon: (
      <Pressure
        width={40}
        height={40}
        className="text-neutral-800 dark:text-neutral-200"
      />
    ),
  },
  {
    label: "PM2.5",
    value: "PM_25_concentration",
    apiLookup: ["PM_25_concentration"],
    icon: (
      <ParticulateMatter25
        width={40}
        height={40}
        className="text-neutral-800 dark:text-neutral-200"
      />
    ),
  },
  {
    label: "Voltage",
    value: "volt",
    apiLookup: ["volt"],
    icon: (
      <Voltage
        width={40}
        height={40}
        className="text-neutral-800 dark:text-neutral-200"
      />
    ),
  },
  {
    label: "Solar radiation",
    value: "solar_radiation",
    apiLookup: ["solar_radiation"],
    icon: (
      <SolarRadiation
        width={24}
        height={24}
        className="text-neutral-800 dark:text-neutral-200"
      />
    ),
  },
];
