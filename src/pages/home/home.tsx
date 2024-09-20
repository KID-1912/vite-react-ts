import { Layout, Skeleton, Dropdown, type MenuProps } from "antd";
import LayoutIndex from "@/layouts/layout.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import TaskItem from "./components/TaskItem/TaskItem.tsx";
import AddTaskItem from "./components/AddTaskItem/AddTaskItem.tsx";
import DeleteTaskModal from "./components/DeleteTaskModal/DeleteTaskModal.tsx";
import DeleteProjectModal from "./components/DeleteProjectModal/DeleteProjectModal.tsx";
import EditTaskItem from "./components/EditTaskItem/EditTaskItem.tsx";
import EditProjectModal from "./components/EditProjectModal/EditProjectModal.tsx";
import styles from "./home.module.scss";
import { UserContext } from "@/context/user.tsx";
import { ProjectListContext } from "@/context/project.tsx";
import { doneTaskDoc } from "@/api/tasks/tasks.ts";
import { useTasks } from "./hooks/useTasks.tsx";
import { INBOX, TODAY_FILTER, TASK_GROUP_NAME_MAP } from "@/constants/TASK_GROUP.ts";
import emitter from "@/utils/emitter.ts";

export default function Home() {
  const { user } = useContext(UserContext);
  const { message, notification } = App.useApp();

  // taskGroup类别
  const defaultTaskGroup: TaskGroup = INBOX;
  const [activatedTaskGroup, setActivatedTaskGroup] = useState<TaskGroup>(defaultTaskGroup);
  const activatedTaskGroupTitle = useMemo(() => {
    if (activatedTaskGroup.__type === "project") {
      return activatedTaskGroup.name;
    } else {
      return TASK_GROUP_NAME_MAP.get(activatedTaskGroup.name);
    }
  }, [activatedTaskGroup]);

  // 当前操作task
  const currentTask = useRef<Task | null>(null);

  // 新增任务
  const onAddTaskModalSuccess = (data: { newTask: NewTask; taskGroup: TaskGroup }) => {
    const { taskGroup } = data;
    if (activatedTaskGroup === taskGroup) {
      getTaskList();
    } else {
      setActivatedTaskGroup(taskGroup);
    }
  };
  emitter.on("addTaskModal:addTaskSuccess", onAddTaskModalSuccess);

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
      notification.success({
        placement: "bottomLeft",
        message: "1个任务已完成",
        style: { width: "240px" },
      });
      getTaskList();
    } catch (error) {
      console.warn(error);
      message.error("操作失败，请稍后重试");
    }
  };

  // 删除任务
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
  const openDeleteTaskModal = (task: Task) => {
    currentTask.current = task;
    setDeleteTaskModalOpen(true);
  };

  // 任务列表
  const { taskList, getTaskList, loading } = useTasks(activatedTaskGroup);
  const TaskList = taskList.map((task) => {
    if (isEditTask === true && task === currentTask.current) {
      return (
        <EditTaskItem
          task={task}
          key={task.id}
          taskGroup={activatedTaskGroup}
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

  // 项目操作
  const { getProjectList } = useContext(ProjectListContext);
  const projectOperateItem: MenuProps["items"] = [
    {
      key: "edit",
      label: (
        <div className="flex items-center">
          <AntdEditOutlined className="mr-4px"></AntdEditOutlined>编辑项目
        </div>
      ),
    },
    {
      key: "delete",
      label: (
        <div className="flex items-center">
          <AntdDeleteOutlined className="mr-4px"></AntdDeleteOutlined>删除项目
        </div>
      ),
    },
  ];
  const onClickDropdownItem: MenuProps["onClick"] = (menuItem) => {
    if (menuItem.key === "delete") setDeleteProjectModalOpen(true);
    if (menuItem.key === "edit") setEditProjectModalOpen(true);
  };

  // 删除项目弹窗
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
  const onDeletedProject = () => {
    setActivatedTaskGroup(TODAY_FILTER);
    getProjectList();
  };

  // 编辑项目弹窗
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);

  return (
    <>
      <LayoutIndex>
        <Sidebar
          activatedTaskGroup={activatedTaskGroup}
          taskList={taskList}
          onActivateTaskGroup={setActivatedTaskGroup}
        />
        <Layout.Content className={styles["home-content"]}>
          <div className="header">
            {activatedTaskGroupTitle}
            {activatedTaskGroup.__type === "project" && (
              <Dropdown
                menu={{ items: projectOperateItem, onClick: onClickDropdownItem }}
                placement="bottomRight"
              >
                <AntdEllipsisOutlined className="icon-more" />
              </Dropdown>
            )}
          </div>
          <div className="mt-24px">
            {loading ? <Skeleton active /> : TaskList}
            <AddTaskItem
              className="mt-24px"
              taskGroup={activatedTaskGroup}
              onAddTaskSuccess={getTaskList}
            ></AddTaskItem>
          </div>
        </Layout.Content>
      </LayoutIndex>
      <DeleteTaskModal
        open={deleteTaskModalOpen}
        setOpen={setDeleteTaskModalOpen}
        task={currentTask.current!}
        taskGroup={activatedTaskGroup}
        onDeletedTask={getTaskList}
      />
      <DeleteProjectModal
        open={deleteProjectModalOpen}
        setOpen={setDeleteProjectModalOpen}
        project={activatedTaskGroup as Project}
        onDeletedProject={onDeletedProject}
      />
      <EditProjectModal
        open={editProjectModalOpen}
        setOpen={setEditProjectModalOpen}
        project={activatedTaskGroup as Project}
        onEditedProject={getProjectList}
      />
    </>
  );
}
