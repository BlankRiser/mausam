import { urlSerializer } from "@/lib/utils";
import { useQuery } from "react-query";
import { API } from "./constants";
import { format, subDays } from "date-fns";
import { MapRef } from "react-map-gl";

import { useKy } from "@/providers/KyProvider";

const NETWORK_IMPORTANCE = [1, 2, 28, 153, 185, 206, 210, 239, 240];

export const useStationData = (
  mapRef: React.MutableRefObject<MapRef | undefined> | undefined
) => {
  const query = useKy();

  const now = new Date();

  const bounds = mapRef?.current?.getBounds();
  const boundingBox = bounds
    ? `${bounds?.getWest()},${bounds?.getSouth()},${bounds?.getEast()},${bounds?.getNorth()}`
    : "";
  const height = mapRef?.current?.getContainer().clientHeight;
  const width = mapRef?.current?.getContainer().clientWidth;

  const params = {
    height: height ?? "",
    width: width ?? "",
    spacing: 20,
    bbox: boundingBox,
    sensorvars: 1,
    networkimportance: NETWORK_IMPORTANCE.join(","),
    fields: "stid,name,latitude,longitude,mnet_id",
    obrange:
      format(subDays(now, 1), "yyyyMMddHHmm").toString() +
      "," +
      format(now, "yyyyMMddHHmm").toString(),
  };

  const url = urlSerializer({
    url: `${API.BaseUrl}stations/metadata`,
    params: params,
  });

  return useQuery({
    queryKey: ["stationData"],
    queryFn: () => query.get(url).json<unknown>(),
    enabled: !!url && !!mapRef?.current,
    onSuccess(data) {
      console.log(data);
    },
  });
};
