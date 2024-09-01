import { getTaskDocsByGroup } from "@/api/tasks/tasks.ts";
import { UserContext } from "@/context/user.tsx";

export const useTasks = (taskGroup: TaskGroup) => {
  const user = useContext(UserContext);
  /* 任务列表 */
  const [taskList, setTaskList] = useState<Task[]>([]);

  let isMounted: boolean;
  const getTaskList = async () => {
    try {
      const taskList: Task[] = await getTaskDocsByGroup({ taskGroup, userId: user!.uid });
      if (isMounted === false) return;
      setTaskList(taskList);
    } catch (error) {
      if (isMounted === false) return;
      console.warn(error);
      message.error("列表数据失败，请稍后重试");
    }
  };

  useEffect(() => {
    isMounted = true;
    getTaskList();
    return () => {
      isMounted = false;
    };
  }, [taskGroup.__type, taskGroup.name]);

  return { taskList, getTaskList };
};
