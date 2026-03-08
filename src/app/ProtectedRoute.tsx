import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode; // ✅ use ReactNode instead of JSX.Element
  token: string | null;
}

export function ProtectedRoute({ children, token }: ProtectedRouteProps) {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}