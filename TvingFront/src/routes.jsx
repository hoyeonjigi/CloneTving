import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Main from "./pages/Main.jsx";
import FindID from "./pages/FindID.jsx";
import OnBoarding from "./pages/OnBoarding.jsx";
import FindPassword from "./pages/FindPassword.jsx";

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
				path: "/findid",
				element: <FindID />,
			},
			{
				path: "/findpassword",
				element: <FindPassword />,
			},
		],
	},
]);

export default router;
