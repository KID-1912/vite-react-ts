import styles from "./task-item.module.scss";
import { formatScheduledDate, calcScheduledColor } from "@/utils/index.ts";

type Props = {
  task: Task;
  onEditTask: () => void;
  onDeleteTask: () => void;
};

export default function TaskItem({ task, onEditTask, onDeleteTask }: Props) {
  return (
    <div className={styles["task-item"]}>
      <div className={styles["task-checkbox"]}>
        <AntdCheckOutlined className={styles["icon-checked"]} />
      </div>
      <div className="flex-1 ml-12px">
        <div className="flex justify-between items-center h-16px">
          <div className="task-name">{task.name}</div>
          <div className="flex">
            <div className={styles["action-item"]} onClick={onEditTask}>
              <AntdEditOutlined />
            </div>
            <div className={styles["action-item"]} onClick={onDeleteTask}>
              <AntdDeleteOutlined />
            </div>
          </div>
        </div>
        {task.scheduledAt && (
          <div
            className="flex items-center mt-6px text-12px"
            style={{ color: calcScheduledColor(task.scheduledAt) }}
          >
            <AntdCalendarOutlined className="mr-4px" />
            {formatScheduledDate(task.scheduledAt)}
          </div>
        )}
      </div>
    </div>
  );
}
