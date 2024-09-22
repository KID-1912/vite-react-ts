import { UserContext } from "@/context/user.tsx";
import LoadingLayer from "@/components/base/LoadingLayer.tsx";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useContext(UserContext);
  if (loading) return <LoadingLayer />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
