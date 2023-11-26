import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Main from "./pages/Main.jsx";
import OnBoading from "./pages/OnBoading.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <OnBoading />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/main",
        element: <Main />,
      },
    ],
  },
]);

export default router;
