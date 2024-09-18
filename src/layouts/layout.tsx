import { Layout } from "antd";
import styles from "./layout.module.scss";
import LogoWhite from "@/assets/svg/logo-white.svg?react";

const { Header } = Layout;

type Props = {
  children: React.ReactNode;
};

export default function LayoutIndex({ children }: Props) {
  return (
    <Layout className={styles["layout"]}>
      <Header className={styles["layout-header"]}>
        <div className="flex justify-between items-center w-924px h-full m-auto">
          <LogoWhite className="icon-logo"></LogoWhite>
        </div>
      </Header>
      <Layout className={styles["layout-main"]}>{children}</Layout>
    </Layout>
  );
}
