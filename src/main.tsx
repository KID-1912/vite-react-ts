import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "virtual:windi.css";
import dayjs from "dayjs";
import { ConfigProvider } from "antd";
import locale from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import "@/assets/styles/reset.css";
import "@/assets/styles/global.scss";
import "@/assets/styles/style.scss";

dayjs.locale("zh-cn");

const container = document.getElementById("root") as HTMLDivElement;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <ConfigProvider theme={{ cssVar: true, hashed: false }} locale={locale}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
