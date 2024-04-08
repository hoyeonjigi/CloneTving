import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="font-noto max-w-[1920px]">
      <Outlet />
    </div>
  );
}

export default RootLayout;
