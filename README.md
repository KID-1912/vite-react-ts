# todolist-react

<h3 align="center">
  TodoList Web应用 —— 基于 Firebase 全栈的实现，使用 React + TypeScript 开发
</h3>

**体验地址**：[todolist-react-f22cc.web.app](https://todolist-react-f22cc.web.app/)     [todolist-react-f22cc.firebaseapp.com](https://todolist-react-f22cc.firebaseapp.com/)

[![](https://raw.githubusercontent.com/KID-1912/Github-PicGo-Images/master/2024/09/25/20240925192424.png)](https://todolist-react-f22cc.web.app)

本项目是对 [Todoist](https://app.todoist.com/) （国外一款流行的任务管理应用：[todoist.com](https://todoist.com/zh-CN)）的简易功能版实现。

另外参考了github 项目 [todoist-clone](https://github.com/Altech/todoist-clone) 对其TS改写并二次开发；

<br/>

---

## Run

```shell
npm install
npm run dev
```

## Features

- 新建待办任务

- 收件箱/今日任务/即将到来

- 新建子项目Project

- 标记任务已完成

- 个人账号登录/注册

- ......

## 文件目录

```
├─dist
├─public
├─src
|  ├─api
|  ├─assets
|  ├─components
|  ├─constants
|  ├─context
|  |    ├─firestore.tsx
|  |    ├─project.tsx
|  |    └user.tsx
|  ├─hooks
|  |   └useAuthState.ts
|  ├─layouts
|  ├─pages
|  |   ├─home
|  |   ├─login
|  |   ├─register
|  ├─router
|  ├─types
|  |   └index.d.ts
|  ├─utils
|  ├─App.tsx
|  ├─firebase.ts
|  ├─main.tsx
├─.env
├─.env.development
├─.env.production
├─.eslintrc.cjs
├─.firebaserc
├─.prettierrc.cjs
├─auto-imports.d.ts
├─eslintrc-auto-import.json
├─firebase.json
├─index.html
├─package-lock.json
├─package.json
├─postcss.config.js
├─README.md
├─tsconfig.json
├─vite.config.ts
├─windi.config.js
```

**Relations**

[firebase google](https://firebase.google.com/?hl=zh-cn)

[todoist.com](https://todoist.com/zh-CN)
