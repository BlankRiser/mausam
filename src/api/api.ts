import { useKeysStore } from "@/store/env-keys.store";
import type { ApiErrorResponse } from "@/types/common";
import type { Networks } from "@/types/networks";
import type { LatestStationResponse } from "@/types/station";
import type { StationMetadata } from "@/types/station-metadata";
import type { Variables } from "@/types/variables";
import ky, { type Options } from "ky";
import { toast } from "sonner";
import { API } from "./constants";

type SearchParamsType = Record<string, string | number>;

export const createAPI = ({ base }: { base: string }) => {
  const baseUrl = base ?? API.BaseUrl;

  const apiToken = useKeysStore.getState().synopticToken;

  const defaultSearchParams = {
    token: apiToken,
  };

  const kyOptions: Options = {
    prefixUrl: baseUrl,
    hooks: {
      beforeRequest: [
        () => {
          if (!apiToken) {
            toast.error("API token is not set");
          }
        },
      ],
      afterResponse: [
       async (_request, _options, response) => {
          if(!response.ok) {
            const data: ApiErrorResponse = await response.json() 
            toast.error(`Error: ${data.SUMMARY.RESPONSE_MESSAGE} (Code: ${data.SUMMARY.RESPONSE_CODE})`);
            
            // window.location.href = "/token";
          }
       
        },
      ],
    },
  };

  const fetcher = ky.create(kyOptions);

  return {
    variables: {
      getAllVariables: () => {
        return fetcher
          .get("variables", {
            searchParams: {
              ...defaultSearchParams,
            },
          })
          .json<Variables>();
      },
    },
    networks: {
      getAllNetworks: () => {
        return fetcher
          .get("networks", {
            searchParams: {
              ...defaultSearchParams,
            },
          })
          .json<Networks>();
      },
      getNetwork: ({ searchParams }: { searchParams: SearchParamsType }) => {
        return fetcher
          .get("networks", {
            searchParams: {
              ...searchParams,
              ...defaultSearchParams,
            },
          })
          .json<Networks>();
      },
    },
    stations: {
      getLatest: ({ searchParams }: { searchParams: SearchParamsType }) => {
        return fetcher
          .get("stations/latest", {
            searchParams: {
              ...searchParams,
              ...defaultSearchParams,
            },
          })
          .json<LatestStationResponse>();
      },
      getMetadata: ({ searchParams }: { searchParams: SearchParamsType }) => {
        return fetcher
          .get("stations/metadata", {
            searchParams: {
              ...searchParams,
              ...defaultSearchParams,
            },
          })
          .json<StationMetadata>();
      },
      getTimeSeries: ({ searchParams }: { searchParams: SearchParamsType }) => {
        return fetcher
          .get("stations/timeseries", {
            searchParams: {
              ...searchParams,
              ...defaultSearchParams,
            },
          })
          .json<LatestStationResponse>();
      },
    },
  };
};

export const api = createAPI({
  base: API.BaseUrl,
});
