import { SUMMARY } from "./common";

export interface LatestStationResponse {
  STATION: Station[];
  SUMMARY: SUMMARY;
  QC_SUMMARY: QcSummmary;
  UNITS: Record<string, string>;
}

// Base Types
type PeriodOfRecord = {
  start?: string;
  end?: string;
};

type Provider = {
  name: string;
  url?: string;
};

type VariableMetaBase = {
  position?: string;
  PERIOD_OF_RECORD: PeriodOfRecord;
};

// Simplified DateTime type
type ObservationValues = {
  value: number;
  date_time: string;
};

// Units type
type Units = {
  [key: string]: string;
};

// Base type for sensor measurements
type SensorMeasurement = {
  [key: `${string}_${number}`]: VariableMetaBase;
};

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
  MINMAX: Record<string, SensorMeasurement>;
};

// Optimized SensorVariables type
export type SensorVariables =
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
    }
  | Record<string, SensorMeasurement>;

interface QcSummmary {
  QC_CHECKS_APPLIED: string[];
  TOTAL_OBSERVATIONS_FLAGGED: number;
  PERCENT_OF_TOTAL_OBSERVATIONS_FLAGGED: number;
  QC_NAMES: Record<string, string>;
  QC_SHORTNAMES: Record<string, string>;
  QC_SOURCENAMES: Record<string, string>;
}
