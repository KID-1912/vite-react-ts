import { UserContext } from "@/context/user.tsx";
import { deleteProjectDoc } from "@/api/projects/projects.ts";

type Props = {
  open: boolean;
  setOpen: (arg: boolean) => void;
  project: Project;
  onDeletedProject: () => void;
};

export default function DeleteProjectModal(props: Props) {
  const { user } = useContext(UserContext);
  const { message } = App.useApp();
  const { open, setOpen, project, onDeletedProject } = props;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDeleteProject = async () => {
    setDeleteLoading(true);
    try {
      const params = {
        project,
        userId: user!.uid,
      };
      await deleteProjectDoc(params);
      onDeletedProject();
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
      onOk={handleDeleteProject}
      confirmLoading={deleteLoading}
      onCancel={() => setOpen(false)}
      maskClosable={false}
      title="删除项目？"
      okText="删除"
    >
      {project && (
        <p className="py-12px">
          <span className="text-[var(--ant-color-primary)]">【{project.name}】</span>
          项目将会被永久删除。
        </p>
      )}
    </Modal>
  );
}
