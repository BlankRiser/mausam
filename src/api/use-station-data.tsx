/* eslint-disable @typescript-eslint/require-await */
import { urlSerializer } from "@/lib/utils";
import { useKy } from "@/providers/ky-provider";
import { useCurrentState } from "@/providers/station-store";
import type { STATION, SUMMARY } from "@/types/synoptic";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useMap } from "react-map-gl";
import { API } from "./constants";

const NETWORK_IMPORTANCE = [1, 2, 28, 153, 185, 206, 210, 239, 240];

export const useStationMetadata = () => {
  // map is the "id" attribute of <Map/>
  // https://visgl.github.io/react-map-gl/docs/api-reference/use-map
  const query = useKy();
  const { map } = useMap();

  const getBoundingBox = useCallback(() => {
    if (!map) return null;
    const bounds = map.getBounds();
    return `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
  }, [map]);

  const { currentVariable } = useCurrentState();
  const controller = new AbortController();

  const reactQuery = useQuery({
    enabled: !!map,
    queryKey: ["latest", map, currentVariable, controller.signal],
    placeholderData: (data) => data,
    queryFn: async () => {
      const boundingBox = getBoundingBox();
      if (!boundingBox) throw new Error("No map bounds available");

      const height = map?.getContainer().clientHeight;
      const width = map?.getContainer().clientWidth;
      const zoom = map?.getZoom();

      const params = {
        height: height,
        width: width,
        spacing: transformZoom({ zoom: zoom! }),
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

      return query
        .get(url, {
          signal: controller.signal,
        })
        .json<useStationDataResponse>();
    },
  });

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
