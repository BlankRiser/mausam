import { Link } from "@tanstack/react-router";

export const StationIndexPage = () => {
  return (
    <div className="w-full h-[calc(100svh-var(--nav-height)-var(--footer-height))] grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-7xl font-semibold">Select a station</h3>
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 underline underline-offset-4"
        >
          Go back to the home page and select a station to view its details.
        </Link>
      </div>
    </div>
  );
};
