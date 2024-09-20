import { Layout } from "antd";
import styles from "./layout.module.scss";
import LogoWhite from "@/assets/svg/logo-white.svg?react";
import AddTaskModal from "./components/AddTaskModal/AddTaskModal.tsx";
import { INBOX } from "@/constants/TASK_GROUP.ts";
import { firebaseAuth } from "@/firebase.ts";

const { Header } = Layout;

type Props = {
  children: React.ReactNode;
};

export default function LayoutIndex({ children }: Props) {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = () => {
    firebaseAuth.signOut();
    navigate("/login");
  };

  return (
    <>
      <Layout className={styles["layout"]}>
        <Header className={styles["layout-header"]}>
          <div className="flex justify-between items-center w-924px pl-12px h-full m-auto">
            <LogoWhite className="icon-logo"></LogoWhite>
            <AntdPlusOutlined className="icon-plus" onClick={() => setAddTaskModalOpen(true)} />
          </div>
          <div className="sign-out" onClick={handleSignOut}>
            登出
          </div>
        </Header>
        <Layout className={styles["layout-main"]}>{children}</Layout>
      </Layout>
      <AddTaskModal open={addTaskModalOpen} setOpen={setAddTaskModalOpen} taskGroup={INBOX} />
    </>
  );
}
