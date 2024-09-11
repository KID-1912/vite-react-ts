import { PROJECT_COLOR } from "@/constants/PROJECT_COLOR";
import styles from "./add-project-modal.module.scss";

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
};

export default function AddProjectModal(props: Props) {
  const { open, setOpen } = props;
  const defaultFormValues = { name: "", color: PROJECT_COLOR[0].color };

  type AddProjectFieldType = { name: string; color: string };
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    const values: AddProjectFieldType = form.getFieldsValue();
    console.log(values);
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
      okButtonProps={{ disabled: isOkBtnDisabled }}
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
