import { Suspense } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "react-query"

import { Explore } from "@/pages";

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
    element: <Explore />,
  },
])

export function GlobalProvider() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    }>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  )
}