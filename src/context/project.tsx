import { getProjectDoc } from "@/api/projects/projects.ts";
import { UserContext } from "@/context/user.tsx";

type ProjectListContext = {
  projectList: Project[];
  getProjectList: () => Promise<void>;
};

export const ProjectListContext = createContext<ProjectListContext>({
  projectList: [],
  getProjectList: async () => {},
});

export const ProjectListProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useContext(UserContext);
  const [projectList, setProjectList] = useState<Project[]>([]);

  const isMounted = useRef(true);
  const getProjectList = async () => {
    try {
      const projectList: Project[] = await getProjectDoc({ userId: user!.uid });
      if (isMounted.current === false) return;
      setProjectList(projectList);
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    isMounted.current = true;
    if (loading === true) return;
    getProjectList();
    return () => {
      isMounted.current = false;
    };
  }, [loading]);

  return (
    <ProjectListContext.Provider value={{ projectList, getProjectList }}>
      {children}
    </ProjectListContext.Provider>
  );
};
