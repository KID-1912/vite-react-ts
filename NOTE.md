# 构建高效的 TodoList Web 应用：基于 Firebase 的全栈实现

输出文档：firebase文档、README.md、NOTE.md 与其他笔记补充

## 前言

### 关于Firebase

Firebase 最初是由 Firebase, Inc. 于 2011 年推出的，最初是一个实时数据库。2014 年，Google 收购了 Firebase，并作为Google Cloud一部分，随后逐渐将其扩展为一个全面的开发平台。

**Firebase能做什么？**

- **Firestore Database**：Firebase 提供的云数据库功能，一个 NoSQL 文档数据库；

- **Authentication**：用户身份验证系统，旨在简化应用程序的用户注册和登录过程。支持多种身份验证方式；

- **Hosting**：静态网站托管服务；

- **Cloud Functions**：一种无服务器框架，利用它自动运行后端代码来响应 Firebase 功能和 HTTPS 请求触发的事件；

- **Storage**：对象存储服务

- ......

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*CTVS3OXNddls_nDRUaUuFg.png" title="" alt="" width="719">

开发者通过在Firebase控制台创建【项目】，自由搭配Firebase提供的功能/服务，部分服务需升级收费方案，本项目仅使用了Firestore Database、Authentication以及Hosting功能，都是免费但有一定限额功能。

**Firebase官网**：[https://firebase.google.com/?hl=zh-cn](https://firebase.google.com/?hl=zh-cn)

**Firebase项目控制台**：[https://console.firebase.google.com/](https://console.firebase.google.com/)

**Firebase官方文档**（包含所有功能使用说明）：[firebase.google.com/docs/build?hl=zh-cn](https://firebase.google.com/docs/build?hl=zh-cn)

## 关于本项目

本项目是对 [Todoist](https://app.todoist.com/) （国外一款流行的任务管理应用：[todoist.com](https://todoist.com/zh-CN)）的简易功能版实现。另外参考了github 项目  [todoist-clone](https://github.com/Altech/todoist-clone) 对其TS改写并二次开发；

**体验地址**：[todolist-react-f22cc.web.app](https://todolist-react-f22cc.web.app/)      [todolist-react-f22cc.firebaseapp.com](https://todolist-react-f22cc.firebaseapp.com/)

**github**：[github.com/KID-1912/todolist-react](https://github.com/KID-1912/todolist-react)

## Firebase准备

### Firebase项目-应用

![](https://raw.githubusercontent.com/KID-1912/Github-PicGo-Images/master/202409222323668.png)

在 [Firebase控制台](https://console.firebase.google.com/) 创建一个新的 `todolist` **项目**，并在项目内选择添加 web（网页）**应用**

![](https://raw.githubusercontent.com/KID-1912/Github-PicGo-Images/master/202409222323673.png)

### 引入Firebase

在IDE新建一个React初始项目，这里提供一个我的空白项目模板：[github.com/KID-1912/vite-react-template](https://github.com/KID-1912/vite-react-template)

**Firebase SDK**：

```shell
npm install firebase --save
```

新增 `src/firebase.ts` 文件，为项目编写初始化Firebase逻辑：

```ts
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx",
  measurementId: "xxx",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
```

这段代码导出firebase App对象，和firebase 认证对象；

关于 `firebaseConfig` 配置，在上一节创建**Firebase项目-应用**引导中有出现，你也可以在控制台的 【项目概览】—【项目设置】—【常规】—【您的应用】—【SDK 设置和配置】中查看到项目配置信息；

## Authentication登录

在开发项目新增登录页 [`src/pages/login/login.tsx`](https://github.com/KID-1912/todolist-react/blob/main/src/pages/login/login.tsx)，编写一个使用邮箱+密码的登录表单 [`LoginForm.tsx`](https://github.com/KID-1912/todolist-react/blob/main/src/pages/login/components/LoginForm.tsx)；

firebase 登录核心逻辑：

```ts
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/firebase.ts";

...
    try {
      // 使用 电子邮件地址和密码登录API
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      // const user = userCredential.user; // 这里可以拿到用户信息，但我们通过useAuthState维护用户状态
      navigate("/");
      message.success("登录成功");
    } catch (error) {
      message.error("登录失败");
      console.warn("登录失败", error);
    }
...
```

相关**Firebase Authentication**文档见：[firebase.google.com/docs/auth/web/password-auth?hl=zh-cn](https://firebase.google.com/docs/auth/web/password-auth?hl=zh-cn)

### UserContext

为了后续应用中其他组件访问 User 用户信息，为App编写 UserContext：[ `src/context/user.tsx`](https://github.com/KID-1912/todolist-react/blob/main/src/context/user.tsx)  提供用户状态。

```jsx
import { useAuthState } from "@/hooks/useAuthState.ts";
import type { UserState } from "@/hooks/useAuthState.ts";

export const UserContext = createContext<UserState>({ user: null, loading: true });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthState();
  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
};
```

### useAuthState

编写 [`src/hooks/useAuthState.ts`](https://github.com/KID-1912/todolist-react/blob/main/src/hooks/useAuthState.ts)，它在 `UserContext` 中被使用：

```ts
import { firebaseAuth } from "@/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";

import type { User } from "firebase/auth";

export interface UserState {
  user: User | null;
  loading: boolean;
}

export const useAuthState = (): UserState => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setLoading(false);
      setUser(user);
    });
    return unsubscribe;
  }, [firebaseAuth]);

  return { user, loading };
};
```

通过 `onAuthStateChanged`API 监听Firebase App的User状态更新，它会在Firebase App认证状态改变，如登录/退出登录时被调用；

### 初始用户

由于目前没有添加注册逻辑，我们可以在Firebase 控制台手动新增一个初始用户

**为项目开启Authentication**

控制台侧边栏【构建】—【Authentication】点击【开始】开启 **Authentication**

![](https://raw.githubusercontent.com/KID-1912/Github-PicGo-Images/master/202409222325782.png)

设置【登录方法】选择“电子邮箱/密码”

![](https://raw.githubusercontent.com/KID-1912/Github-PicGo-Images/master/202409222326129.png)

回到【用户】新增用户：example@example.com 密码：testtest

![](C:\Users\heyut\AppData\Roaming\marktext\images\2024-09-22-23-30-41-image.png)

完成所有步骤，就可以在开发项目的登录页，输入初始用户邮箱和密码，测试登录功能；

## Home首页

![](https://raw.githubusercontent.com/KID-1912/Github-PicGo-Images/master/202409222345194.png)

用户通过登录页进入应用首页，编写以下文件实现首页：

- [src/pages/home/home.tsx](https://github.com/KID-1912/todolist-react/blob/main/src/pages/home/home.tsx)

- [src/layouts/layout.tsx](https://github.com/KID-1912/todolist-react/blob/main/src/layouts/layout.tsx)

同时涉及路由跳转，完善项目的路由配置：[`src/router/index.tsx`](https://github.com/KID-1912/todolist-react/blob/main/src/router/index.tsx)

其中，我们通过一个 [AuthGuard](https://github.com/KID-1912/todolist-react/blob/main/src/router/components/AuthGuard.tsx) 验证用户状态有效性

```jsx
import { UserContext } from "@/context/user.tsx";
import LoadingLayer from "@/components/base/LoadingLayer.tsx";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useContext(UserContext);
  if (loading) return <LoadingLayer />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
```

## Task 任务

在首页新增组件：

- [src/pages/home/components/TaskItem](https://github.com/KID-1912/todolist-react/tree/main/src/pages/home/components/TaskItem)：用于显示任务列表的每一项

- [src/pages/home/components/AddTaskItem](https://github.com/KID-1912/todolist-react/tree/main/src/pages/home/components/AddTaskItem)：用于新增任务项

### Firestore Database

**创建数据库**

控制台侧边栏【构建】—【Firestore Database】点击【创建数据库】

![](https://raw.githubusercontent.com/KID-1912/Github-PicGo-Images/master/2024/09/23/20240923104517.png)

### Task数据操作

在项目 api 目录下新增 [`src/api/tasks/tasks.ts`](https://github.com/KID-1912/todolist-react/blob/main/src/api/tasks/tasks.ts) 文件编写task数据操作接口

[`src/types/index.d.ts`](https://github.com/KID-1912/todolist-react/blob/main/src/types/index.d.ts) 存放项目的业务数据类型，包含Task、Project等

**新增Task(addDoc)**

新增Task核心逻辑：

```ts
import { addTaskDoc } from "@/api/tasks/tasks.ts";
......
  const { user } = useContext(UserContext); 
  ......
  const newTask: NewTask = {
      __type: "task",
      userId: user!.uid,
      done: false,
      name: values.name,
      description: values.description,
      scheduledAt: scheduledAtDate ? scheduledAtDate.toDate() : scheduledAtDate,
    };
    try {
      setLoading(true);
      await addTaskDoc({ task: newTask, taskGroup, userId: user!.uid });
      message.success("任务已添加");
      onAddTaskSuccess?.();
    } catch (error) {
      console.error(error);
      message.error("操作失败");
    }
  ......
```

其中 `addTaskDoc` 的第2个参数 taskGroup 为任务所属群组，类型信息如下：

```ts
type InboxType = { __type: "inbox"; name: "__inbox__" };

type TodayFilterType = { __type: "today"; name: "__today__" };

type RecentFilterType = { __type: "recent"; name: "__recent__" };

type ProjectType = {
  __type: "project";
  id?: string;
  name: string;
  createdAt: Date;
  color: string;
};

type TaskGroup = InboxType | TodayFilterType | RecentFilterType | ProjectType;
```

分别对应首页侧边栏 【收件箱】【今天】【即将到来】【我的项目】4个群组

![](https://raw.githubusercontent.com/KID-1912/Github-PicGo-Images/master/2024/09/23/20240923110655.png)

[`addTaskDoc`](https://github.com/KID-1912/todolist-react/blob/main/src/api/tasks/tasks.ts) 新增Task 方法实现：

```ts
import { collection, addDoc } from "firebase/firestore";
import { getTasksCollectionPath, TaskConverter } from "./helper.js";
import { db } from "@/context/firestore.tsx"; 

// 新增任务
export const addTaskDoc = async (data: { task: NewTask; taskGroup: TaskGroup; userId: string }) => {
  const { task, taskGroup, userId } = data;
  const path = getTasksCollectionPath(taskGroup, userId);
  const col = collection(db, path).withConverter(TaskConverter);
  const newDoc = await addDoc(col, task);
  return newDoc;
};
```

接下来以 `addTask` 涉及的操作，介绍 Firestore 各部分

相关**Firestore Database**文档见：[firebase.google.com/docs/firestore/quickstart?hl=zh-cn]([Cloud Firestore 使用入门 &nbsp;|&nbsp; Firebase](https://firebase.google.com/docs/firestore/quickstart?hl=zh-cn#initialize))

#### Firestore

在 [`@/context/firestore.tsx`](https://github.com/KID-1912/todolist-react/blob/main/src/context/firestore.tsx) 中，我们提供 `Firestore` 对象，实现应用与 Firebase 的 Firestore 数据库交互；

```ts
import { getFirestore } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";

export const db = getFirestore();
```

#### Collection Path

在 NoSQL 数据库中，**集合（collection）** 和 **文档（document）** 是数据组织的两个核心概念.集合是文档的容器，类似于关系型数据库中的表（table）;文档是实际存储数据的实体，类似于关系型数据库中的行（row）。

**Collection Path 意义**

唯一标识集合位置：

- Firestore 是一个文档型 NoSQL 数据库，数据被组织为集合和文档。每个集合和文档都有一个唯一的路径。通过指定集合路径（`collectionPath`），你能够准确地找到集合的位置。
- 比如，`users/{userId}/projects/{projectId}/tasks` 是一个具体的路径，指向某个用户的某个项目下的任务集合。

结构示意如下：

```
Collection: users
  ├── Document (ID: {userId})
       ├── Collection: tasks         // taskGroup.__type 是 "inbox" "today" "recent" 时
           ├── Document (task data)
           ├── Document (task data)
       ├── Collection: projects      // taskGroup.__type 是 "project" 时
           ├── Document (ID: {project.id})
                ├── Collection: tasks
                    ├── Document (task data)
                    ├── Document (task data)
```

通过判断任务所属群组，[`getTasksCollectionPath`](https://github.com/KID-1912/todolist-react/blob/main/src/api/tasks/helper.ts) 计算出Collection Path返回此次操作任务集的位置

```ts
export const getTasksCollectionPath = (taskGroup: TaskGroup, userId: string) => {
  let basePath = `users/${userId}`;
  if (taskGroup.__type === "project") {
    basePath += `/projects/${taskGroup.id}`;
  }
  return basePath + "/tasks";
};
```

#### FirestoreDataConverter

**定义文档数据与应用程序数据之间的转换逻辑**，方便数据的序列化和反序列化。

在项目的 [`/src/api/tasks/helper.ts` ](https://github.com/KID-1912/todolist-react/blob/main/src/api/tasks/helper.ts)下的 `TaskConverter`，为 Task数据操作定义数据存取的转换逻辑；

```ts
import { serverTimestamp, Timestamp } from "firebase/firestore";
import type { FirestoreDataConverter } from "firebase/firestore";

export const TaskConverter: FirestoreDataConverter<Task> = {
  // 存到Firestore
  toFirestore(task) {
    return {
      __type: "task",
      userId: task.userId,
      done: task.done,
      name: task.name,
      description: task.description,
      scheduledAt: task.scheduledAt ? Timestamp.fromDate(task.scheduledAt as Date) : null,
      createdAt: task.createdAt ? Timestamp.fromDate(task.createdAt as Date) : serverTimestamp(),
    };
  },
  // 从Firestore取出时
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
```

#### 索引

**查询Task列表(getDocs)**

在Task的数据设计中，inbox、today、recent都是直接查询user的task集合，只是 today、recent 附带了各自查询条件以区分群组；

taskGroup为 ProjectType类型时，是查询user的project的task集合；

```ts
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
```

上述查询涉及了 **复合查询**、**排序、过滤和混合查询**，必须在控制台 Firestore Database添加索引：

![](https://raw.githubusercontent.com/KID-1912/Github-PicGo-Images/master/2024/09/23/20240923122907.png)

#### CRUD

**移除Task(deleteDoc)**

```ts
// 移除任务
export const deleteTaskDoc = async (data: { task: Task; taskGroup: TaskGroup; userId: string }) => {
  const { task, taskGroup, userId } = data;
  const path = getTasksCollectionPath(taskGroup, userId);
  const col = collection(db, path).withConverter(TaskConverter);
  await deleteDoc(doc(col, task.id));
};
```

**更新Task(setTaskDoc)**

修改Task信息

```ts
// 更新/编辑任务信息
export const setTaskDoc = async (data: { task: Task; taskGroup: TaskGroup; userId: string }) => {
  const { task, taskGroup, userId } = data;
  const path = getTasksCollectionPath(taskGroup, userId);
  const col = collection(db, path).withConverter(TaskConverter);
  await setDoc(doc(col, task.id), task);
}; 
// 勾选/完成任务
export const doneTaskDoc = async (data: { task: Task; taskGroup: TaskGroup; userId: string }) => {
  const { task, taskGroup, userId } = data;
  const path = getTasksCollectionPath(taskGroup, userId);
  const col = collection(db, path).withConverter(TaskConverter);
  await setDoc(doc(col, task.id), { ...task, done: true });
};
```

## Project 项目

有了 Task 的基础，侧边栏的项目列表实现：

[`src/api/projects/projects.ts`](https://github.com/KID-1912/todolist-react/blob/main/src/api/projects/projects.ts)：project 数据操作接口

[`src/pages/home/components/Sidebar/Sidebar.tsx`](https://github.com/KID-1912/todolist-react/blob/main/src/pages/home/components/Sidebar/Sidebar.tsx)：侧边栏 project 列表

[`src/pages/home/components/AddProjectModal/AddProjectModal.tsx`](https://github.com/KID-1912/todolist-react/blob/main/src/pages/home/components/AddProjectModal/AddProjectModal.tsx)：新增 project 弹窗

## Authentication注册

### 邮箱链接认证

**Firebase Authentication**官方无强制的标准注册流程；**Authentication**更多关注身份验证

包括：[邮箱+密码验证](https://firebase.google.com/docs/auth/web/password-auth?hl=zh-cn)、[电子邮箱链接验证](https://firebase.google.com/docs/auth/web/email-link-auth?hl=zh-cn)、其它平台账号验证([Google](https://firebase.google.com/docs/auth/web/google-signin?hl=zh-cn)、[Facebook](https://firebase.google.com/docs/auth/web/facebook-login?hl=zh-cn)、[Github](https://firebase.google.com/docs/auth/web/github-auth?hl=zh-cn)、[Apple](https://firebase.google.com/docs/auth/web/apple?hl=zh-cn) ....)、[电话号码身份验证](https://firebase.google.com/docs/auth/web/phone-auth?hl=zh-cn)、[接入自定义身份验证系统](https://firebase.google.com/docs/auth/web/custom-auth?hl=zh-cn) ....

其中【电子邮箱链接验证】：Authentication根据传入的邮箱值(如aa@emial.com)生成并发送验证链接，任何设备通过该链接进入应用后，应用只需提供生成链接时传入的邮箱(即aa@email.com)，即可获取用户状态（若为新用户，则新增为无密码新用户）；

## 实现

我们思考通过**电子邮箱链接验证相关API**(signInWithEmailLink) + **更新用户密码API**(updatePassword)实现自定义的注册流程

**注册页**

在开发项目新增注册页 [`src/pages/register/register.tsx`](https://github.com/KID-1912/todolist-react/blob/main/src/pages/register/register.tsx)，其中编写一个使用邮箱+密码的登录表单 [`RegisterForm.tsx`](https://github.com/KID-1912/todolist-react/blob/main/src/pages/register/components/RegisterForm.tsx)；



部署实现

项目迁移
