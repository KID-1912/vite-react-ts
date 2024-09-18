import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/context/firestore.tsx";
import { ProjectConverter } from "./helper.ts";

/**
 * 项目相关接口
 */

// 添加project
export const addProjectDoc = async (data: { project: NewProject; userId: string }) => {
  const { project, userId } = data;
  const path = `users/${userId}/projects`;
  const col = collection(db, path).withConverter(ProjectConverter);
  await addDoc(col, project);
};

// project列表
export const getProjectDoc = async (data: { userId: string }) => {
  const { userId } = data;
  const path = `users/${userId}/projects`;
  const col = collection(db, path).withConverter(ProjectConverter);
  const querySnapshot = await getDocs(query(col, orderBy("createdAt", "desc")));
  return querySnapshot.docs.map((docSn) => docSn.data());
};

// 移除项目
export const deleteProjectDoc = async (data: { project: Project; userId: string }) => {
  const { project, userId } = data;
  const path = `users/${userId}/projects`;
  const col = collection(db, path).withConverter(ProjectConverter);
  await deleteDoc(doc(col, project.id));
};

// 编辑项目
export const editProjectDoc = async (data: { project: Project; userId: string }) => {
  const { project, userId } = data;
  const path = `users/${userId}/projects`;
  const col = collection(db, path).withConverter(ProjectConverter);
  await setDoc(doc(col, project.id), project);
};
