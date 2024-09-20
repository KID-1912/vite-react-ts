import type { InputRef } from "antd/es/input";
import { UserContext } from "@/context/user.tsx";
import { addTaskDoc } from "@/api/tasks/tasks.ts";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import emitter from "@/utils/emitter.ts";
import styles from "./add-task-modal.module.scss";

type Props = {
  open: boolean;
  taskGroup: TaskGroup;
  setOpen: (arg: boolean) => void;
  onAddTaskSuccess?: () => void | Promise<void>;
};

const AddTaskModal: React.FC<Props> = (props) => {
  const { message } = App.useApp();
  const { user } = useContext(UserContext);
  const { open, setOpen, taskGroup } = props;

  // 自动聚集
  const autofocusRef = useRef<InputRef>(null);
  useEffect(() => {
    open && autofocusRef.current!.focus();
  }, [open]);

  // 新增任务
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  type AddTaskFieldType = Pick<NewTask, "name" | "description">;
  const defaultFormValues: AddTaskFieldType = { name: "", description: "" };
  const [scheduledAtDate, setScheduledAtDate] = useState<Dayjs | null>(null);
  const handleAddTask = async () => {
    const values: AddTaskFieldType = form.getFieldsValue();
    const newTask: NewTask = {
      __type: "task",
      userId: user!.uid,
      done: false,
      name: values.name,
      description: values.description,
      scheduledAt: scheduledAtDate ? scheduledAtDate.toDate() : scheduledAtDate,
    };
    try {
      setConfirmLoading(true);
      await addTaskDoc({ task: newTask, taskGroup, userId: user!.uid });
      message.success("任务已添加");
      emitter.emit("addTaskModal:addTaskSuccess", { newTask, taskGroup });
      setOpen(false);
    } catch (error) {
      console.error(error);
      message.error("操作失败");
    }
    setConfirmLoading(false);
  };

  // Modal页脚
  const [isOkBtnDisabled, setIsOkBtnDisabled] = useState(true);
  const handleFormValueChange = (_: unknown, values: AddTaskFieldType) => {
    setIsOkBtnDisabled(!values.name.trim());
  };
  const Footer = (
    _: React.ReactNode,
    { OkBtn, CancelBtn }: { OkBtn: React.FC; CancelBtn: React.FC },
  ) => (
    <div className="flex justify-between">
      <DatePicker
        value={scheduledAtDate}
        placeholder="截止日期"
        size="small"
        className="w-120px"
        onChange={(date: Dayjs | null) => setScheduledAtDate(date)}
      />
      <div className="flex">
        <CancelBtn />
        <div className="ml-12px">
          <OkBtn />
        </div>
      </div>
    </div>
  );

  // 重置表单
  const handleResetForm = () => {
    form.resetFields();
    setScheduledAtDate(null);
  };

  return (
    <Modal
      open={open}
      maskClosable={false}
      okText="添加任务"
      confirmLoading={confirmLoading}
      okButtonProps={{ disabled: isOkBtnDisabled }}
      onCancel={() => setOpen(false)}
      afterClose={handleResetForm}
      onOk={handleAddTask}
      footer={Footer}
    >
      <Form
        form={form}
        initialValues={defaultFormValues}
        onValuesChange={handleFormValueChange}
        className={styles["add-task-form"]}
        clearOnDestroy
      >
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
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
