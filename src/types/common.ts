export interface SUMMARY {
  RESPONSE_CODE: number;
  RESPONSE_MESSAGE: string;
  METADATA_RESPONSE_TIME: string;
  DATA_PARSING_TIME: string;
  TOTAL_DATA_TIME: string;
  NUMBER_OF_OBJECTS: number;

  // keys that are not always present
  RESPONSE_TIME?: string;
}
