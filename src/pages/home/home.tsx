import { Layout } from "antd";
import LayoutIndex from "@/layouts/layout.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import TaskItem from "./components/TaskItem/TaskItem.tsx";
import AddTaskItem from "./components/AddTaskItem/AddTaskItem.tsx";
import { UserContext } from "@/context/user.tsx";
import { deleteTaskDoc } from "@/api/tasks/tasks.ts";
import { useTasks } from "./hooks/useTasks.tsx";

export default function Home() {
  const user = useContext(UserContext);

  // taskGroup类别
  const defaultTaskGroup = useRef<TaskGroup>({ __type: "inbox", name: "__inbox__" });
  const [activatedTaskGroup, setActivatedTaskGroup] = useState<TaskGroup>(defaultTaskGroup.current);
  // 任务列表
  const { taskList, getTaskList } = useTasks(activatedTaskGroup);
  // 当前操作task
  const currentTask = useRef<Task | null>(null);

  // 删除任务
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
  // 删除任务
  const openDeleteTaskModal = (task: Task) => {
    currentTask.current = task;
    setDeleteTaskModalOpen(true);
  };
  const handleDeleteTask = async () => {
    setDeleteLoading(true);
    try {
      const params = {
        task: currentTask.current as Task,
        taskGroup: activatedTaskGroup,
        userId: user!.uid,
      };
      await deleteTaskDoc(params);
      getTaskList();
    } catch (error) {
      console.warn(error);
      message.error("操作失败，请稍后再试");
    }
    setDeleteLoading(false);
    setDeleteTaskModalOpen(false);
  };
  return (
    <>
      <LayoutIndex>
        <Sidebar />
        <Layout.Content className="p-30px bg-white">
          <div className="text-26px">收件箱</div>
          <div className="mt-24px">
            {taskList.map((task) => (
              <TaskItem task={task} key={task.id} onDeleteTask={() => openDeleteTaskModal(task)} />
            ))}
            <AddTaskItem className="mt-24px" onAddTaskSuccess={getTaskList}></AddTaskItem>
          </div>
        </Layout.Content>
      </LayoutIndex>
      <Modal
        open={deleteTaskModalOpen}
        onOk={handleDeleteTask}
        confirmLoading={deleteLoading}
        onCancel={() => setDeleteTaskModalOpen(false)}
        maskClosable={false}
        okText="删除"
        cancelText="取消"
      >
        <p className="py-12px">你确定要删除任务？</p>
      </Modal>
    </>
  );
}
