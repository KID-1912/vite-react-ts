import { Layout } from "antd";
import styles from "./layout.module.scss";

const { Header, Sider, Content } = Layout;

type Props = {
  children: React.ReactNode;
}

export default function LayoutIndex({ children }: Props) {
  return (
    <Layout className={styles["layout"]}>
      <Header className={styles["layout-header"]}></Header>
      <Layout className={styles["layout-main"]}>
        <Sider className={styles["layout-sider"]}>Inbox</Sider>
        <Content className="bg-white">{children}</Content>
      </Layout>
    </Layout>
  );
}
