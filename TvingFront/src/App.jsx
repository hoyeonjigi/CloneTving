import { AnimatePresence } from "framer-motion";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./routes.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <AnimatePresence>
          <Toaster />
          <RouterProvider router={router} />
        </AnimatePresence>
      </HelmetProvider>
    </>
  );
}

export default App;
