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
    icon: <AirTemperature width={32} height={32} />,
  },
  {
    label: "Dew point temp.",
    value: "dew_point_temperature",
    apiLookup: ["dew_point_temperature"],
    icon: <DewPointTemperature width={28} height={28} />,
  },
  {
    label: "Relative humidity",
    value: "relative_humidity",
    apiLookup: ["relative_humidity"],
    icon: <RelativeHumidity width={32} height={32} />,
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
    icon: <Wind width={32} height={32} className=" text-neutral-400" />,
  },
  {
    label: "Station pressure",
    value: "pressure",
    apiLookup: ["pressure"],
    icon: <Pressure width={32} height={32} />,
  },
  {
    label: "PM2.5",
    value: "PM_25_concentration",
    apiLookup: ["PM_25_concentration"],
    icon: <ParticulateMatter25 width={32} height={32} />,
  },
  {
    label: "Voltage",
    value: "volt",
    apiLookup: ["volt"],
    icon: <Voltage width={32} height={32} />,
  },
  {
    label: "Solar radiation",
    value: "solar_radiation",
    apiLookup: ["solar_radiation"],
    icon: <SolarRadiation width={16} height={16} />,
  },
];
