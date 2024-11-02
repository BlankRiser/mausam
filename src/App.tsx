import { MapProvider } from "react-map-gl";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { GlobalErrorBoundary } from "./components/common/GlobalErrorBoundary";
import { TooltipProvider } from "./components/ui/tooltip";
import { Home } from "./pages/home/home";

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
    <MapProvider>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </TooltipProvider>
    </MapProvider>
  );
};

export default App;
