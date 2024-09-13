import { serverTimestamp, Timestamp } from "firebase/firestore";
import type { FirestoreDataConverter } from "firebase/firestore";

export const getTasksCollectionPath = (taskGroup: TaskGroup, userId: string) => {
  let basePath = `users/${userId}`;
  if (taskGroup.__type === "project") {
    basePath += `/projects/${taskGroup.id}`;
  }
  return basePath + "/tasks";
};

export const TaskConverter: FirestoreDataConverter<Task> = {
  toFirestore(task) {
    return {
      __type: "task",
      userId: task.userId,
      done: task.done,
      name: task.name,
      scheduledAt: task.scheduledAt ? Timestamp.fromDate(task.scheduledAt as Date) : null,
      createdAt: task.createdAt ? Timestamp.fromDate(task.createdAt as Date) : serverTimestamp(),
    };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    const task = {
      id: snapshot.id,
      ...data,
      scheduledAt: data.scheduledAt?.toDate(),
      createdAt: data.createdAt.toDate(),
    } as Task;
    return task;
  },
};
