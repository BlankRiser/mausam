import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense } from "react";
import { Home } from "./pages";
import { MapRefProvider } from "./providers/map-provider";
import { GlobalErrorBoundary } from "./components/common/GlobalErrorBoundary";
import { MapProvider } from "react-map-gl";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";

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
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
        </div>
      }
    >
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <MapRefProvider>
            <MapProvider>
              <div>
                <RouterProvider router={router} />
              </div>
              <Toaster />
            </MapProvider>
          </MapRefProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </Suspense>
  );
};

export default App;
