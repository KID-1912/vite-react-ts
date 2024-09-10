import { Layout } from "antd";
import styles from "./sidebar.module.scss";
import { INBOX, TODAY_FILTER, RECENT_FILTER, TASK_GROUP_NAME_MAP } from "@/constants/TASK_GROUP.ts";

type Props = {
  activatedTaskGroup: TaskGroup;
  onActivateTaskGroup: (taskGroup: TaskGroup) => void;
};

export default function Sidebar(props: Props) {
  const { activatedTaskGroup, onActivateTaskGroup } = props;
  const isActivated = (taskGroup: TaskGroup) => {
    return taskGroup.__type === activatedTaskGroup.__type;
  };

  return (
    <Layout.Sider className={styles["sidebar"]}>
      <div
        className={`task-group-item flex items-center ${isActivated(INBOX) ? "activated" : ""}`}
        onClick={() => onActivateTaskGroup(INBOX)}
      >
        <AntdInboxOutlined className="icon-inbox" />
        {TASK_GROUP_NAME_MAP.get(INBOX.name)}
      </div>
      <div
        className={`task-group-item flex items-center ${isActivated(TODAY_FILTER) ? "activated" : ""}`}
        onClick={() => onActivateTaskGroup(TODAY_FILTER)}
      >
        <AntdCalendarOutlined className="icon-today" />
        {TASK_GROUP_NAME_MAP.get(TODAY_FILTER.name)}
      </div>
      <div
        className={`task-group-item flex items-center ${isActivated(RECENT_FILTER) ? "activated" : ""}`}
        onClick={() => onActivateTaskGroup(RECENT_FILTER)}
      >
        <AntdCalendarOutlined className="icon-today" />
        {TASK_GROUP_NAME_MAP.get(RECENT_FILTER.name)}
      </div>
    </Layout.Sider>
  );
}
