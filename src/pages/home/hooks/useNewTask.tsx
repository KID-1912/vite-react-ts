import { UserContext } from "@/context/user.tsx";
import { addTaskDoc } from "@/api/tasks/tasks.ts";

const useNewTask = () => {
  const user = useContext(UserContext);
  const [task, setTask] = useState<NewTask>({
    __type: "task",
    userId: user!.uid,
    done: false,
    name: "新增任务",
    description: "",
  });

  return { task, setTask };
};
