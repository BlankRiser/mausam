import { urlSerializer } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { useMutation } from "react-query";
import { API } from "./constants";

import { useKy } from "@/providers/ky-provider";
import type { STATION, SUMMARY } from "@/types/synoptic";
import { MapRef } from "react-map-gl";

const NETWORK_IMPORTANCE = [1, 2, 28, 153, 185, 206, 210, 239, 240];

type useStationMetadataProps = {
    map: MapRef;
    setStationData: React.Dispatch<React.SetStateAction<useStationDataResponse | undefined>>;
    fields?: string;
    obrange?: string;
};

const now = new Date();

export const useStationMetadata = ({
    map,
    setStationData,
    obrange = format(subDays(now, 1), "yyyyMMddHHmm") + "," + format(now, "yyyyMMddHHmm"),
}: useStationMetadataProps) => {
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
        obrange: obrange,
    };

    const url = urlSerializer({
        url: `${API.BaseUrl}stations/metadata`,
        params: params,
    });

    const reactQuery = useMutation({
        mutationKey: ["metadata", boundingBox, map],
        mutationFn: async () => query.get(url).json<useStationDataResponse>(),
        onSuccess: (data) => {
            setStationData(data);
        },
    });

    return reactQuery;
};

export type useStationDataResponse = {
    STATION: STATION[];
    SUMMARY: SUMMARY;
};
