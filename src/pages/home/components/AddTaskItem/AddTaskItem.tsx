import styles from "./add-task-item.module.scss";
import { UserContext } from "@/context/user.tsx";
import { addTaskDoc } from "@/api/tasks/tasks.ts";

type Props = {
  className?: string;
};

function AddTaskForm() {
  return (
    <div className={styles["add-task-form"]}>
      <Form>
        <Form.Item name="name" className="mb-0">
          {/* variant="borderless" */}
          <Input placeholder="任务名称"></Input>
        </Form.Item>
        <Form.Item name="description" className="mb-0">
          <Input placeholder="描述"></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加任务
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default function AddTaskItem({ className }: Props) {
  const user = useContext(UserContext);
  const [task, setTask] = useState<NewTask>({
    __type: "task",
    userId: user!.uid,
    done: false,
    name: "新增的任务",
  });

  // 创建任务
  const handleAddTask = async () => {
    // try {
    //   setTask({ ...task });
    //   const taskGroup: InboxType = { __type: "inbox", name: "__inbox__" };
    //   await addTaskDoc({ task, taskGroup, userId: user!.uid });
    //   message.success("任务已添加");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      <div className={`${styles["add-task-item"]} ${className}`} onClick={handleAddTask}>
        <AntdPlusOutlined className={styles["plus-outline"]} />
        <AntdPlusCircleFilled className={styles["plus-circle-filled"]} />
        <div className="ml-4px">添加任务</div>
      </div>
      <AddTaskForm />
    </>
  );
}
