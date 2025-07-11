import React from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/utils/cn";
import Sidebar from "@/components/organisms/Sidebar";

const Layout = ({ className }) => {
  return (
    <div className={cn("flex h-screen bg-gradient-to-br from-gray-50 to-blue-50", className)}>
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;