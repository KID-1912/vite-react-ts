import { UserContext } from "@/context/user.tsx";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useContext(UserContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
