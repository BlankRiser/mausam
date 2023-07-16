import { useRef } from "react";
import { Map, NavigationControl } from "react-map-gl";


export function Explore() {

  const mapRef = useRef(null);

  return (
    <div
      className="w-full h-screen"
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_KEY}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl position="top-left" />
      </Map>
    </div>
  )
}

