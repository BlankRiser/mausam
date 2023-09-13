import { useStationData } from "@/api/useStationData";
import { useRef } from "react";
import Map, { MapRef, NavigationControl } from "react-map-gl";

export function Home() {
  const mapRef = useRef<MapRef>();

  const { isLoading, data } = useStationData(mapRef);

  if (isLoading) {
    console.log("loading");
    return <>loading...</>;
  }

  return (
    <div className="w-full h-screen bg-emerald-400">
      <Map
        ref={mapRef as React.MutableRefObject<MapRef>}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_KEY}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl position="top-left" />
      </Map>
    </div>
  );
}
