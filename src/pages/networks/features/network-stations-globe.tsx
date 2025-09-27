import { useSuspenseQuery } from "@tanstack/react-query";
import { COBEOptions, Marker } from "cobe";
import { useMemo } from "react";
import { networksMetadataQueryOptions } from "@/api/query-factory";
import { Globe } from "@/components/ui/globe";
import { networkRoute } from "@/router/routes";

export const NetworkStationsGlobe = () => {
  const { networkId } = networkRoute.useParams();
  const { data } = useSuspenseQuery(
    networksMetadataQueryOptions({
      network: networkId,
    }),
  );

  const globeConfig = useMemo(() => {
    const markers: Array<Marker> = data.STATION
      ? data.STATION.map((stn) => {
          return {
            location: [+stn.LATITUDE, +stn.LONGITUDE],
            size: 0.05,
          };
        })
      : [];

    return {
      width: 800,
      height: 800,
      onRender: () => void 0,
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 0.4,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1, 1, 1],
      markers: markers,
    } satisfies COBEOptions;
  }, [data]);

  return (
    <div className="w-full h-full grid place-items-center">
      <Globe config={globeConfig} />
    </div>
  );
};
