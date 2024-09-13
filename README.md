# todolist-react

## Features

- List tasks
- Add a task to inbox
- Edit a task
- Delete a task
- Mark task as done

## Plan Task

- ant-design √
- layout：sidebar + header+main √
- signin √ signout 登录状态持久化 √
- inbox

## Firebase

要替换 firebase 数据服务，请创建一个[google firebase](https://console.firebase.google.com/)账户并更改 `src/firebase.ts`。

## Relevant documents

TypeScript.md

React.md

AntDesign.md Form useForm获取状态 Select label自定义

eslint.md

vite.md react svg支持

## Relation

https://github.com/Altech/todoist-clone

https://app.todoist.com/app/today

https://ant-design.antgroup.com/components/overview-cn/

## Development Log

### 项目初始化

拉取 `vite-react-ts` 项目模板

### Ant Design

引入 `antd` 依赖

antd自动导入

### 登录功能

pages/login/login.tsx：一些基础组件使用，ts 类型声明

新增 firebase.tsx

### layouts

layouts/layouts.tsx

### react-router-dom

router/index.tsx

### 任务模块、添加基础代办

AddTaskItem、TaskItem 组件静态实现

编写 api/tasks/tasks.ts 任务操作模块（增删改查任务接口实现）

types/index.d.ts 声明 Task、InboxType、ProjectType、TaskGroup类型

添加UserContext(依赖useAuthState)、FirestoreContext

### 关于登录实现

**原项目**

1. 在UserContext中使用useAuthState，通过useEffect监听onAuthStateChanged事件回调

2. loginForm 组件成功调用firebaseAuth登录，触发回调内setUser

3. user状态存在，UI渲染app内页组件内容

**本项目**

前1、2点一致，第3点由于项目使用router，需新增 AuthGuard专用于鉴权守卫

```tsx
// @/router/components/AuthGuard
import { UserContext } from "@/context/user.tsx";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useContext(UserContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
```

使用：在routes中为内页添加鉴权守卫

```tsx
// @/router/index.tsx

const LoginRoute: RouteObject = {
  path: "/login",
  // login页不需要鉴权
  element: lazyLoad(lazy(() => import("@/pages/login/login.tsx"))),
};

// 后台内页需要鉴权
const adminRoutes: RouteObject = {
  path: "/",
  element: (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  ),
  children: [
    {
      index: true,
      element: lazyLoad(lazy(() => import("@/pages/home/home.tsx"))),
    },
    // ... permissionRoutes
  ],
};

export default function Router() {
  const routes: RouteObject[] = [adminRoutes, LoginRoute];
  const router = createHashRouter(routes);
  return <RouterProvider router={router} />;
}
```

### 任务CRUD

AddTaskItem组件 新增任务实现 √

TaskItem 渲染任务列表 √

Inbox收件箱 任务列表 √

移除任务列表 √

登录状态加载 √ useAuthState.ts 为获取权限事件新增loading，为AuthGuard提供加载状态

首页loading Skeleton 加载 √

截止日期 √

编辑任务 √

inbox、最近recent、project切换 √

标记完成任务 √

添加project item

查询 project item

### firebase

**google firebase**

1. [google firebase](https://console.firebase.google.com/)登录并创建项目 `todolist`

2. `todolist` 项目下添加web应用 `todolist-react`

3. 项目开启Cloud Firestore服务、Authentication服务（添加账号example@example密码comtesttest）

4. nodejs项目安装 `firebase` npm包

5. 一键复制firebase配置，作为nodejs项目的 `src/firebase.ts` 文件

6. 运行项目，设置索引(哪来的？)
