import Router from "@/router/index.tsx";
import { UserProvider } from "@/context/user.tsx";
import { ProjectListProvider } from "@/context/project.tsx";

export default function App() {
  return (
    <UserProvider>
      <ProjectListProvider>
        <Router></Router>
      </ProjectListProvider>
    </UserProvider>
  );
}
