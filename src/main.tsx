import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "virtual:windi.css";
import { ConfigProvider } from "antd";
import "@/assets/styles/reset.css";
import "@/assets/styles/global.scss";
import "@/assets/styles/style.scss";

const container = document.getElementById("root") as HTMLDivElement;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <ConfigProvider theme={{ cssVar: true, hashed: false }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
