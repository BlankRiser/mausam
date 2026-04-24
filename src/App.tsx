import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { RouterProvider } from "@tanstack/react-router";
import { MapProvider } from "@vis.gl/react-maplibre";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/hooks/use-theme";
import { localStoragePersistor, queryClient } from "@/lib/query-client";
import { TooltipProvider } from "./components/ui/tooltip";
import { router } from "./router/router";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MapProvider>
        <TooltipProvider>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
              persister: localStoragePersistor,
              dehydrateOptions: {
                shouldDehydrateQuery: (query) => {
                  if (query.queryKey[0] === "persist") {
                    return true;
                  }
                  return false;
                },
              },
            }}
          >
            <RouterProvider router={router} />
            <Toaster />
          </PersistQueryClientProvider>
        </TooltipProvider>
      </MapProvider>
    </ThemeProvider>
  );
};

export default App;
