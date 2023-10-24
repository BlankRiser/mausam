import { urlSerializer } from "@/lib/utils";
import { useQuery } from "react-query";
import { API } from "./constants";
import { format, subDays } from "date-fns";

import { useKy } from "@/providers/KyProvider";
import { MapRef } from "react-map-gl";

const NETWORK_IMPORTANCE = [ 1, 2, 28, 153, 185, 206, 210, 239, 240 ];

export const useStationData = ({ map }:{
  map:  MapRef 
}) => {

  const now = new Date();
  const query = useKy();

  const bounds = map?.getBounds();
  const boundingBox = `${bounds?.getWest()},${bounds?.getSouth()},${bounds?.getEast()},${bounds?.getNorth()}`
   
  const height = map?.getContainer().clientHeight;
  const width = map?.getContainer().clientWidth;


  const params = {
    height: height,
    width: width,
    spacing: 36,
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

  const reactQuery =  useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [ "stationData" , boundingBox, map ],
    queryFn: async () => query.get(url).json<useStationDataResponse>(),
    enabled: !!map,    
  });

  return reactQuery
};

type useStationDataResponse = {
  STATION: STATION[];
  SUMMARY: SUMMARY;
};

type SUMMARY = {
  NUMBER_OF_OBJECTS: number;
  RESPONSE_CODE: number;
  VERSION: string;
  RESPONSE_MESSAGE: string;
  METADATA_RESPONSE_TIME: string;
}

type STATION = {
  MNET_ID: string;
  NAME: string;
  STID: string;
  LONGITUDE: string;
  RESTRICTED: boolean;
  LATITUDE: string;
}
