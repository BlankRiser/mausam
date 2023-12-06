export type SUMMARY = {
  NUMBER_OF_OBJECTS: number;
  RESPONSE_CODE: number;
  RESPONSE_MESSAGE: string;
  METADATA_RESPONSE_TIME: string;
  VERSION: string;
};

export type STATION = {
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
  PERIOD_OF_RECORD: PERIODOFRECORD;
  PROVIDERS: (PROVIDER | PROVIDERS2 | PROVIDERS3)[];
  SENSOR_VARIABLES: SENSORVARIABLES;
  OBSERVATIONS?: OBSERVATIONS;
  MNET_SHORTNAME?: string;
  MNET_LONGNAME?: string;
  UNITS: UNITS;
  RESTRICTED: boolean;
};

type UNITS = {
  position: string;
  elevation: string;
};

type OBSERVATIONS = Record<string, DatetIME>;

type DatetIME = {
  value: number;
  date_time: string;
};

export type SENSORVARIABLES = {
  air_temp?: Airtemp;
  relative_humidity?: Relativehumidity;
  wind_speed?: Windspeed;
  wind_direction?: Winddirection;
  wind_gust?: Windgust;
  precip_accum_fifteen_minute?: Precipaccumfifteenminute;
  volt?: Volt;
  altimeter?: Altimeter;
  dew_point_temperature?: Dewpointtemperature;
  snow_depth?: Snowdepth;
  sea_level_pressure?: Sealevelpressure;
  weather_cond_code?: Weathercondcode;
  cloud_layer_3_code?: Cloudlayer3code;
  pressure_tendency?: Pressuretendency;
  precip_accum_one_hour?: Precipaccumonehour;
  precip_accum_three_hour?: Precipaccumthreehour;
  cloud_layer_1_code?: Cloudlayer1code;
  cloud_layer_2_code?: Cloudlayer2code;
  precip_accum_six_hour?: Precipaccumsixhour;
  precip_accum_24_hour?: Precipaccum24hour;
  visibility?: Visibility;
  metar_remark?: Metarremark;
  metar?: Metar;
  air_temp_high_6_hour?: Airtemphigh6hour;
  air_temp_low_6_hour?: Airtemplow6hour;
  peak_wind_speed?: Peakwindspeed;
  ceiling?: Ceiling;
  pressure_change_code?: Pressurechangecode;
  air_temp_high_24_hour?: Airtemphigh24hour;
  air_temp_low_24_hour?: Airtemplow24hour;
  peak_wind_direction?: Peakwinddirection;
  solar_radiation?: Solarradiation;
  soil_temp?: Soiltemp;
  precip_accum_ten_minute?: Precipaccumtenminute;
  road_temp?: Roadtemp;
  road_freezing_temp?: Roadfreezingtemp;
  road_surface_condition?: Roadsurfacecondition;
  road_subsurface_tmp?: Roadsubsurfacetmp;
  a?: A;
  c?: C;
  estimated_snowfall_rate?: Estimatedsnowfallrate;
  grip_1_ice_friction_code?: Grip1icefrictioncode;
  grip_2_level_of_grip?: Grip2levelofgrip;
  precip_accum?: Precipaccum;
  precip_accum_five_minute?: Precipaccumfiveminute;
  fuel_temp?: Fueltemp;
  T_water_temp?: Twatertemp;
  precip_smoothed?: Precipsmoothed;
  snow_smoothed?: Snowsmoothed;
  snow_water_equiv?: Snowwaterequiv;
  water_temp?: Watertemp;
  qc?: Qc;
  fuel_moisture?: Fuelmoisture;
  snow_interval?: Snowinterval;
  precip_accum_raingauge?: Precipaccumraingauge;
  soil_moisture_tension?: Soilmoisturetension;
  pressure?: Pressure;
  net_radiation?: Netradiation;
  surface_temp?: Surfacetemp;
  net_radiation_sw?: Netradiationsw;
  net_radiation_lw?: Netradiationlw;
  sonic_air_temp?: Sonicairtemp;
  sonic_vertical_vel?: Sonicverticalvel;
  sonic_zonal_wind_stdev?: Soniczonalwindstdev;
  sonic_meridional_wind_stdev?: Sonicmeridionalwindstdev;
  sonic_vertical_wind_stdev?: Sonicverticalwindstdev;
  sonic_air_temp_stdev?: Sonicairtempstdev;
  vertical_heat_flux?: Verticalheatflux;
  friction_velocity?: Frictionvelocity;
  w_ratio?: Wratio;
  sonic_ob_count?: Sonicobcount;
  sonic_warn_count?: Sonicwarncount;
  sonic_wind_speed?: Sonicwindspeed;
  sonic_wind_direction?: Sonicwinddirection;
  soil_moisture?: Soilmoisture;
  ozone_concentration?: Ozoneconcentration;
  NO2_concentration?: NO2concentration;
  NO_concentration?: NOconcentration;
  NOx_concentration?: NOxconcentration;
  precip_accum_since_local_midnight?: Precipaccumsincelocalmidnight;
  d?: D;
  e?: E;
  photosynthetically_active_radiation?: Photosyntheticallyactiveradiation;
  created_time_stamp?: Createdtimestamp;
  last_modified?: Lastmodified;
  snow_accum_24_hour?: Snowaccum24hour;
  electric_conductivity?: Electricconductivity;
  precip_accum_30_minute?: Precipaccum30minute;
  outgoing_radiation_sw?: Outgoingradiationsw;
  incoming_radiation_lw?: Incomingradiationlw;
  outgoing_radiation_lw?: Outgoingradiationlw;
  fosberg_fire_weather_index?: Fosbergfireweatherindex;
};

type Fosbergfireweatherindex = {
  fosberg_fire_weather_index_1: Dewpointtemperature1;
};

type Outgoingradiationlw = {
  outgoing_radiation_lw_1: Dewpointtemperature1;
};

type Incomingradiationlw = {
  incoming_radiation_lw_1: Dewpointtemperature1;
};

type Outgoingradiationsw = {
  outgoing_radiation_sw_1: Dewpointtemperature1;
};

type Precipaccum30minute = {
  precip_accum_30_minute_1: Windspeed2;
};

type Electricconductivity = {
  electric_conductivity_1: Windspeed2;
  electric_conductivity_2: Windspeed2;
  electric_conductivity_3: Windspeed2;
  electric_conductivity_4: Windspeed2;
  electric_conductivity_5: Windspeed2;
  electric_conductivity_6: Windspeed2;
  electric_conductivity_7: Windspeed2;
  electric_conductivity_8: Windspeed2;
  electric_conductivity_9: Electricconductivity9;
};

type Electricconductivity9 = {
  position: string;
  PERIOD_OF_RECORD: PERIODOFRECORD3;
};

type Snowaccum24hour = {
  snow_accum_24_hour_1: Dewpointtemperature1;
};

type Lastmodified = {
  last_modified_1: Metarremark1;
};

type Createdtimestamp = {
  created_time_stamp_1: Metarremark1;
};

type Photosyntheticallyactiveradiation = {
  photosynthetically_active_radiation_1: Dewpointtemperature1;
};

type E = {
  e_1: Dewpointtemperature1;
};

type D = {
  d_1: Dewpointtemperature1;
};

type Precipaccumsincelocalmidnight = {
  precip_accum_since_local_midnight_1: Dewpointtemperature1;
};

type NOxconcentration = {
  NOx_concentration_1: Dewpointtemperature1;
};

type NOconcentration = {
  NO_concentration_1: Dewpointtemperature1;
};

type NO2concentration = {
  NO2_concentration_1: Dewpointtemperature1;
};

type Ozoneconcentration = {
  ozone_concentration_1: Dewpointtemperature1;
};

type Soilmoisture = {
  soil_moisture_1: VariableMeta;
  soil_moisture_2?: VariableMeta;
  soil_moisture_3?: Windspeed2;
  soil_moisture_4?: Windspeed2;
  soil_moisture_5?: Windspeed2;
  soil_moisture_6?: Altimeter1;
  soil_moisture_7?: Windspeed2;
  soil_moisture_8?: Windspeed2;
  soil_moisture_9?: Windspeed2;
};

type Sonicwinddirection = {
  sonic_wind_direction_1: Windspeed2;
};

type Sonicwindspeed = {
  sonic_wind_speed_1: Windspeed2;
};

type Sonicwarncount = {
  sonic_warn_count_1: Windspeed2;
};

type Sonicobcount = {
  sonic_ob_count_1: Windspeed2;
};

type Wratio = {
  w_ratio_1: Windspeed2;
};

type Frictionvelocity = {
  friction_velocity_1: VariableMeta;
};

type Verticalheatflux = {
  vertical_heat_flux_1: Windspeed2;
};

type Sonicairtempstdev = {
  sonic_air_temp_stdev_1: VariableMeta;
};

type Sonicverticalwindstdev = {
  sonic_vertical_wind_stdev_1: VariableMeta;
};

type Sonicmeridionalwindstdev = {
  sonic_meridional_wind_stdev_1: VariableMeta;
};

type Soniczonalwindstdev = {
  sonic_zonal_wind_stdev_1: VariableMeta;
};

type Sonicverticalvel = {
  sonic_vertical_vel_1: VariableMeta;
};

type Sonicairtemp = {
  sonic_air_temp_1: VariableMeta;
};

type Netradiationlw = {
  net_radiation_lw_1: Windspeed2;
};

type Netradiationsw = {
  net_radiation_sw_1: Windspeed2;
};

type Surfacetemp = {
  surface_temp_1: Windspeed2;
};

type Netradiation = {
  net_radiation_1: VariableMeta;
};

type Pressure = {
  pressure_1: VariableMeta;
};

type Soilmoisturetension = {
  soil_moisture_tension_1: Dewpointtemperature1;
};

type Precipaccumraingauge = {
  precip_accum_raingauge_1: Dewpointtemperature1;
};

type Snowinterval = {
  snow_interval_1: Dewpointtemperature1;
};

type Fuelmoisture = {
  fuel_moisture_1: VariableMeta;
};

type Qc = {
  qc_1: Metar1;
};

type Watertemp = {
  water_temp_1: Dewpointtemperature1;
};

type Snowwaterequiv = {
  snow_water_equiv_1: Dewpointtemperature1;
};

type Snowsmoothed = {
  snow_smoothed_1: Metar1;
};

type Precipsmoothed = {
  precip_smoothed_1: Metar1;
};

type Twatertemp = {
  T_water_temp_1: Dewpointtemperature1;
};

type Fueltemp = {
  fuel_temp_1: VariableMeta;
};

type Precipaccumfiveminute = {
  precip_accum_five_minute_1: VariableMeta;
};

type Precipaccum = {
  precip_accum_1: VariableMeta;
};

type Grip2levelofgrip = {
  grip_2_level_of_grip_1: Altimeter1;
};

type Grip1icefrictioncode = {
  grip_1_ice_friction_code_1: VariableMeta;
};

type Estimatedsnowfallrate = {
  estimated_snowfall_rate_1: VariableMeta;
};

type C = {
  c_1: Dewpointtemperature1;
};

type A = {
  a_1: Dewpointtemperature1;
};

type Roadsubsurfacetmp = {
  road_subsurface_tmp_1: Dewpointtemperature1;
};

type Roadsurfacecondition = {
  road_surface_condition_1?: VariableMeta;
  road_surface_condition_2?: VariableMeta;
  road_surface_condition_3?: VariableMeta;
};

type Roadfreezingtemp = {
  road_freezing_temp_1: VariableMeta;
  road_freezing_temp_2?: Dewpointtemperature1;
};

type Roadtemp = {
  road_temp_1?: VariableMeta;
  road_temp_2?: VariableMeta;
  road_temp_3?: Altimeter1;
};

type Precipaccumtenminute = {
  precip_accum_ten_minute_1: Precipaccumtenminute1;
};

type Precipaccumtenminute1 = {
  position?: any;
  PERIOD_OF_RECORD: PERIODOFRECORD4;
};

type Soiltemp = {
  soil_temp_1: Solarradiation1;
  soil_temp_2?: Altimeter1;
  soil_temp_3?: Windspeed2;
  soil_temp_4?: Windspeed2;
  soil_temp_5?: Windspeed2;
  soil_temp_6?: Altimeter1;
  soil_temp_7?: Windspeed2;
  soil_temp_8?: Windspeed2;
  soil_temp_9?: Windspeed2;
};

type Solarradiation = {
  solar_radiation_1: Solarradiation1;
};

type Solarradiation1 = {
  position?: string;
  PERIOD_OF_RECORD: PERIODOFRECORD4;
};

type PERIODOFRECORD4 = {
  start?: string;
  end: string;
};

type Peakwinddirection = {
  peak_wind_direction_1: Dewpointtemperature1;
};

type Airtemplow24hour = {
  air_temp_low_24_hour_1: Dewpointtemperature1;
};

type Airtemphigh24hour = {
  air_temp_high_24_hour_1: Dewpointtemperature1;
};

type Pressurechangecode = {
  pressure_change_code_1: VariableMeta;
};

type Ceiling = {
  ceiling_1: VariableMeta;
};

type Peakwindspeed = {
  peak_wind_speed_1: Dewpointtemperature1;
};

type Airtemplow6hour = {
  air_temp_low_6_hour_1: Dewpointtemperature1;
};

type Airtemphigh6hour = {
  air_temp_high_6_hour_1: Dewpointtemperature1;
};

type Metar = {
  metar_1: Metar1;
};

type Metar1 = {
  position?: any;
  PERIOD_OF_RECORD: PERIODOFRECORD;
};

type Metarremark = {
  metar_remark_1: Metarremark1;
};

type Metarremark1 = {
  position?: any;
  PERIOD_OF_RECORD: PERIODOFRECORD3;
};

type PERIODOFRECORD3 = {
  start?: any;
  end?: any;
};

type Visibility = {
  visibility_1: VariableMeta;
};

type Precipaccum24hour = {
  precip_accum_24_hour_1: VariableMeta;
};

type Precipaccumsixhour = {
  precip_accum_six_hour_1: VariableMeta;
};

type Cloudlayer2code = {
  cloud_layer_2_code_1: VariableMeta;
};

type Cloudlayer1code = {
  cloud_layer_1_code_1: VariableMeta;
};

type Precipaccumthreehour = {
  precip_accum_three_hour_1: VariableMeta;
};

type Precipaccumonehour = {
  precip_accum_one_hour_1: VariableMeta;
};

type Pressuretendency = {
  pressure_tendency_1: Windspeed2;
};

type Cloudlayer3code = {
  cloud_layer_3_code_1: VariableMeta;
};

type Weathercondcode = {
  weather_cond_code_1: VariableMeta;
};

type Sealevelpressure = {
  sea_level_pressure_1: VariableMeta;
};

type Snowdepth = {
  snow_depth_1: VariableMeta;
};

type Dewpointtemperature = {
  dew_point_temperature_1: Dewpointtemperature1;
};

type Dewpointtemperature1 = {
  position?: any;
  PERIOD_OF_RECORD: PERIODOFRECORD2;
};

type Altimeter = {
  altimeter_1: Altimeter1;
};

type Altimeter1 = {
  position?: string;
  PERIOD_OF_RECORD: PERIODOFRECORD;
};

type Volt = {
  volt_1: VariableMeta;
};

type Precipaccumfifteenminute = {
  precip_accum_fifteen_minute_1: VariableMeta;
};

type Windgust = {
  wind_gust_1: VariableMeta;
  wind_gust_2?: Windspeed2;
};

type Winddirection = {
  wind_direction_1: VariableMeta;
  wind_direction_2?: Windspeed2;
};

type Windspeed = {
  wind_speed_1: VariableMeta;
  wind_speed_2?: Windspeed2;
};

type Windspeed2 = {
  position: string;
  PERIOD_OF_RECORD: PERIODOFRECORD2;
};

type Relativehumidity = {
  relative_humidity_1: VariableMeta;
};

type Airtemp = {
  air_temp_1: VariableMeta;
};

type VariableMeta = {
  position?: string;
  PERIOD_OF_RECORD: PERIODOFRECORD2;
};

type PERIODOFRECORD2 = {
  start: string;
  end: string;
};

type PROVIDERS3 = {
  name: string;
  url: string;
};

type PROVIDERS2 = {
  name: string;
  url?: any;
};

type PROVIDER = {
  name: string;
  url?: string;
};

type PERIODOFRECORD = {
  start?: string;
  end?: string;
};
