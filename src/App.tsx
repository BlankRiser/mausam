import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { MapProvider } from "react-map-gl";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { router } from "./router/router";
import { ThemeProvider } from "@/hooks/use-theme";

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
