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
- signin √ signout
- todays

## Firebase

要替换 firebase 数据服务，请创建一个[google firebase](https://console.firebase.google.com/)账户并更改 `src/firebase.ts`。

## Relevant documents

TypeScript.md: 加上"!",表示不为null, as关键字，interface type关键字

React.md: css modules

AntDesign.md: 官方文档

eslint.md:

vite.md:vite中unplugin中react,vue不同，以及icon自动引入

react-use和ahooks

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

firebase.tsx

### layouts

layouts/layouts.tsx

### react-router-dom

router/index.tsx

### 任务模块、添加基础代办

AddTaskItem、TaskItem

useTasks、api/task.js 新增任务，查询任务


### firebase

**google firebase**

1. [google firebase](https://console.firebase.google.com/)登录并创建项目 `todolist`

2. `todolist` 项目下添加web应用 `todolist-react`

3. 项目开启Cloud Firestore服务、Authentication服务（添加账号example@example密码comtesttest）

4. nodejs项目安装 `firebase` npm包

5. 一键复制firebase配置，作为nodejs项目的 `src/firebase.ts` 文件

6. 运行项目，设置索引
