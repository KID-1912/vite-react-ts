import { firebaseAuth } from "@/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";

import type { User } from "firebase/auth";

export const useAuthState = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [firebaseAuth]);

  return user;
};
