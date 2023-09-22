import { urlSerializer } from "@/lib/utils";
import { useQuery } from "react-query";
import { API } from "./constants";
import { format, subDays } from "date-fns";

import { useKy } from "@/providers/KyProvider";
import { useMapRef } from "@/providers/mapProvider";

const NETWORK_IMPORTANCE = [1, 2, 28, 153, 185, 206, 210, 239, 240];

export const useStationData = () => {
  const { mapRef } = useMapRef();

  const now = new Date();
  const query = useKy();

  const bounds = mapRef?.current?.getBounds();
  const boundingBox = bounds
    ? `${bounds?.getWest()},${bounds?.getSouth()},${bounds?.getEast()},${bounds?.getNorth()}`
    : "";
  const height = mapRef?.current?.getContainer().clientHeight;
  const width = mapRef?.current?.getContainer().clientWidth;

  console.log(bounds, height, width);

  const params = {
    height: height,
    width: width,
    spacing: 20,
    bbox: boundingBox,
    sensorvars: 1,
    networkimportance: NETWORK_IMPORTANCE.join(","),
    fields: "stid,name,latitude,longitude,mnet_id",
    obrange: format(subDays(now, 1), "yyyyMMddHHmm") + "," + format(now, "yyyyMMddHHmm"),
  };

  const url = urlSerializer({
    url: `${API.BaseUrl}stations/metadata`,
    params: params,
  });

  console.log(url);

  return useQuery({
    queryKey: ["stationData", mapRef?.current, url],
    queryFn: () => query.get(url).json<useStationDataResponse>(),
    enabled: !!mapRef?.current,
    onSuccess(data) {
      console.log(data);
    },
  });
};

type useStationDataResponse = {
  STATION: STATION[];
  SUMMARY: SUMMARY;
};

interface SUMMARY {
  NUMBER_OF_OBJECTS: number;
  RESPONSE_CODE: number;
  VERSION: string;
  RESPONSE_MESSAGE: string;
  METADATA_RESPONSE_TIME: string;
}

interface STATION {
  MNET_ID: string;
  NAME: string;
  STID: string;
  LONGITUDE: string;
  RESTRICTED: boolean;
  LATITUDE: string;
}
