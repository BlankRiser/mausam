import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./navbar";

export const RootComponent = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <main className="w-full h-full">
        <Outlet />
      </main>
      <footer className="flex justify-between items-center px-2 py-2 bg-neutral-100">
        <p>
          Made with
          <span role="img" aria-label="love">
            ❤️
          </span>
          by{" "}
          <a
            href="https://github.com/BlankRiser"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Ram Shankar
          </a>
        </p>
        <p>
          Data sourced from{" "}
          <a
            href="http://synopticdata.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {" "}
            Synoptic Data
          </a>
        </p>
      </footer>
    </div>
  );
};
