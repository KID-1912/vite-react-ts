import { Layout } from "antd";
import styles from "./layout.module.scss";

const { Header, Sider, Content } = Layout;

export default function LayoutIndex({ children }) {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.layoutHeader}></Header>
      <Layout className={styles.layoutMain}>
        <Sider className={styles.layoutSider}>侧边栏</Sider>
        <Content className=" bg-white">{children}</Content>
      </Layout>
    </Layout>
  );
}
