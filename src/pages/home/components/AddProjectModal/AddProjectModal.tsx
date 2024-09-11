import { PROJECT_COLOR } from "@/constants/PROJECT_COLOR";
import styles from "./add-project-modal.module.scss";

const OptionItem = (props: { option: { label: string; value: string } }) => {
  const { option } = props;
  return (
    <div className="flex items-center">
      <div className="icon-circle mr-12px" style={{ backgroundColor: option.value }}></div>
      {option.label}
    </div>
  );
};

type Props = {
  open: boolean;
};

export default function AddProjectModal(props: Props) {
  const { open } = props;
  const defaultFormValues = { name: "", color: PROJECT_COLOR[0].color };

  return (
    <Modal open={open} title="新增项目">
      <Form initialValues={defaultFormValues} layout="vertical" className="py-12px">
        <Form.Item name="name" label="名称">
          <Input placeholder="输入项目名称"></Input>
        </Form.Item>
        <Form.Item name="color" label="颜色">
          <Select
            tagRender={OptionItem}
            options={PROJECT_COLOR.map((item) => ({
              className: styles["select-color-option"],
              label: item.name,
              value: item.color,
            }))}
            optionRender={(option) => <OptionItem option={option.data} />}
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
