import { getFirestore } from "firebase/firestore";

import type { Firestore } from "firebase/firestore";

export const db = getFirestore();

export const FirestoreContext = createContext<Firestore>(db);

export function FirestoreProvider({ children }: { children: React.ReactNode }) {
  return <FirestoreContext.Provider value={db}>{children}</FirestoreContext.Provider>;
}
