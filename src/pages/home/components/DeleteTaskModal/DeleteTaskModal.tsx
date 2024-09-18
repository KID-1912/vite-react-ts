import { UserContext } from "@/context/user.tsx";
import { deleteTaskDoc } from "@/api/tasks/tasks.ts";

type Props = {
  open: boolean;
  setOpen: (arg: boolean) => void;
  task: Task;
  taskGroup: TaskGroup;
  onDeletedTask: () => void;
};

export default function DeleteTaskModal(props: Props) {
  const { user } = useContext(UserContext);
  const { message } = App.useApp();
  const { open, setOpen, task, taskGroup, onDeletedTask } = props;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDeleteTask = async () => {
    setDeleteLoading(true);
    try {
      const params = {
        task,
        taskGroup,
        userId: user!.uid,
      };
      await deleteTaskDoc(params);
      onDeletedTask();
    } catch (error) {
      console.warn(error);
      message.error("操作失败，请稍后再试");
    }
    setDeleteLoading(false);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onOk={handleDeleteTask}
      confirmLoading={deleteLoading}
      onCancel={() => setOpen(false)}
      maskClosable={false}
      title="删除任务？"
      okText="删除"
    >
      {task && (
        <p className="py-12px">
          <span className="text-[var(--ant-color-primary)]">【{task.name}】</span>
          任务将会被永久删除。
        </p>
      )}
    </Modal>
  );
}
