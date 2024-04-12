import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Main from "./pages/Main.jsx";
import FindID from "./pages/FindID.jsx";
import OnBoarding from "./pages/OnBoarding.jsx";
import Profile from "./pages/Profile.jsx";
import ProfilesForEdit from "./pages/ProfilesForEdit.jsx";
import UserTving from "./pages/UserTving.jsx";

import ProfileForEditDetail from "./pages/ProfileForEditDetail.jsx";
import FindPassword from "./pages/FindPassword.jsx";
import Detail from "./pages/Detail.jsx";
import ProfileForCreate from "./pages/ProfileForCreate.jsx";

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
				path: "/FindID",
				element: <FindID />,
			},
			{
				path: "/FindPassword",
				element: <FindPassword />,
			},
			{
				path: "/main",
				element: <Main />,
			},
			{
				path: "/user/profiles",
				element: <Profile />,
			},
			{
				path: "/profilesForEdit",
				element: <ProfilesForEdit />,
			},
			{
				path: "/userTving",
				element: <UserTving />,
			},
			{
				path: "/user/profile",
				element: <ProfileForCreate />,
			},
			{
				path: "/user/profileForEdit",
				element: <ProfileForEditDetail />,
			},
			{
				path: `/main/detail/:id`,
				element: <Detail />,
			},
		],
	},
]);

export default router;
