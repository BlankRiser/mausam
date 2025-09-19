import { SUMMARY } from "./common";

export interface StationMetadata {
  STATION: MetadataStation[];
  SUMMARY: SUMMARY;
}

export interface MetadataStation {
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
  ELEV_DEM: string;
  NWSZONE: string;
  NWSFIREZONE: string;
  GACC: string;
  SHORTNAME: string;
  SGID: string;
  COUNTY: string;
  COUNTRY: string;
  WIMS_ID: string;
  CWA: string;
  PERIOD_OF_RECORD: PERIODOFRECORD;
  PROVIDERS: PROVIDER[];
  SENSOR_VARIABLES: SENSORVARIABLES;
  STATION_HISTORY: STATIONHISTORY[];
  UNITS: UNITS;
  RESTRICTED: boolean;
}

interface UNITS {
  position: string;
  elevation: string;
}

interface STATIONHISTORY {
  API_TIME: number;
  DATE_TIME: string;
  DATA_AFFECTED: boolean;
  CHANGES: CHANGES;
}

interface CHANGES {
  OTHER_ID?: OTHERID;
  STATUS?: OTHERID;
  ELEVATION?: ELEVATION;
  CALIB?: OTHERID;
  NWSFIREZONE?: OTHERID;
  SUBGACC_ID?: ELEVATION;
  LATITUDE?: OTHERID;
  LONGITUDE?: OTHERID;
  TIMEZONE?: OTHERID;
  GACC_ID?: ELEVATION;
}

interface ELEVATION {
  from: number;
  to: number;
}

interface OTHERID {
  from: string;
  to: string;
}

interface SENSORVARIABLES {
  air_temp: Airtemp;
  relative_humidity: Relativehumidity;
  wind_speed: Windspeed;
  wind_direction: Winddirection;
  wind_gust: Windgust;
  solar_radiation: Solarradiation;
  precip_accum: Precipaccum;
  water_temp: Watertemp;
  qc: Qc;
  peak_wind_speed: Peakwindspeed;
  fuel_temp: Fueltemp;
  volt: Volt;
  snow_interval: Snowinterval;
  peak_wind_direction: Peakwinddirection;
}

interface Peakwinddirection {
  peak_wind_direction_1: Watertemp1;
}

interface Snowinterval {
  snow_interval_1: Watertemp1;
}

interface Volt {
  volt_1: Watertemp1;
}

interface Fueltemp {
  fuel_temp_1: Airtemp1;
}

interface Peakwindspeed {
  peak_wind_speed_1: Watertemp1;
}

interface Qc {
  qc_1: Watertemp1;
}

interface Watertemp {
  water_temp_1: Watertemp1;
}

interface Watertemp1 {
  position: null;
  PERIOD_OF_RECORD: PERIODOFRECORD;
}

interface Precipaccum {
  precip_accum_1: Airtemp1;
}

interface Solarradiation {
  solar_radiation_1: Airtemp1;
}

interface Windgust {
  wind_gust_1: Airtemp1;
}

interface Winddirection {
  wind_direction_1: Airtemp1;
}

interface Windspeed {
  wind_speed_1: Airtemp1;
}

interface Relativehumidity {
  relative_humidity_1: Airtemp1;
}

interface Airtemp {
  air_temp_1: Airtemp1;
}

interface Airtemp1 {
  position: string;
  PERIOD_OF_RECORD: PERIODOFRECORD;
}

interface PROVIDER {
  name: string;
  url: string;
}

interface PERIODOFRECORD {
  start: string;
  end: string;
}
