# vite-pure-template

一个纯净的 vite react 模板，仅统一配置与目录结构

## 目录结构

参考 [create-react-app 目录结构](https://create-react-app.dev/docs/folder-structure)

```
vite-pure-template
├─dist
├─node_modules
├─public
├─src
|  ├─assets
|  |   ├─styles
|  |   ├─images
|  ├─components
|  ├─layouts
|  ├─middleware
|  ├─modules
|  ├─pages
|  ├─plugins
|  ├─App.js
|  ├─main.js
├─.env
├─.env.development
├─.env.production
├─.eslintrc.cjs
├─.gitignore
├─.prettier.js
├─index.html
├─package-lock.json
├─package.json
├─postcss.config.js
├─README.md
├─vite.config.js
├─windi.config.js
```

## 集成特性

### 环境变量

---

### 插件

- @vitejs/plugin-react

- vite-plugin-html

- vite-plugin-legacy-swc

- eslint：@babel/eslint-parser、vite-plugin-eslint、eslint-config-react-app

- prettier：eslint-config-prettier、eslint-config-react-app、eslint-plugin-prettier

- [vite-svg-loader]

- windicss

- sass/less

- postcss: autoprefixer/cssnano

- unplugin-auto-import