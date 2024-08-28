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
      description: "任务描述",
      scheduledAt: null,
    },
  ]);

  return taskList;
};
