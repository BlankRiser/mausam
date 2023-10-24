import { useStationData } from "@/api/use-station-data";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, NavigationControl, useMap } from "react-map-gl";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export const Home = () => {
  // map is the "id" attribute of <Map/> 
  // https://visgl.github.io/react-map-gl/docs/api-reference/use-map
  const { map } = useMap();

 const mapDefault = useMap();

  const { isLoading, data , refetch } = useStationData({
    map: map 
  });

  const fetchMapData = () => async () => {
    await refetch();
  };

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <section className="w-full h-screen ">
      <PanelGroup direction="horizontal">
        <Panel>
          <div className="w-full overflow-y-auto h-full">
            <h1>Mausam</h1>
            <div>{JSON.stringify(data)}</div>
            <div>{JSON.stringify(mapDefault.current)}</div>
          </div>
        </Panel>
        <PanelResizeHandle className="w-6 group flex flex-col justify-center">
          <div className="h-8 m-2 rounded-md group-hover:bg-neutral-200 group-data-[resize-handle-active='pointer']:bg-neutral-400"></div>
        </PanelResizeHandle>
        <Panel
          className="w-full"
          defaultSize={60}
          minSize={50}
          maxSize={65}
          onResize={() => {
            map?.resize();
          }}
        >
          <Map
            id='map'
            hash="map"
            reuseMaps
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_KEY}
            initialViewState={{
              longitude: 77.6122,
              latitude: 12.9645,
              zoom: 11,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onZoomEnd={ () =>{  fetchMapData()}}
            onDragEnd={() =>{  fetchMapData()}}
            onMoveEnd={() =>{  fetchMapData()}}
            onClick={(e) => {
              alert(e.lngLat);
            }}
            onLoad={() =>{  fetchMapData()}}
          >
            <NavigationControl position="top-left" />
            {data?.STATION?.map((station) => {
              return (
                <Marker key={station.STID} latitude={+station.LATITUDE} longitude={+station.LONGITUDE} color="red">
                  <div className=" z-50 w-[10px] h-[10px] bg-red-400">nice</div>
                </Marker>
              );
            })}
          </Map>
        </Panel>
      </PanelGroup>
    </section>
  );
};

