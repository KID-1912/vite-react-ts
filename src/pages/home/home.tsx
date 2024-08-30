import { Layout } from "antd";
import LayoutIndex from "@/layouts/layout.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import TaskItem from "./components/TaskItem/TaskItem.tsx";
import AddTaskItem from "./components/AddTaskItem/AddTaskItem.tsx";

import { useTasks } from "./hooks/useTasks.tsx";

export default function Home() {
  // taskGroup类别
  const defaultTaskGroup = useRef<TaskGroup>({ __type: "inbox", name: "__inbox__" });
  const [activatedTaskGroup, setActivatedTaskGroup] = useState<TaskGroup>(defaultTaskGroup.current);
  const taskList = useTasks(activatedTaskGroup);
  return (
    <LayoutIndex>
      <Sidebar />
      <Layout.Content className="p-30px bg-white">
        <div className="text-26px">收件箱</div>
        <div className="mt-24px">
          {taskList.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
          <AddTaskItem className="mt-24px"></AddTaskItem>
        </div>
      </Layout.Content>
    </LayoutIndex>
  );
}
