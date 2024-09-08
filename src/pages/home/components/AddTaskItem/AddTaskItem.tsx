import styles from "./add-task-item.module.scss";
import { UserContext } from "@/context/user.tsx";
import { addTaskDoc } from "@/api/tasks/tasks.ts";
import { DatePicker } from "antd";
import type { InputRef } from "antd/es/input";
import type { Dayjs } from "dayjs";

type Props = {
  className?: string;
  onAddTaskSuccess?: () => void | Promise<void>;
};

function AddTaskForm(
  props: Pick<Props, "className" | "onAddTaskSuccess"> & { onCancel: () => void },
) {
  const { user } = useContext(UserContext);
  const { onAddTaskSuccess, onCancel } = props;

  // 自动聚焦
  const autofocusRef = useRef<InputRef>(null);
  useEffect(() => {
    autofocusRef.current!.focus();
  }, []);

  // 创建任务
  const [loading, setLoading] = useState(false);
  type AddTaskFieldType = Pick<NewTask, "name" | "description">;
  const [scheduledAtDate, setScheduledAtDate] = useState<Dayjs | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const handleFinish = async (values: AddTaskFieldType) => {
    const newTask: NewTask = {
      __type: "task",
      userId: user!.uid,
      done: false,
      name: values.name,
      description: values.description,
      scheduledAt: scheduledAtDate ? scheduledAtDate.toDate() : scheduledAtDate,
    };
    const taskGroup: InboxType = { __type: "inbox", name: "__inbox__" };
    try {
      setLoading(true);
      await addTaskDoc({ task: newTask, taskGroup, userId: user!.uid });
      message.success("任务已添加");
      onAddTaskSuccess?.();
    } catch (error) {
      console.error(error);
      message.error("操作失败");
    }
    setLoading(false);
    onCancel();
  };

  const handleFormValueChange = (_: unknown, values: AddTaskFieldType) => {
    setIsSubmitDisabled(!values.name.trim());
  };

  return (
    <div className={`${styles["add-task-form"]} ${props.className}`}>
      <Form onFinish={handleFinish} onValuesChange={handleFormValueChange}>
        <div className="p-6px">
          <Form.Item name="name">
            <Input
              placeholder="任务名称"
              variant="borderless"
              ref={autofocusRef}
              className="font-bold"
            ></Input>
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="描述" variant="borderless"></Input>
          </Form.Item>
        </div>
        <Form.Item name="scheduledAtDate">
          <div className={styles["footer"]}>
            <DatePicker
              value={scheduledAtDate}
              placeholder="截止日期"
              size="small"
              className="w-120px"
              onChange={(date: Dayjs | null) => setScheduledAtDate(date)}
            />
            <div>
              <Button type="text" className="mr-6px" disabled={loading} onClick={onCancel}>
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={isSubmitDisabled}
              >
                添加任务
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default function AddTaskItem(props: Props) {
  const [isFormMode, setIsFormMode] = useState(false);
  if (isFormMode) {
    return (
      <AddTaskForm
        className={props.className}
        onAddTaskSuccess={props.onAddTaskSuccess}
        onCancel={() => setIsFormMode(false)}
      />
    );
  } else {
    return (
      <div className={`${styles["add-task-item"]} ${props.className}`}>
        <AntdPlusOutlined className={styles["icon-plus-outline"]} />
        <AntdPlusCircleFilled className={styles["icon-plus-circle-filled"]} />
        <div className="ml-4px" onClick={() => setIsFormMode(true)}>
          添加任务
        </div>
      </div>
    );
  }
}
