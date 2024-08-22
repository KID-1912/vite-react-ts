import LoginForm from "./components/LoginForm.tsx";
import styles from "./login.module.scss";
import { Typography } from "antd";

export default function Login() {
  return (
    <div className={styles["login-page"]}>
      <div className="flex items-center self-center">
        {/* 登录表单 */}
        <div className="mr-80px">
          <Typography.Title level={2} className={styles["login-title"]}>
            登录
          </Typography.Title>
          <LoginForm />
        </div>
        {/* 登录图片 */}
        <div className={styles["login-picture"]}></div>
      </div>
    </div>
  );
}
