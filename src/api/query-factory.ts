import { API } from "@/api/constants";
import { Networks } from "@/types/networks";
import { LatestStationResponse } from "@/types/station";
import { StationMetadata } from "@/types/station-metadata";
import { Variables } from "@/types/variables";
import { queryOptions } from "@tanstack/react-query";
import ky from "ky";

export const variablesQueryOptions = () => {
  return queryOptions({
    queryKey: ["variables"],
    queryFn: () => {
      return ky
        .get(`${API.BaseUrl}/variables`, {
          searchParams: {
            token: import.meta.env.VITE_SYNOPTIC_KEY,
          },
        })
        .json<Variables>();
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const networksQueryOptions = () => {
  return queryOptions({
    queryKey: ["networks"],
    queryFn: () => {
      return ky
        .get(`${API.BaseUrl}/networks`, {
          searchParams: {
            token: import.meta.env.VITE_SYNOPTIC_KEY,
          },
        })
        .json<Networks>();
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const stationMetadataQueryOptions = ({ stid }: { stid: string }) => {
  return queryOptions({
    queryKey: ["stations", "metadata", stid],
    queryFn: () => {
      return ky
        .get(`${API.BaseUrl}/stations/metadata`, {
          searchParams: {
            stid,
            complete: 1,
            sensorvars: 1,
            stationhistory: 1,
            token: import.meta.env.VITE_SYNOPTIC_KEY,
          },
        })
        .json<StationMetadata>();
    },
  });
};

export const stationLatestQueryOptions = ({ stid }: { stid: string }) => {
  return queryOptions({
    queryKey: ["stations", "latest", stid],
    queryFn: () => {
      return ky
        .get(`${API.BaseUrl}/stations/latest`, {
          searchParams: {
            stid,
            complete: 1,
            sensorvars: 1,
            minmax: 2,
            status: "active",
            obtimezone: "utc",
            minmaxtype: "utc",
            minmaxtimezone: "utc",
            units: "temp|c,speed|kph,pres|mb,height|m,precip|mm,alti|pa",
            within: 1 * 24 * 60, // 1 day
            vars: "air_temp,relative_humidity,wind_speed,wind_gust,wind_direction,solar_radiation,precip_accum",
            token: import.meta.env.VITE_SYNOPTIC_KEY,
          },
        })
        .json<LatestStationResponse>();
    },
  });
};
