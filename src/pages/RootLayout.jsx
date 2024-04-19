import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="font-noto">
      <Outlet />
    </div>
  );
}

export default RootLayout;
