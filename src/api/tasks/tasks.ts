import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  collectionGroup,
} from "firebase/firestore";
import { getTasksCollectionPath, TaskConverter } from "./helper.js";
import { db } from "@/context/firestore.tsx";

/*
任务相关接口
 */

// 新增任务
export const addTaskDoc = async (data: { task: NewTask; taskGroup: TaskGroup; userId: string }) => {
  const { task, taskGroup, userId } = data;
  const path = getTasksCollectionPath(taskGroup, userId);
  const col = collection(db, path).withConverter(TaskConverter);
  const newDoc = await addDoc(col, task);
  return newDoc;
};

// 查询任务 by taskGroup
export const getTaskDocsByGroup = async (data: { taskGroup: TaskGroup; userId: string }) => {
  const { taskGroup, userId } = data;
  if (["inbox", "project"].includes(taskGroup.__type)) {
    const path = getTasksCollectionPath(taskGroup, userId);
    const col = collection(db, path).withConverter(TaskConverter);
    const querySnapshot = await getDocs(
      query(col, where("done", "==", false), orderBy("createdAt")),
    );
    return querySnapshot.docs.map((docSn) => docSn.data());
  }
  if (["today", "recent"].includes(taskGroup.__type)) {
    const col = collectionGroup(db, "tasks").withConverter(TaskConverter);
    const op = taskGroup.__type === "today" ? "<=" : ">=";
    const querySnapshot = await getDocs(
      query(
        col,
        where("userId", "==", userId),
        where("done", "==", false),
        where("scheduledAt", op, new Date()),
        orderBy("scheduledAt"),
      ),
    );
    return querySnapshot.docs.map((docSn) => docSn.data());
  }
};

// 移除任务
export const deleteTaskDoc = async (data: { task: Task; taskGroup: TaskGroup; userId: string }) => {
  const { task, taskGroup, userId } = data;
  const path = getTasksCollectionPath(taskGroup, userId);
  const col = collection(db, path).withConverter(TaskConverter);
  await deleteDoc(doc(col, task.id));
};

// 更新任务
export const setTaskDoc = async (data: { task: Task; taskGroup: TaskGroup; userId: string }) => {
  const { task, taskGroup, userId } = data;
  const path = getTasksCollectionPath(taskGroup, userId);
  const col = collection(db, path).withConverter(TaskConverter);
  await setDoc(doc(col, task.id), task);
};
