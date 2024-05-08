import { AnimatePresence } from "framer-motion";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./routes.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <AnimatePresence>
            <Toaster />
            <RouterProvider router={router} />
          </AnimatePresence>
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
