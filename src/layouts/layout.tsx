import { Layout } from "antd";
import styles from "./layout.module.scss";

const { Header } = Layout;

type Props = {
  children: React.ReactNode;
};

export default function LayoutIndex({ children }: Props) {
  return (
    <Layout className={styles["layout"]}>
      <Header className={styles["layout-header"]}></Header>
      <Layout className={styles["layout-main"]}>{children}</Layout>
    </Layout>
  );
}
