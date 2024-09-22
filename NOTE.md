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

在IDE新建一个React初始项目，这里提供一个我的空白项目模板：[github.com/KID-1912/vite-react-template](github.com/KID-1912/vite-react-template)

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

在开发项目新增登录页 [`src/pages/login/login.tsx`](github.com/KID-1912/todolist-react/blob/main/src/pages/login/login.tsx)，编写一个使用邮箱+密码的登录表单 [`LoginForm.tsx`](github.com/KID-1912/todolist-react/blob/main/src/pages/login/components/LoginForm.tsx)；

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

相关**Firebase Authentication**文档见：[firebase.google.com/docs/auth/web/password-auth?hl=zh-cn](firebase.google.com/docs/auth/web/password-auth?hl=zh-cn)

### UserContext

为了后续应用中其他组件访问 User 用户信息，为App编写 UserContext：[ `src/context/user.tsx`](github.com/KID-1912/todolist-react/blob/main/src/context/user.tsx)  提供用户状态。

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

编写 [`src/hooks/useAuthState.ts`](github.com/KID-1912/todolist-react/blob/main/src/hooks/useAuthState.ts)，它在 `UserContext` 中被使用：

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

- [src/pages/home/home.tsx](github.com/KID-1912/todolist-react/blob/main/src/pages/home/home.tsx)

- [src/layouts/layout.tsx](github.com/KID-1912/todolist-react/blob/main/src/layouts/layout.tsx)

同时涉及路由跳转，完善项目的路由配置：[`src/router/index.tsx`](github.com/KID-1912/todolist-react/blob/main/src/router/index.tsx)

其中，我们通过一个 [AuthGuard](github.com/KID-1912/todolist-react/blob/main/src/router/components/AuthGuard.tsx) 验证用户状态有效性

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



创建数据库

doc task 数据  增AddTaskItem删 查taskItem改 / 收件箱/最近七日/项目概念与查询 标记任务完成 索引 任务类型

project 增删查改，数字回显

注册 实现

部署实现

项目迁移




