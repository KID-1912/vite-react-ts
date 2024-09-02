import { Spin } from "antd";
import Logo from "@/assets/svg/logo.svg?react";

export default function LoadingLayer() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Logo className="text-64px mb-40px" />
      <Spin indicator={<AntdLoadingOutlined className="rotating" style={{ fontSize: "24px" }} />} />
    </div>
  );
}
