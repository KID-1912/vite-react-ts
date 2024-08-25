import styles from "./add-task-item.module.scss";

type Props = {
  className?: string;
};

export default function AddTaskItem({ className }: Props) {
  return (
    <div className={`${styles["add-task-item"]} ${className}`}>
      <AntdPlusOutlined className={styles["plus-outline"]} />
      <AntdPlusCircleFilled className={styles["plus-circle-filled"]} />
      <div className="ml-4px">添加任务</div>
    </div>
  );
}
