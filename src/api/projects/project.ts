import { addDoc, collection } from "firebase/firestore";
import {db} from "@/context/firestore.tsx";
import {ProjectConverter} from "./helper.ts";

/**
 * 项目相关接口
 */

// 添加项目
export const addProjectDoc = async (data: {project: NewProject, userId: string}) => {
  const { project, userId } = data;
  const path = `users/${userId}/projects`;
  const col = collection(db, path).withConverter(ProjectConverter);
  await addDoc(col, project);
}
