import { useAuthState } from "@/hooks/useAuthState.ts";

import type { UserState } from "@/hooks/useAuthState.ts";

export const UserContext = createContext<UserState>({ user: null, loading: true });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthState();
  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
};
