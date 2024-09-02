import { firebaseAuth } from "@/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";

import type { User } from "firebase/auth";

export interface UserState {
  user: User | null;
  loading: boolean;
}

export const useAuthState = (): UserState => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setLoading(false);
      setUser(user);
    });
    return unsubscribe;
  }, [firebaseAuth]);

  return { user, loading };
};
