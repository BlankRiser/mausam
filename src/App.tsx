import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { MapProvider } from "@vis.gl/react-maplibre";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/hooks/use-theme";
import { TooltipProvider } from "./components/ui/tooltip";
import { router } from "./router/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: (1 / 2) * 60 * 1000,
      refetchOnMount: false,

      retry(failureCount, error) {
        if (failureCount < 3) {
          return true;
        }
        console.error(error);
        return false;
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MapProvider>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
          </QueryClientProvider>
        </TooltipProvider>
      </MapProvider>
    </ThemeProvider>
  );
};

export default App;
