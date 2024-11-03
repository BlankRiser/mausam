import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./navbar";

export const RootComponent = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <Outlet />
    </div>
  );
};
