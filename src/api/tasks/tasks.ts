import { collection, addDoc } from "firebase/firestore";
import { getTasksCollectionPath, TaskConverter } from "./helper.js";
import { db } from "@/context/firestore.tsx";

// 任务相关接口
export const addTaskDoc = async (data: { task: NewTask; taskGroup: TaskGroup; userId: string }) => {
  const { task, taskGroup, userId } = data;
  const taskCollectionPath = getTasksCollectionPath(taskGroup, userId);
  const col = collection(db, taskCollectionPath).withConverter(TaskConverter);
  const docRef = await addDoc(col, task);
  console.log(docRef);
};
