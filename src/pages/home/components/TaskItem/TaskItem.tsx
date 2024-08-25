import type { Task } from "@/types/index.d.ts";

type Props = {
  task: Task;
};

export default function TaskItem({ task }: Props) {
  return (
    <div>
      <div className="task-name">{task.name}</div>
    </div>
  );
}
