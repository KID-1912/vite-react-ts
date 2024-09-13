import { serverTimestamp, Timestamp } from "firebase/firestore";
import type { FirestoreDataConverter } from "firebase/firestore";

export const ProjectConverter: FirestoreDataConverter<Project> = {
  toFirestore(project) {
    return {
      __type: "project",
      userId: project.userId,
      name: project.name,
      color: project.color,
      createdAt: project.createdAt ? Timestamp.fromDate(project.createdAt as Date) : serverTimestamp(),
    }
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    const project = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt.toDate(),
    } as Project;
    return project;
  }
}