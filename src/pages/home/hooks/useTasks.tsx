import type { Task } from "@/types/index.d.ts";

export const useTasks = () => {
  /* 任务列表 */
  const [taskList, setTaskList] = useState<Task[]>([
    {
      __type: "task",
      id: "123",
      userId: "123456",
      createdAt: new Date(),
      done: false,
      name: "任务实例",
      scheduledAt: null,
    },
  ]);

  return taskList;
};
