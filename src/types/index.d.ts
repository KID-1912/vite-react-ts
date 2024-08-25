export type Task = {
  __type: "task";
  id?: string;
  userId: string;
  createdAt?: Date;
  done: boolean;
  name: string;
  scheduledAt: Date | null;
};