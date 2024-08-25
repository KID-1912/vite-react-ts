import LayoutIndex from "@/layouts/layout.tsx";
import TaskItem from "./components/TaskItem/TaskItem.tsx";
import AddTaskItem from "./components/AddTaskItem/AddTaskItem.tsx";

import { useTasks } from "./hooks/useTasks.tsx";

export default function Home() {
  const taskList = useTasks();
  return (
    <LayoutIndex>
      <div className="p-30px">
        <div className="text-26px">收件箱</div>
        <div className="mt-24px">
          {taskList.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
          <AddTaskItem className="mt-24px"></AddTaskItem>
        </div>
      </div>
    </LayoutIndex>
  );
}
