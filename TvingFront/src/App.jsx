import { AnimatePresence } from "framer-motion";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </HelmetProvider>
    </>
  );
}

export default App;
