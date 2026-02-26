import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (    <div className="flex min-h-screen bg-bgMain">
      <Sidebar />
      <div className="flex-1 px-16 py-12">
        <Outlet />
      </div>
    </div>
  );
}