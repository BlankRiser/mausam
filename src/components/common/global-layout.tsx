import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./navbar";

export const RootComponent = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
