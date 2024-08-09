// import { createBrowserRouter } from "react-router-dom";
// import RootLayout from "./pages/RootLayout.jsx";
// import SignIn from "./pages/SignIn.jsx";
// import SignUp from "./pages/SignUp.jsx";
// import Main from "./pages/Main.jsx";
// import FindID from "./pages/FindID.jsx";
// import OnBoarding from "./pages/OnBoarding.jsx";
// import Profile from "./pages/Profile.jsx";
// import ProfilesForEdit from "./pages/ProfilesForEdit.jsx";
// import UserTving from "./pages/UserTving.jsx";
// import ProfileForEditDetail from "./pages/ProfileForEditDetail.jsx";
// import FindPassword from "./pages/FindPassword.jsx";
// import Detail from "./pages/Detail.jsx";
// import ProfileForCreate from "./pages/ProfileForCreate.jsx";
// import MyDetail from "./pages/MyDetail.jsx";
// // import DetailCopy from "./pages/DetailCopy.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       {
//         path: "/",
//         element: <OnBoarding />,
//       },
//       {
//         path: "/signin",
//         element: <SignIn />,
//       },
//       {
//         path: "/signup",
//         element: <SignUp />,
//       },
//       {
//         path: "/FindID",
//         element: <FindID />,
//       },
//       {
//         path: "/FindPassword",
//         element: <FindPassword />,
//       },
//       {
//         path: "/main",
//         element: <Main />,
//       },
//       {
//         path: "/user/profiles",
//         element: <Profile />,
//       },
//       {
//         path: "/profilesForEdit",
//         element: <ProfilesForEdit />,
//       },
//       {
//         path: "/userTving",
//         element: <UserTving />,
//       },
//       {
//         path: "/user/profile",
//         element: <ProfileForCreate />,
//       },
//       {
//         path: "/user/profileForEdit",
//         element: <ProfileForEditDetail />,
//       },
//       {
//         path: `/main/detail/:id`,
//         element: <Detail />,
//       },
//       {
//         path: `/main/my`,
//         element: <MyDetail />,
//       },
//       // {
//       //   path: `/main/detail/:id`,
//       //   element: <DetailCopy />,
//       // },
//     ],
//   },
// ]);

// export default router;

import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import RootLayout from "./pages/RootLayout.jsx";

// 동적 import를 통한 코드 스플리팅
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const Main = lazy(() => import("./pages/Main.jsx"));
const FindID = lazy(() => import("./pages/FindID.jsx"));
const OnBoarding = lazy(() => import("./pages/OnBoarding.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const ProfilesForEdit = lazy(() => import("./pages/ProfilesForEdit.jsx"));
const UserTving = lazy(() => import("./pages/UserTving.jsx"));
const ProfileForEditDetail = lazy(() =>
  import("./pages/ProfileForEditDetail.jsx")
);
const FindPassword = lazy(() => import("./pages/FindPassword.jsx"));
const Detail = lazy(() => import("./pages/Detail.jsx"));
const ProfileForCreate = lazy(() => import("./pages/ProfileForCreate.jsx"));
const MyDetail = lazy(() => import("./pages/MyDetail.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <OnBoarding />
          </Suspense>
        ),
      },
      {
        path: "/signin",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/FindID",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FindID />
          </Suspense>
        ),
      },
      {
        path: "/FindPassword",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FindPassword />
          </Suspense>
        ),
      },
      {
        path: "/main",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: "/user/profiles",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/profilesForEdit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProfilesForEdit />
          </Suspense>
        ),
      },
      {
        path: "/userTving",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserTving />
          </Suspense>
        ),
      },
      {
        path: "/user/profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProfileForCreate />
          </Suspense>
        ),
      },
      {
        path: "/user/profileForEdit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProfileForEditDetail />
          </Suspense>
        ),
      },
      {
        path: `/main/detail/:id`,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Detail />
          </Suspense>
        ),
      },
      {
        path: `/main/my`,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MyDetail />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
