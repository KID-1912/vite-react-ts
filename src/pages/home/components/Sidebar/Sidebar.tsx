import { Layout } from "antd";
import styles from "./sidebar.module.scss";

export default function Sidebar() {
  return <Layout.Sider className={styles["sidebar"]}>Inbox</Layout.Sider>;
}
