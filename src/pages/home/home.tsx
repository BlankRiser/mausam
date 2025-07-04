import { useMediaQuery } from "@uidotdev/usehooks";
import { useMap } from "react-map-gl";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { LeftPanel } from "./features/LeftPanel";
import { MapContainer } from "./features/MapContainer";


export const Home = () => {
  // map is the "id" attribute of <Map/>
  // https://visgl.github.io/react-map-gl/docs/api-reference/use-map
  const { map } = useMap();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  return (
    <section className="bg-neutral-50 dark:bg-neutral-950 rounded-md h-[calc(100svh-var(--nav-height)-var(--footer-height))]">
      <Banner/>
      <PanelGroup direction={isSmallDevice ? "vertical" : "horizontal"}>
        <Panel>
          <LeftPanel />
        </Panel>
        <PanelResizeHandle className="transition-colors w-full md:w-2 group flex flex-col justify-center items-center data-[resize-handle-active='pointer']:bg-blue-100 dark:data-[resize-handle-active='pointer']:bg-neutral-800">
          <div className="bg-neutral-200 w-8 h-1 my-2 md:h-8 md:w-1 rounded-md group-hover:bg-blue-300 group-data-[resize-handle-active='pointer']:h-full group-data-[resize-handle-active='pointer']:bg-blue-400" />
        </PanelResizeHandle>
        <Panel
          className="w-full relative rounded-md p-2 md:p-0"
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

const Banner = () => {
  return (
    <div className="w-full bg-zinc-100 dark:bg-zinc-900 grid place-items-center p-2">
      <a
        className="underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400"
        href="https://docs.synopticdata.com/services/weather-data-api"
        target="_blank"
        rel="noopener noreferrer"
      >
        Built using Synoptic Weather Data API
      </a>
    </div>
  );
};
