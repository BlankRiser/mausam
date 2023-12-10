/* eslint-disable @typescript-eslint/require-await */
import { urlSerializer } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { useMutation } from "react-query";
import { API } from "./constants";

import { useKy } from "@/providers/ky-provider";
import type { STATION, SUMMARY } from "@/types/synoptic";
import { MapRef } from "react-map-gl";
import { useCurrentState } from "@/providers/station-store";
import { useEffect } from "react";

const NETWORK_IMPORTANCE = [1, 2, 28, 153, 185, 206, 210, 239, 240];

type useStationMetadataProps = {
  map: MapRef;
  setStationData?: React.Dispatch<
    React.SetStateAction<useStationDataResponse | undefined>
  >;
  fields?: string;
  obrange?: string;
};

const now = new Date();

export const useStationMetadata = ({
  map,
  obrange = format(subDays(now, 1), "yyyyMMddHHmm") +
    "," +
    format(now, "yyyyMMddHHmm"),
}: useStationMetadataProps) => {
  const query = useKy();
  const controller = new AbortController();

  const { currentVariable, setFetchedStations } = useCurrentState();

  const bounds = map?.getBounds();
  const boundingBox = `${bounds?.getWest()},${bounds?.getSouth()},${bounds?.getEast()},${bounds?.getNorth()}`;

  const height = map?.getContainer().clientHeight;
  const width = map?.getContainer().clientWidth;
  const zoom = map?.getZoom();

  const params = {
    height: height,
    width: width,
    spacing: transformZoom({ zoom }),
    minmax: 2,
    bbox: boundingBox,
    networkimportance: NETWORK_IMPORTANCE.join(","),
    // sensorvars: 1,
    // fields: "stid,name,latitude,longitude,mnet_id",
    // timeformat: "%s",
    vars: currentVariable,
    obtimezone: "utc",
    complete: 1,
    units: "temp|c,speed|kph,pres|mb,height|m,precip|mm,alti|pa",
    status: "active",
  };

  const url = urlSerializer({
    url: `${API.BaseUrl}/stations/latest`,
    params: params,
  });

  const reactQuery = useMutation({
    mutationKey: ["latest", boundingBox, map, currentVariable],
    mutationFn: async () =>
      query
        .get(url, {
          signal: controller.signal,
        })
        .json<useStationDataResponse>(),
  });

  useEffect(() => {
    if (reactQuery.isSuccess) {
      setFetchedStations(reactQuery.data?.STATION);
    }
  }, [reactQuery.data?.STATION, reactQuery.isSuccess, setFetchedStations]);

  return reactQuery;
};

export type useStationDataResponse = {
  STATION: STATION[];
  SUMMARY: SUMMARY;
};

type transformParams = {
  zoom: number;
  zoomMin?: number;
  zoomMax?: number;
  spacingMin?: number;
  spacingMax?: number;
};

export const transformZoom = ({
  zoom,
  zoomMin = 5,
  zoomMax = 8,
  spacingMin = 1,
  spacingMax = 37,
}: transformParams) => {
  // Ensure that the input value is within the input range
  zoom = Math.min(Math.max(zoom, zoomMin), zoomMax);

  // Calculate the percentage of the input value within the input range
  const zoomRange = zoomMax - zoomMin;
  const spacingRange = spacingMax - spacingMin;
  const normalizedValue = 1 - (zoom - zoomMin) / zoomRange;

  // Map the normalized value to the output range
  const spacing = spacingMin + normalizedValue * spacingRange;

  return spacing.toFixed(0);
};
