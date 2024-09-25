import { PROJECT_COLOR } from "@/constants/PROJECT_COLOR";
import styles from "..//AddProjectModal/add-project-modal.module.scss";
import { UserContext } from "@/context/user.tsx";
import { editProjectDoc } from "@/api/projects/projects.ts";
import ColorLabel from "../AddProjectModal/ColorLabel";

type Props = {
  open: boolean;
  setOpen: (arg: boolean) => void;
  project: Project;
  onEditedProject: (project: Project) => void;
};

export default function EditProjectModal(props: Props) {
  const { user } = useContext(UserContext);
  const { message } = App.useApp();

  const { open, setOpen, project, onEditedProject } = props;
  const initialFormValues = { name: project.name, color: project.color };
  useEffect(() => {
    form.resetFields();
  }, [open]);

  type editProjectFieldType = { name: string; color: string };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const values: editProjectFieldType = form.getFieldsValue();
    const editProject: Project = {
      ...project,
      userId: user!.uid,
      name: values.name,
      color: values.color,
    };
    setLoading(true);
    try {
      await editProjectDoc({ project: editProject, userId: user!.uid });
      onEditedProject(editProject);
      setOpen(false);
    } catch (error) {
      console.log(error);
      message.error("操作失败");
    }
    setLoading(false);
  };

  const [isOkBtnDisabled, setIsOkBtnDisabled] = useState(true);
  const handleFormValueChange = (_: unknown, values: editProjectFieldType) => {
    setIsOkBtnDisabled(!values.name.trim());
  };

  return (
    <Modal
      open={open}
      title="编辑项目"
      onCancel={() => setOpen(false)}
      width={480}
      className="px-12px"
      maskClosable={false}
      okText="保存"
      okButtonProps={{ loading, disabled: isOkBtnDisabled }}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        initialValues={initialFormValues}
        onValuesChange={handleFormValueChange}
        layout="vertical"
        className="py-12px"
      >
        <Form.Item name="name" label="名称">
          <Input placeholder="输入项目名称"></Input>
        </Form.Item>
        <Form.Item name="color" label="颜色">
          <Select
            className={styles["select-color-label"]}
            options={PROJECT_COLOR.map((item) => ({
              className: styles["select-color-label"],
              label: <ColorLabel name={item.name} color={item.color} />,
              value: item.color,
            }))}
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
