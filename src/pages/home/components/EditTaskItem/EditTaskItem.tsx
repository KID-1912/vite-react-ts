import styles from "./edit-task-item.module.scss";
import { UserContext } from "@/context/user.tsx";
import { setTaskDoc } from "@/api/tasks/tasks.ts";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { InputRef } from "antd/es/input";
import type { Dayjs } from "dayjs";

type Props = {
  task: Task;
  className?: string;
  onEditTaskSuccess?: () => void | Promise<void>;
  onCancel: () => void;
};

export default function EditTaskForm(props: Props) {
  const { user } = useContext(UserContext);
  const { task, onEditTaskSuccess, onCancel } = props;

  // 自动聚焦
  const autofocusRef = useRef<InputRef>(null);
  useEffect(() => {
    autofocusRef.current!.focus();
  }, []);

  // 编辑任务
  const [loading, setLoading] = useState(false);
  const [scheduledAtDate, setScheduledAtDate] = useState<Dayjs | null>(
    task.scheduledAt ? dayjs(task.scheduledAt) : null,
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const handleFinish = async (values: Task) => {
    const editTask: Task = {
      ...task,
      name: values.name,
      description: values.description,
      scheduledAt: scheduledAtDate ? scheduledAtDate.toDate() : scheduledAtDate,
    };
    const taskGroup: InboxType = { __type: "inbox", name: "__inbox__" };
    try {
      setLoading(true);
      await setTaskDoc({ task: editTask, taskGroup, userId: user!.uid });
      message.success("编辑成功");
      onEditTaskSuccess?.();
    } catch (error) {
      console.error(error);
      message.error("操作失败");
    }
    setLoading(false);
    onCancel();
  };

  const handleFormValueChange = (_: unknown, values: Task) => {
    setIsSubmitDisabled(!values.name.trim());
  };

  return (
    <div className={`${styles["edit-task-form"]} ${props.className}`}>
      <Form
        initialValues={{ name: task.name, description: task.description }}
        onFinish={handleFinish}
        onValuesChange={handleFormValueChange}
      >
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
                保存
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
