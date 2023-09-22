import { useStationData } from "@/api/useStationData";
import { useMapRef } from "@/providers/mapProvider";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export function Home() {
  const { mapRef } = useMapRef();
  const { isLoading, data, refetch } = useStationData();

  const fetchMapData = async () => {
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
            mapRef?.current?.resize();
          }}
        >
          <Map
            ref={mapRef}
            hash="map"
            reuseMaps
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_KEY}
            initialViewState={{
              longitude: -122.43639,
              latitude: 37.5625,
              zoom: 14,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onZoomEnd={() => fetchMapData}
            onDragEnd={() => fetchMapData}
            onMoveEnd={() => fetchMapData}
            onClick={(e) => {
              alert(e.lngLat);
            }}
            onLoad={() => fetchMapData}
          >
            <NavigationControl position="top-left" />
            {data?.STATION.map((station) => {
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
}

const _dummy = {
  STATION: [
    {
      MNET_ID: "2",
      NAME: "SPRING VALLEY",
      STID: "HSPC1",
      LONGITUDE: "-122.436390",
      LATITUDE: "37.5625",
      RESTRICTED: false,
    },
    {
      MNET_ID: "65",
      NAME: "CW5988 San Francisco",
      STID: "C5988",
      LONGITUDE: "-122.43167",
      RESTRICTED: false,
      LATITUDE: "37.75967",
    },
    {
      MNET_ID: "106",
      NAME: "PILLARCITOS DAM",
      STID: "PXDC1",
      LONGITUDE: "-122.42194",
      RESTRICTED: false,
      LATITUDE: "37.54806",
    },
    {
      MNET_ID: "106",
      NAME: "SAN FRANCISCO DOWNTOWN",
      STID: "SFOC1",
      LONGITUDE: "-122.42694",
      RESTRICTED: false,
      LATITUDE: "37.77056",
    },
    {
      MNET_ID: "65",
      NAME: "DW2059 Montara",
      STID: "D2059",
      LONGITUDE: "-122.50693",
      RESTRICTED: false,
      LATITUDE: "37.53769",
    },
    {
      MNET_ID: "65",
      NAME: "DW5422 San Francisco",
      STID: "D5422",
      LONGITUDE: "-122.51051",
      RESTRICTED: false,
      LATITUDE: "37.77174",
    },
    {
      MNET_ID: "65",
      NAME: "EW5830 San Francisco",
      STID: "E5830",
      LONGITUDE: "-122.43094",
      RESTRICTED: false,
      LATITUDE: "37.73551",
    },
    {
      MNET_ID: "65",
      NAME: "EW9227 San Francisco",
      STID: "E9227",
      LONGITUDE: "-122.43617",
      RESTRICTED: false,
      LATITUDE: "37.75617",
    },
    {
      MNET_ID: "65",
      NAME: "K6HN Pacifica",
      STID: "AV218",
      LONGITUDE: "-122.48283",
      RESTRICTED: false,
      LATITUDE: "37.58867",
    },
    {
      MNET_ID: "65",
      NAME: "FW2543 San Francisco",
      STID: "F2543",
      LONGITUDE: "-122.44633",
      RESTRICTED: false,
      LATITUDE: "37.76283",
    },
    {
      MNET_ID: "136",
      NAME: "San Francisco",
      STID: "A4542",
      LONGITUDE: "-122.39780",
      RESTRICTED: false,
      LATITUDE: "37.76580",
    },
    {
      MNET_ID: "208",
      NAME: "Lowell HS Outdoor 1",
      STID: "2614P",
      LONGITUDE: "-122.48266",
      RESTRICTED: false,
      LATITUDE: "37.73055",
    },
    {
      MNET_ID: "229",
      NAME: "Lake Drive",
      STID: "PG784",
      LONGITUDE: "-122.44990",
      RESTRICTED: false,
      LATITUDE: "37.61842",
    },
    {
      MNET_ID: "208",
      NAME: "Ab6tractions",
      STID: "3952P",
      LONGITUDE: "-122.43763",
      RESTRICTED: false,
      LATITUDE: "37.77495",
    },
    {
      MNET_ID: "65",
      NAME: "FW8022 Pacifica",
      STID: "F8022",
      LONGITUDE: "-122.48550",
      RESTRICTED: false,
      LATITUDE: "37.63417",
    },
    {
      MNET_ID: "65",
      NAME: "FW8291 Pacifica",
      STID: "F8291",
      LONGITUDE: "-122.48167",
      RESTRICTED: false,
      LATITUDE: "37.58083",
    },
    {
      MNET_ID: "65",
      NAME: "AE6DC-5 Pacifica",
      STID: "AV684",
      LONGITUDE: "-122.49367",
      RESTRICTED: false,
      LATITUDE: "37.63133",
    },
    {
      MNET_ID: "106",
      NAME: "UPPER COLMA CREEK GAGING STATION NEAR SOUTH SAN FRANCISCO 1W",
      STID: "MXSC1",
      LONGITUDE: "-122.42667",
      RESTRICTED: false,
      LATITUDE: "37.65389",
    },
    {
      MNET_ID: "229",
      NAME: "Colma - Sand Hill",
      STID: "070PG",
      LONGITUDE: "-122.44248",
      RESTRICTED: false,
      LATITUDE: "37.68281",
    },
    {
      MNET_ID: "65",
      NAME: "FW7523 San Francisco",
      STID: "F7523",
      LONGITUDE: "-122.48567",
      RESTRICTED: false,
      LATITUDE: "37.75250",
    },
    {
      MNET_ID: "65",
      NAME: "GW0189 San Francisco",
      STID: "G0189",
      LONGITUDE: "-122.45350",
      RESTRICTED: false,
      LATITUDE: "37.71867",
    },
    {
      MNET_ID: "229",
      NAME: "Sweeney Ridge",
      STID: "180PG",
      LONGITUDE: "-122.45838",
      RESTRICTED: false,
      LATITUDE: "37.60538",
    },
    {
      MNET_ID: "229",
      NAME: "Potrero IDSM",
      STID: "438PG",
      LONGITUDE: "-122.38344",
      RESTRICTED: false,
      LATITUDE: "37.75562",
    },
    {
      MNET_ID: "65",
      NAME: "K6POO-1 BRISBANE",
      STID: "AW038",
      LONGITUDE: "-122.40267",
      RESTRICTED: false,
      LATITUDE: "37.68100",
    },
    {
      MNET_ID: "65",
      NAME: "GW3010 San Francisco",
      STID: "G3010",
      LONGITUDE: "-122.41000",
      RESTRICTED: false,
      LATITUDE: "37.72250",
    },
  ],
  SUMMARY: {
    NUMBER_OF_OBJECTS: 25,
    RESPONSE_CODE: 1,
    VERSION: "v2.21.3",
    RESPONSE_MESSAGE: "OK",
    METADATA_RESPONSE_TIME: "300.801038742 ms",
  },
};
