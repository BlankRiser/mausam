import Map, { NavigationControl } from "react-map-gl";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_KEY}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl position="top-left" />
      </Map>
    </div>
  );
}

export default App;
