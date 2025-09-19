import { z } from "zod";

export const summarySchema = z.object({
  RESPONSE_CODE: z.number(),
  RESPONSE_MESSAGE: z.string(),
  METADATA_RESPONSE_TIME: z.string(),
  DATA_PARSING_TIME: z.string(),
  TOTAL_DATA_TIME: z.string(),
  NUMBER_OF_OBJECTS: z.number(),
  RESPONSE_TIME: z.string().optional(),
  METADATA_PARSE_TIME: z.string().optional(),
  METADATA_DB_QUERY_TIME: z.string().optional(),
  VERSION: z.string().optional(),
});

export interface SUMMARY {
  RESPONSE_CODE: number;
  RESPONSE_MESSAGE: string;
  METADATA_RESPONSE_TIME: string;
  DATA_PARSING_TIME: string;
  TOTAL_DATA_TIME: string;
  NUMBER_OF_OBJECTS: number;

  // keys that are not always present
  RESPONSE_TIME?: string;

  // from metadata request
  METADATA_PARSE_TIME?: string;
  METADATA_DB_QUERY_TIME?: string;
  VERSION?: string;
}

export interface ApiErrorResponse {
  SUMMARY: {
    NUMBER_OF_OBJECTS: number;
    RESPONSE_CODE: number;
    VERSION: string;
    RESPONSE_MESSAGE: string;
    RESPONSE_TIME: number;
  };
}
