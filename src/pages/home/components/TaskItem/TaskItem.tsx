import styles from "./task-item.module.scss";

type Props = {
  task: Task;
};

export default function TaskItem({ task }: Props) {
  return (
    <div className={styles["task-item"]}>
      <div className={styles["task-checkbox"]}>
        <AntdCheckOutlined className={styles["icon-checked"]} />
      </div>
      <div className="flex-1 ml-12px">
        <div className="flex justify-between items-center h-16px">
          <div className="task-name">{task.name}</div>
          <div className="flex">
            <div className={styles["action-item"]}>
              <AntdEditOutlined />
            </div>
            <div className={styles["action-item"]}>
              <AntdDeleteOutlined />
            </div>
          </div>
        </div>
        <div className="mt-6px text-12px">8月1日</div>
      </div>
    </div>
  );
}
