import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Main from "./pages/Main.jsx";
import OnBoarding from "./pages/OnBoarding.jsx";
import Profile from "./pages/Profile.jsx";
import ProfilesForEdit from "./pages/ProfilesForEdit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <OnBoarding />,
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
      {
        path: "/profiles",
        element: <Profile />,
      },
      {
        path: "/profilesForEdit",
        element: <ProfilesForEdit />,
      },
    ],
  },
]);

export default router;
