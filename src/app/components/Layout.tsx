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

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-60">
        <Header title={title} />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
