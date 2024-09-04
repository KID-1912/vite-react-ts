interface Task {
  __type: "task";
  id: string;
  userId: string;
  createdAt: Date;
  done: boolean;
  name: string;
  description: string;
  scheduledAt: Date | null;
}

interface NewTask
  extends Pick<Task, "__type" | "userId" | "done" | "name" | "description" | "scheduledAt"> {}

type InboxType = { __type: "inbox"; name: "__inbox__" };

type ProjectType = {
  __type: "project";
  id?: string;
  name: string;
  createdAt?: Date;
  color: string;
};

type TaskGroup = InboxType | ProjectType;
