import { Layout } from "antd";
import styles from "./layout.module.scss";

const { Header, Sider, Content } = Layout;

interface Props {
  children: React.ReactNode;
}

export default function LayoutIndex({ children }: Props) {
  return (
    <Layout className={styles["layout"]}>
      <Header className={styles["layout-header"]}></Header>
      <Layout className={styles["layout-main"]}>
        <Sider className={styles["layout-sider"]}>侧边栏</Sider>
        <Content className="bg-white">{children}</Content>
      </Layout>
    </Layout>
  );
}
