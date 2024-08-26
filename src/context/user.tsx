import { useAuthState } from "@/hooks/useAuthState.ts";

import type { User } from "firebase/auth";

export const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthState();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
