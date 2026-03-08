import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/products": "Products",
  "/users": "Users",
  "/platforms": "Platforms",
  "/pharmacies": "Pharmacies",
};

export function Layout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Admin Dashboard";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-60">
        <Header title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}