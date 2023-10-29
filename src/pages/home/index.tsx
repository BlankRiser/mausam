import { useMap } from "react-map-gl";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import MapContainer from "./features/MapContainer";
import { useCurrentStation } from "@/providers/station-store";

export const Home = () => {
  // map is the "id" attribute of <Map/>
  // https://visgl.github.io/react-map-gl/docs/api-reference/use-map
  const { map } = useMap();

  return (
    <section className="w-full h-screen ">
      <PanelGroup direction="horizontal">
        <Panel>
          <section className="w-full overflow-y-auto h-full">
            <Header />
            <StationSummary />
          </section>
        </Panel>
        <PanelResizeHandle className="w-2 group flex flex-col justify-center items-center data-[resize-handle-active='pointer']:bg-neutral-50">
          <div className="bg-neutral-200 h-8 w-1 rounded-md group-hover:bg-neutral-300 group-data-[resize-handle-active='pointer']:bg-neutral-400" />
        </PanelResizeHandle>
        <Panel
          className="w-full relative"
          defaultSize={60}
          minSize={50}
          maxSize={65}
          onResize={() => {
            map?.resize();
          }}
        >
          <MapContainer />
        </Panel>
      </PanelGroup>
    </section>
  );
};

const Header = () => {
  return <h1 className="text-center text-lg font-semibold text-neutral-800 py-4">Mausam</h1>;
};

const StationSummary = () => {
  const { currentStation } = useCurrentStation();

  if (!currentStation) {
    return <>Select a station</>;
  }

  return (
    <div>
      <div>{JSON.stringify(currentStation)}</div>
    </div>
  );
};
