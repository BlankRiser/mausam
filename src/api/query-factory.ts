import { API } from "@/api/constants";
import { useKeysStore } from "@/store/env-keys.store";
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
            token: useKeysStore.getState().synopticToken,
          },
        })
        .json<Variables>()
        .catch((error) => {
          console.error(error);
        });
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
            token: useKeysStore.getState().synopticToken,
          },
        })
        .json<Networks>()
        .catch((error) => {
          console.error(error);
        });
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
            token: useKeysStore.getState().synopticToken,
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
            // vars: "air_temp,relative_humidity,wind_speed,wind_gust,wind_direction,solar_radiation,precip_accum",
            token: useKeysStore.getState().synopticToken,
          },
        })
        .json<LatestStationResponse>();
    },
  });
};
export const variableTimeseriesQueryOptions = ({
  stid,
  vars,
}: {
  stid: string;
  vars: Array<string>;
}) => {
  return queryOptions({
    queryKey: ["stations", "timeseries", stid, vars],
    queryFn: () => {
      return ky
        .get(`${API.BaseUrl}/stations/timeseries`, {
          searchParams: {
            stid,
            vars: vars.join(","),
            recent: 25 * 60, // 25 hours to account for values close to the hour
            timeformat: "%s",
            units: "temp|c,speed|kph,pres|mb,height|m,precip|mm,alti|pa",
            token: useKeysStore.getState().synopticToken,
          },
        })
        .json<LatestStationResponse>();
    },
  });
};
