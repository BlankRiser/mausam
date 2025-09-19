import { queryOptions } from "@tanstack/react-query";
import { api } from "./api";

export const variablesQueryOptions = () => {
  return queryOptions({
    queryKey: ["variables"],
    queryFn: async () => {
      return api.variables.getAllVariables();
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const networksQueryOptions = () => {
  return queryOptions({
    queryKey: ["networks"],
    queryFn: async () => {
      return api.networks.getAllNetworks();
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const networkQueryOptions = ({networkId}:  {networkId:string}) => {
  return queryOptions({
    queryKey: ["networks", networkId],
    queryFn: async () => {
      return api.networks.getNetwork({
        searchParams: {
          id: networkId,
        }
      });
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const networksMetadataQueryOptions = ({ network }: { network: string }) => {
  return queryOptions({
    queryKey: ["networks", "metadata", network],
    queryFn: async () => {
      return api.stations.getMetadata({
        searchParams: {
          network: network,
          complete: 1,
          sensorvars: 1,
          stationhistory: 1,
        },
      });
    },
  });
};
export const stationMetadataQueryOptions = ({ stid }: { stid: string }) => {
  return queryOptions({
    queryKey: ["stations", "metadata", stid],
    queryFn: async () => {
      return api.stations.getMetadata({
        searchParams: {
          stid: stid,
          complete: 1,
          sensorvars: 1,
          stationhistory: 1,
        },
      });
    },
  });
};

export const stationLatestQueryOptions = ({ stid }: { stid: string }) => {
  return queryOptions({
    queryKey: ["stations", "latest", stid],
    queryFn: async () => {
      return api.stations.getLatest({
        searchParams: {
          stid,
          complete: 1,
          sensorvars: 1,
          minmax: 7,
          status: "active",
          obtimezone: "utc",
          minmaxtype: "utc",
          minmaxtimezone: "utc",
          units: "temp|c,speed|kph,pres|mb,height|m,precip|mm,alti|pa",
          within: 1 * 24 * 60, // 1 day
          // vars: "air_temp,relative_humidity,wind_speed,wind_gust,wind_direction,solar_radiation,precip_accum",
        },
      });
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
    queryFn: async () => {
      return await api.stations.getTimeSeries({
        searchParams: {
          stid,
          vars: vars.join(","),
          units: "temp|c,speed|kph,pres|mb,height|m,precip|mm,alti|pa",
          timeformat: "%s",
          recent: 25 * 60, // 25 hours to account for values close to the hour
        },
      });
    },
  });
};
