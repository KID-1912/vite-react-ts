import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { getTasksCollectionPath, TaskConverter } from "./helper.js";
import { db } from "@/context/firestore.tsx";

/*
任务相关接口
 */

// 新增任务
export const addTaskDoc = async (data: { task: NewTask; taskGroup: TaskGroup; userId: string }) => {
  const { task, taskGroup, userId } = data;
  const taskCollectionPath = getTasksCollectionPath(taskGroup, userId);
  const col = collection(db, taskCollectionPath).withConverter(TaskConverter);
  const newDoc = await addDoc(col, task);
  return newDoc;
};

// 查询任务 by taskGroup
export const getTaskDocsByGroup = async (data: { taskGroup: TaskGroup; userId: string }) => {
  const { taskGroup, userId } = data;
  const path = getTasksCollectionPath(taskGroup, userId);
  const col = collection(db, path).withConverter(TaskConverter);
  const querySnapshot = await getDocs(query(col, where("done", "==", false), orderBy("createdAt")));
  return querySnapshot.docs.map((docSn) => docSn.data());
};
