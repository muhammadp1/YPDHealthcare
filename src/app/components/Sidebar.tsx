import { NavLink } from "react-router";
import { LayoutDashboard, Package, Users, Layers, Building2, Tag  } from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/products", label: "Products", icon: Package },
 
  { path: "/platforms", label: "Platforms", icon: Layers },
  { path: "/pharmacies", label: "Pharmacies", icon: Building2 },
  { path: "/categories", label: "Categories", icon: Tag  },
   { path: "/users", label: "Users", icon: Users },
];

export function Sidebar() {
  return (
    <aside className="w-60 bg-[#1e3a5f] text-white fixed left-0 top-0 h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl">Admin Dashboard</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
