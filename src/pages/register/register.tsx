import RegisterForm from "./components/RegisterForm.tsx";
import styles from "./register.module.scss";
import { Typography } from "antd";

export default function Login() {
  return (
    <div className={styles["register-page"]}>
      <div className="flex items-center self-center">
        {/* 登录表单 */}
        <div className="mr-80px">
          <Typography.Title level={2} className={styles["register-title"]}>
            注册
          </Typography.Title>
          <RegisterForm />
        </div>
        <div className={styles["register-picture"]}></div>
      </div>
    </div>
  );
}
