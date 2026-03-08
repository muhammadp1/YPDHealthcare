import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProductsPage } from "./pages/ProductsPage";
import { UsersPage } from "./pages/UsersPage";
import { PlatformsPage } from "./pages/PlatformsPage";
import { PharmaciesPage } from "./pages/PharmaciesPage";
import { CategoriesPage } from "./pages/CategoriesPage";


export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: DashboardPage },
      { path: "products", Component: ProductsPage },
      { path: "users", Component: UsersPage },
      { path: "platforms", Component: PlatformsPage },
      { path: "pharmacies", Component: PharmaciesPage },
      { path: "categories", Component: CategoriesPage },

    ],
  },
]);