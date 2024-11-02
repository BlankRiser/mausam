import { SUMMARY } from "./common";

export interface Networks {
  MNET: MNETLabelItems[];
  SUMMARY: SUMMARY;
}

export interface MNETLabelItems {
  ID: string;
  SHORTNAME: string;
  LONGNAME: string;
  URL: null | string;
  CATEGORY: null | string;
  LAST_OBSERVATION: string;
  REPORTING_STATIONS: number;
  ACTIVE_STATIONS: number;
  TOTAL_STATIONS: number;
  PERCENT_ACTIVE?: number;
  PERCENT_REPORTING: number;
  PERIOD_CHECKED?: number;
  ACTIVE_RESTRICTED?: number;
  TOTAL_RESTRICTED?: number;
  PERIOD_OF_RECORD?: PERIODOFRECORD;
}

interface PERIODOFRECORD {
  start: string;
  end: string;
}
