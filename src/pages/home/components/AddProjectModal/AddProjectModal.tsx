import { PROJECT_COLOR } from "@/constants/PROJECT_COLOR";
import styles from "./add-project-modal.module.scss";
import { UserContext } from "@/context/user.tsx";
import {addProjectDoc} from "@/api/projects/project.ts";

const ColorLabel = (props: { name: string; color: string }) => {
  return (
    <div className="flex items-center">
      <div className="icon-circle mr-12px" style={{ backgroundColor: props.color }}></div>
      {props.name}
    </div>
  );
};

type Props = {
  open: boolean;
  setOpen: (arg: boolean) => void;
  onAddedProject: () => void;
};

export default function AddProjectModal(props: Props) {
  const { user } = useContext(UserContext);
  const { message } = App.useApp();

  const { open, setOpen, onAddedProject } = props;
  const defaultFormValues = { name: "", color: PROJECT_COLOR[0].color };

  type AddProjectFieldType = { name: string; color: string };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const values: AddProjectFieldType = form.getFieldsValue();
    const newProject: NewProject = {
      __type: "project",
      userId: user!.uid,
      name: values.name,
      color: values.color,
    }
    setLoading(true);
    try {
      await addProjectDoc({project: newProject, userId: user!.uid});
      onAddedProject();
      setOpen(false);
    } catch (error) {
      console.log(error);
      message.error("操作失败");
    }
    setLoading(false);
  };

  const [isOkBtnDisabled, setIsOkBtnDisabled] = useState(true);
  const handleFormValueChange = (_: unknown, values: AddProjectFieldType) => {
    setIsOkBtnDisabled(!values.name.trim());
  };

  return (
    <Modal
      open={open}
      title="新增项目"
      onCancel={() => setOpen(false)}
      width={480}
      className="px-12px"
      maskClosable={false}
      okText="添加"
      okButtonProps={{ loading, disabled: isOkBtnDisabled }}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        initialValues={defaultFormValues}
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
