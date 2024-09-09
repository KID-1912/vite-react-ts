import { Layout, Skeleton } from "antd";
import LayoutIndex from "@/layouts/layout.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import TaskItem from "./components/TaskItem/TaskItem.tsx";
import AddTaskItem from "./components/AddTaskItem/AddTaskItem.tsx";
import EditTaskItem from "./components/EditTaskItem/EditTaskItem.tsx";
import { UserContext } from "@/context/user.tsx";
import { deleteTaskDoc, doneTaskDoc } from "@/api/tasks/tasks.ts";
import { useTasks } from "./hooks/useTasks.tsx";
import { INBOX } from "@/constants/TASK_GROUP.ts";

export default function Home() {
  const { user } = useContext(UserContext);

  // taskGroup类别
  const defaultTaskGroup: TaskGroup = INBOX;
  const [activatedTaskGroup, setActivatedTaskGroup] = useState<TaskGroup>(defaultTaskGroup);

  // 任务列表
  const { taskList, getTaskList, loading } = useTasks(activatedTaskGroup);
  // 当前操作task
  const currentTask = useRef<Task | null>(null);

  // 删除任务
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
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

  // 编辑任务
  const [isEditTask, setIsEditTask] = useState(false);
  const onEditTask = (task: Task) => {
    if (isEditTask) {
      setIsEditTask(false);
      return;
    }
    setIsEditTask(true);
    currentTask.current = task;
  };

  // 完成任务
  const handleDoneTask = async (task: Task) => {
    const params = {
      task: task,
      taskGroup: activatedTaskGroup,
      userId: user!.uid,
    };
    try {
      await doneTaskDoc(params);
      getTaskList();
    } catch (error) {
      console.warn(error);
      message.error("操作失败，请稍后重试");
    }
  };

  const TaskList = taskList.map((task) => {
    if (isEditTask === true && task === currentTask.current) {
      return (
        <EditTaskItem
          task={task}
          key={task.id}
          onEditTaskSuccess={getTaskList}
          onCancel={() => setIsEditTask(false)}
        />
      );
    }
    return (
      <TaskItem
        task={task}
        key={task.id}
        onEditTask={() => onEditTask(task)}
        onDeleteTask={() => openDeleteTaskModal(task)}
        onCheckTask={() => handleDoneTask(task)}
      />
    );
  });

  return (
    <>
      <LayoutIndex>
        <Sidebar
          activatedTaskGroup={activatedTaskGroup}
          onActivateTaskGroup={setActivatedTaskGroup}
        />
        <Layout.Content className="p-30px bg-white ml-200px min-h-full">
          <div className="text-26px">收件箱</div>
          <div className="mt-24px">
            {loading ? <Skeleton active /> : TaskList}
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
        {currentTask.current && (
          <p className="py-12px">
            你确定要删除
            <span className="text-[var(--ant-color-primary)]">【{currentTask.current!.name}】</span>
            ？
          </p>
        )}
      </Modal>
    </>
  );
}
