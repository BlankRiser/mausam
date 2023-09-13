import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Suspense } from "react";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: (1 / 2) * 60 * 1000,
      refetchOnMount: false,
      onError(error) {
        console.error(error)
      },
      retry(failureCount, error) {
        if (failureCount < 3) {
          return true
        }
        console.error(error)
        return false
      },
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    hasErrorBoundary: false
  },
]);

function App() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    }>

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider >
    </Suspense>
  );
}

export default App;
