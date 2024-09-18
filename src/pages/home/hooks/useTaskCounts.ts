import { getTaskDocsCountByGroup } from "@/api/tasks/tasks.ts";
import { UserContext } from "@/context/user.tsx";
import { INBOX, TODAY_FILTER, RECENT_FILTER } from "@/constants/TASK_GROUP.ts";

export const useTaskCounts = (taskList: Task[], projectList: Project[]) => {
  const { user } = useContext(UserContext);
  const [taskCounts, setTaskCounts] = useState<{ [key: string]: number }>({});

  const getTaskCounts = useCallback(async () => {
    const allTaskGroup = [INBOX, TODAY_FILTER, RECENT_FILTER, ...projectList];
    const counts: typeof taskCounts = {};
    const requests: Promise<void>[] = allTaskGroup.map(async (taskGroup) => {
      const count = await getTaskDocsCountByGroup({ taskGroup, userId: user!.uid });
      counts[taskGroup.name] = count;
    });
    await Promise.allSettled(requests);
    setTaskCounts(counts);
  }, [projectList, user!.uid]);

  useEffect(() => {
    getTaskCounts();
  }, [taskList, projectList]);

  return { taskCounts };
};
