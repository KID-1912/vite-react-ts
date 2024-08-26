import Router from "@/router/index.tsx";
import { UserProvider } from "@/context/user.tsx";

export default function App() {
  return (
    <UserProvider>
      <Router></Router>
    </UserProvider>
  );
}
