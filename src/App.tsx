import { MapProvider } from "react-map-gl";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { GlobalErrorBoundary } from "./components/common/GlobalErrorBoundary";
import { TooltipProvider } from "./components/ui/tooltip";
import { Home } from "./pages";
import { MapRefProvider } from "./providers/map-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: (1 / 2) * 60 * 1000,
      refetchOnMount: false,
      onError(error) {
        console.error(error);
      },
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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GlobalErrorBoundary>
        <Home />
      </GlobalErrorBoundary>
    ),
    hasErrorBoundary: true,
  },
]);

const App = () => {
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <MapRefProvider>
          <MapProvider>
            <RouterProvider router={router} />
            <Toaster />
          </MapProvider>
        </MapRefProvider>
      </QueryClientProvider>
    </TooltipProvider>
  );
};

export default App;
