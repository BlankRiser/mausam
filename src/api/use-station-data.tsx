import { urlSerializer } from "@/lib/utils";
import { useQuery } from "react-query";
import { API } from "./constants";
import { format, subDays } from "date-fns";

import { useKy } from "@/providers/ky-provider";
import { MapRef } from "react-map-gl";
import type { STATION, SUMMARY } from "@/types/synoptic";

const NETWORK_IMPORTANCE = [1, 2, 28, 153, 185, 206, 210, 239, 240];

export const useStationMetadata = ({ map }: { map: MapRef }) => {
    const now = new Date();
    const query = useKy();

    const bounds = map?.getBounds();
    const boundingBox = `${bounds?.getWest()},${bounds?.getSouth()},${bounds?.getEast()},${bounds?.getNorth()}`;

    const height = map?.getContainer().clientHeight;
    const width = map?.getContainer().clientWidth;

    const params = {
        height: height,
        width: width,
        spacing: 36,
        bbox: boundingBox,
        sensorvars: 1,
        networkimportance: NETWORK_IMPORTANCE.join(","),
        // fields: "stid,name,latitude,longitude,mnet_id",
        complete: 1,
        obrange: format(subDays(now, 1), "yyyyMMddHHmm") + "," + format(now, "yyyyMMddHHmm"),
    };

    const url = urlSerializer({
        url: `${API.BaseUrl}stations/metadata`,
        params: params,
    });

    // const reactQuery = useMutation({
    //   mutationFn: async () => query.get(url).json<useStationDataResponse>(),
    //   mutationKey: ["metadata", boundingBox, map],
    // });
    const reactQuery = useQuery({
        queryKey: ["metadata", url, boundingBox, map],
        queryFn: async () => query.get(url).json<useStationDataResponse>(),
    });

    return reactQuery;
};

type useStationDataResponse = {
    STATION: STATION[];
    SUMMARY: SUMMARY;
};
