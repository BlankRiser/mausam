import { z } from "zod";
import { SUMMARY, summarySchema } from "./common";

// Base Types

const periodOfRecordSchema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
});

type PeriodOfRecord = {
  start?: string;
  end?: string;
};

const providerSchema = z.object({
  name: z.string(),
  url: z.string().optional(),
});
type Provider = {
  name: string;
  url?: string;
};

const variableMetaBaseSchema = z.object({
  position: z.string().optional(),
  PERIOD_OF_RECORD: periodOfRecordSchema,
});

type VariableMetaBase = {
  position?: string;
  PERIOD_OF_RECORD: PeriodOfRecord;
};

const observationValuesSchema = z.object({
  value: z.number(),
  date_time: z.string(),
});

// Simplified DateTime type
type ObservationValues = {
  value: number;
  date_time: string;
};

const unitsSchema = z.record(z.string());
// Units type
type Units = {
  [key: string]: string;
};

const sensorMeasurementSchema = z.record(variableMetaBaseSchema);

// Base type for sensor measurements
type SensorMeasurement = {
  [key: `${string}_${number}`]: VariableMetaBase;
};

export const minMaxSchema = z.object({
  dates: z.array(z.string()),
  datetime_timezone: z.string(),
  value_min_local: z.array(z.number()).optional(),
  value_min_utc: z.array(z.number()).optional(),
  value_max_local: z.array(z.number()).optional(),
  value_max_utc: z.array(z.number()).optional(),
  datetime_min_local: z.array(z.string()).optional(),
  datetime_min_utc: z.array(z.string()).optional(),
  datetime_max_local: z.array(z.string()).optional(),
  datetime_max_utc: z.array(z.string()).optional(),
});

export type MinMax = {
  dates: Array<string>;
  datetime_timezone: string;

  value_min_local?: Array<number>;
  value_min_utc?: Array<number>;

  value_max_local?: Array<number>;
  value_max_utc?: Array<number>;

  datetime_min_local?: Array<string>;
  datetime_min_utc?: Array<string>;

  datetime_max_local?: Array<string>;
  datetime_max_utc?: Array<string>;
};

export const sensorVariablesSchema = z.union([
  z.record(sensorMeasurementSchema),
  z.object({
    air_temp: sensorMeasurementSchema.optional(),
    dew_point_temperature: sensorMeasurementSchema.optional(),
    air_temp_high_6_hour: sensorMeasurementSchema.optional(),
    air_temp_low_6_hour: sensorMeasurementSchema.optional(),
    air_temp_high_24_hour: sensorMeasurementSchema.optional(),
    air_temp_low_24_hour: sensorMeasurementSchema.optional(),
    sonic_air_temp: sensorMeasurementSchema.optional(),
    sonic_air_temp_stdev: sensorMeasurementSchema.optional(),
    surface_temp: sensorMeasurementSchema.optional(),
    water_temp: sensorMeasurementSchema.optional(),
    T_water_temp: sensorMeasurementSchema.optional(),
    relative_humidity: sensorMeasurementSchema.optional(),
    precip_accum: sensorMeasurementSchema.optional(),
    precip_accum_five_minute: sensorMeasurementSchema.optional(),
    precip_accum_ten_minute: sensorMeasurementSchema.optional(),
    precip_accum_fifteen_minute: sensorMeasurementSchema.optional(),
    precip_accum_30_minute: sensorMeasurementSchema.optional(),
    precip_accum_one_hour: sensorMeasurementSchema.optional(),
    precip_accum_three_hour: sensorMeasurementSchema.optional(),
    precip_accum_six_hour: sensorMeasurementSchema.optional(),
    precip_accum_24_hour: sensorMeasurementSchema.optional(),
    precip_accum_raingauge: sensorMeasurementSchema.optional(),
    precip_accum_since_local_midnight: sensorMeasurementSchema.optional(),
    precip_smoothed: sensorMeasurementSchema.optional(),
    wind_speed: sensorMeasurementSchema.optional(),
    wind_direction: sensorMeasurementSchema.optional(),
    wind_gust: sensorMeasurementSchema.optional(),
    peak_wind_speed: sensorMeasurementSchema.optional(),
    peak_wind_direction: sensorMeasurementSchema.optional(),
    sonic_wind_speed: sensorMeasurementSchema.optional(),
    sonic_wind_direction: sensorMeasurementSchema.optional(),
    sonic_vertical_vel: sensorMeasurementSchema.optional(),
    sonic_zonal_wind_stdev: sensorMeasurementSchema.optional(),
    sonic_meridional_wind_stdev: sensorMeasurementSchema.optional(),
    sonic_vertical_wind_stdev: sensorMeasurementSchema.optional(),
    altimeter: sensorMeasurementSchema.optional(),
    sea_level_pressure: sensorMeasurementSchema.optional(),
    pressure: sensorMeasurementSchema.optional(),
    pressure_tendency: sensorMeasurementSchema.optional(),
    pressure_change_code: sensorMeasurementSchema.optional(),
    snow_depth: sensorMeasurementSchema.optional(),
    snow_smoothed: sensorMeasurementSchema.optional(),
    snow_water_equiv: sensorMeasurementSchema.optional(),
    snow_interval: sensorMeasurementSchema.optional(),
    snow_accum_24_hour: sensorMeasurementSchema.optional(),
    estimated_snowfall_rate: sensorMeasurementSchema.optional(),
    road_temp: sensorMeasurementSchema.optional(),
    road_freezing_temp: sensorMeasurementSchema.optional(),
    road_surface_condition: sensorMeasurementSchema.optional(),
    road_subsurface_tmp: sensorMeasurementSchema.optional(),
    grip_1_ice_friction_code: sensorMeasurementSchema.optional(),
    grip_2_level_of_grip: sensorMeasurementSchema.optional(),
    solar_radiation: sensorMeasurementSchema.optional(),
    net_radiation: sensorMeasurementSchema.optional(),
    net_radiation_sw: sensorMeasurementSchema.optional(),
    net_radiation_lw: sensorMeasurementSchema.optional(),
    outgoing_radiation_sw: sensorMeasurementSchema.optional(),
    incoming_radiation_lw: sensorMeasurementSchema.optional(),
    outgoing_radiation_lw: sensorMeasurementSchema.optional(),
    photosynthetically_active_radiation: sensorMeasurementSchema.optional(),
    soil_temp: sensorMeasurementSchema.optional(),
    soil_moisture: sensorMeasurementSchema.optional(),
    soil_moisture_tension: sensorMeasurementSchema.optional(),
    fuel_temp: sensorMeasurementSchema.optional(),
    fuel_moisture: sensorMeasurementSchema.optional(),
    fosberg_fire_weather_index: sensorMeasurementSchema.optional(),
    volt: sensorMeasurementSchema.optional(),
    electric_conductivity: sensorMeasurementSchema.optional(),
    ozone_concentration: sensorMeasurementSchema.optional(),
    NO2_concentration: sensorMeasurementSchema.optional(),
    NO_concentration: sensorMeasurementSchema.optional(),
    NOx_concentration: sensorMeasurementSchema.optional(),
    ceiling: sensorMeasurementSchema.optional(),
    visibility: sensorMeasurementSchema.optional(),
    cloud_layer_1_code: sensorMeasurementSchema.optional(),
    cloud_layer_2_code: sensorMeasurementSchema.optional(),
    cloud_layer_3_code: sensorMeasurementSchema.optional(),
    weather_cond_code: sensorMeasurementSchema.optional(),
    vertical_heat_flux: sensorMeasurementSchema.optional(),
    friction_velocity: sensorMeasurementSchema.optional(),
    w_ratio: sensorMeasurementSchema.optional(),
    sonic_ob_count: sensorMeasurementSchema.optional(),
    sonic_warn_count: sensorMeasurementSchema.optional(),
    metar: sensorMeasurementSchema.optional(),
    metar_remark: sensorMeasurementSchema.optional(),
    a: sensorMeasurementSchema.optional(),
    c: sensorMeasurementSchema.optional(),
    d: sensorMeasurementSchema.optional(),
    e: sensorMeasurementSchema.optional(),
    qc: sensorMeasurementSchema.optional(),
    created_time_stamp: sensorMeasurementSchema.optional(),
    last_modified: sensorMeasurementSchema.optional(),
  }),
]);

// Optimized SensorVariables type
export type SensorVariables =
  | Record<string, SensorMeasurement>
  | {
      // Temperature related
      air_temp?: SensorMeasurement;
      dew_point_temperature?: SensorMeasurement;
      air_temp_high_6_hour?: SensorMeasurement;
      air_temp_low_6_hour?: SensorMeasurement;
      air_temp_high_24_hour?: SensorMeasurement;
      air_temp_low_24_hour?: SensorMeasurement;
      sonic_air_temp?: SensorMeasurement;
      sonic_air_temp_stdev?: SensorMeasurement;
      surface_temp?: SensorMeasurement;
      water_temp?: SensorMeasurement;
      T_water_temp?: SensorMeasurement;

      // Moisture and Precipitation
      relative_humidity?: SensorMeasurement;
      precip_accum?: SensorMeasurement;
      precip_accum_five_minute?: SensorMeasurement;
      precip_accum_ten_minute?: SensorMeasurement;
      precip_accum_fifteen_minute?: SensorMeasurement;
      precip_accum_30_minute?: SensorMeasurement;
      precip_accum_one_hour?: SensorMeasurement;
      precip_accum_three_hour?: SensorMeasurement;
      precip_accum_six_hour?: SensorMeasurement;
      precip_accum_24_hour?: SensorMeasurement;
      precip_accum_raingauge?: SensorMeasurement;
      precip_accum_since_local_midnight?: SensorMeasurement;
      precip_smoothed?: SensorMeasurement;

      // Wind related
      wind_speed?: SensorMeasurement;
      wind_direction?: SensorMeasurement;
      wind_gust?: SensorMeasurement;
      peak_wind_speed?: SensorMeasurement;
      peak_wind_direction?: SensorMeasurement;
      sonic_wind_speed?: SensorMeasurement;
      sonic_wind_direction?: SensorMeasurement;
      sonic_vertical_vel?: SensorMeasurement;
      sonic_zonal_wind_stdev?: SensorMeasurement;
      sonic_meridional_wind_stdev?: SensorMeasurement;
      sonic_vertical_wind_stdev?: SensorMeasurement;

      // Pressure related
      altimeter?: SensorMeasurement;
      sea_level_pressure?: SensorMeasurement;
      pressure?: SensorMeasurement;
      pressure_tendency?: SensorMeasurement;
      pressure_change_code?: SensorMeasurement;

      // Snow related
      snow_depth?: SensorMeasurement;
      snow_smoothed?: SensorMeasurement;
      snow_water_equiv?: SensorMeasurement;
      snow_interval?: SensorMeasurement;
      snow_accum_24_hour?: SensorMeasurement;
      estimated_snowfall_rate?: SensorMeasurement;

      // Road conditions
      road_temp?: SensorMeasurement;
      road_freezing_temp?: SensorMeasurement;
      road_surface_condition?: SensorMeasurement;
      road_subsurface_tmp?: SensorMeasurement;
      grip_1_ice_friction_code?: SensorMeasurement;
      grip_2_level_of_grip?: SensorMeasurement;

      // Radiation and solar
      solar_radiation?: SensorMeasurement;
      net_radiation?: SensorMeasurement;
      net_radiation_sw?: SensorMeasurement;
      net_radiation_lw?: SensorMeasurement;
      outgoing_radiation_sw?: SensorMeasurement;
      incoming_radiation_lw?: SensorMeasurement;
      outgoing_radiation_lw?: SensorMeasurement;
      photosynthetically_active_radiation?: SensorMeasurement;

      // Soil measurements
      soil_temp?: SensorMeasurement;
      soil_moisture?: SensorMeasurement;
      soil_moisture_tension?: SensorMeasurement;

      // Fuel related
      fuel_temp?: SensorMeasurement;
      fuel_moisture?: SensorMeasurement;
      fosberg_fire_weather_index?: SensorMeasurement;

      // Electrical
      volt?: SensorMeasurement;
      electric_conductivity?: SensorMeasurement;

      // Atmospheric composition
      ozone_concentration?: SensorMeasurement;
      NO2_concentration?: SensorMeasurement;
      NO_concentration?: SensorMeasurement;
      NOx_concentration?: SensorMeasurement;

      // Cloud and visibility
      ceiling?: SensorMeasurement;
      visibility?: SensorMeasurement;
      cloud_layer_1_code?: SensorMeasurement;
      cloud_layer_2_code?: SensorMeasurement;
      cloud_layer_3_code?: SensorMeasurement;
      weather_cond_code?: SensorMeasurement;

      // Misc measurements
      vertical_heat_flux?: SensorMeasurement;
      friction_velocity?: SensorMeasurement;
      w_ratio?: SensorMeasurement;
      sonic_ob_count?: SensorMeasurement;
      sonic_warn_count?: SensorMeasurement;

      // METAR related
      metar?: SensorMeasurement;
      metar_remark?: SensorMeasurement;

      // Generic/other
      a?: SensorMeasurement;
      c?: SensorMeasurement;
      d?: SensorMeasurement;
      e?: SensorMeasurement;
      qc?: SensorMeasurement;
      created_time_stamp?: SensorMeasurement;
      last_modified?: SensorMeasurement;
    };

const qcSummmarySchema = z.object({
  QC_CHECKS_APPLIED: z.array(z.string()),
  TOTAL_OBSERVATIONS_FLAGGED: z.number(),
  PERCENT_OF_TOTAL_OBSERVATIONS_FLAGGED: z.number(),
  QC_NAMES: z.record(z.string()),
  QC_SHORTNAMES: z.record(z.string()),
  QC_SOURCENAMES: z.record(z.string()),
});
interface QcSummmary {
  QC_CHECKS_APPLIED: string[];
  TOTAL_OBSERVATIONS_FLAGGED: number;
  PERCENT_OF_TOTAL_OBSERVATIONS_FLAGGED: number;
  QC_NAMES: Record<string, string>;
  QC_SHORTNAMES: Record<string, string>;
  QC_SOURCENAMES: Record<string, string>;
}

export const stationSchema = z.object({
  ID: z.string(),
  STID: z.string(),
  NAME: z.string(),
  ELEVATION: z.string(),
  LATITUDE: z.string(),
  LONGITUDE: z.string(),
  STATUS: z.string(),
  MNET_ID: z.string(),
  STATE: z.string(),
  TIMEZONE: z.string(),
  ELEV_DEM: z.string().optional(),
  NWSZONE: z.string(),
  NWSFIREZONE: z.string(),
  GACC: z.string(),
  SHORTNAME: z.string(),
  SGID: z.string(),
  COUNTY: z.string(),
  COUNTRY: z.string(),
  WIMS_ID: z.string().optional(),
  CWA: z.string(),
  PERIOD_OF_RECORD: periodOfRecordSchema,
  PROVIDERS: z.array(providerSchema),
  SENSOR_VARIABLES: sensorVariablesSchema,
  OBSERVATIONS: z.record(observationValuesSchema).optional(),
  MNET_SHORTNAME: z.string().optional(),
  MNET_LONGNAME: z.string().optional(),
  UNITS: unitsSchema,
  RESTRICTED: z.boolean(),
  QC_FLAGGED: z.boolean(),
  MINMAX: z.record(minMaxSchema),
});
// Main Station Type
export type Station = {
  ID: string;
  STID: string;
  NAME: string;
  ELEVATION: string;
  LATITUDE: string;
  LONGITUDE: string;
  STATUS: string;
  MNET_ID: string;
  STATE: string;
  TIMEZONE: string;
  ELEV_DEM?: string;
  NWSZONE: string;
  NWSFIREZONE: string;
  GACC: string;
  SHORTNAME: string;
  SGID: string;
  COUNTY: string;
  COUNTRY: string;
  WIMS_ID?: string;
  CWA: string;
  PERIOD_OF_RECORD: PeriodOfRecord;
  PROVIDERS: Provider[];
  SENSOR_VARIABLES: SensorVariables;
  OBSERVATIONS?: Record<string, ObservationValues>;
  MNET_SHORTNAME?: string;
  MNET_LONGNAME?: string;
  UNITS: Units;
  RESTRICTED: boolean;

  QC_FLAGGED: boolean;
  MINMAX: Record<string, MinMax>;
};

export const latestStationResponseSchema = z.object({
  STATION: z.array(stationSchema),
  SUMMARY: summarySchema,
  QC_SUMMARY: qcSummmarySchema,
  UNITS: z.record(z.string()),
});

export interface LatestStationResponse {
  STATION: Station[];
  SUMMARY: SUMMARY;
  QC_SUMMARY: QcSummmary;
  UNITS: Record<string, string>;
}
