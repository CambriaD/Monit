<!--
 * @Author: fzf404
 * @Date: 2022-06-18 17:15:15
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-06-19 23:59:15
 * @Description: Monit 说明文档
-->

## 💡 展示

![show](show.jpeg)

## 🎁 安装

前往 [Release](https://github.com/fzf404/Monit/releases) 寻找操作系统对应的安装包

使用 Github Action 自动打包，无需担心安全问题

- Windows & Linux

  > Windows 支持开机自启
  >
  > Linux 开机自启功能可能会失效

- Mac

  > 由于没有 Apple 开发者账号，打开时如出现 `Monit.app 已损坏`，请执行如下指令

  ```bash
  sudo xattr -rd com.apple.quarantine [应用位置](将应用程序中的 Monit 拖进来)
  ```

## ✨ 功能

| 插件名   | 功能              | 状态 |
| -------- | ----------------- | ---- |
| welcome  | 欢迎 & 使用指引   | ✅   |
| github   | github 信息监控   | ✅   |
| clock    | 时钟翻牌器        | ✅   |
| todo     | 待办事项管理      | 🟨   |
| music    | 网易云音乐播放    | ⛔️  |
| bilibili | bilibili 信息监控 | ⛔️  |

## 📝 开发

Monit 是一个开源的桌面小组件，使用 MIT 协议开源。因此，您可以自由使用项目中的代码。

基于 Electron + Vue 开发，渲染进程使用 JS + Vue，后台进程使用 JS 调用 Electron API。

如果您了解 Vue，并不了解 Electron，使用本项目即可快速开发出自己的桌面小组件。

### 🍀 代码结构

> 项目结构基于个人喜好，可能随时发生**重大调整**
>
> 文件头部均有功能描述

```bash
├── app # 渲染进程
│   ├── assets # 静态资源
│   ├── layout # 布局组件
│   ├── plugins # 插件
│   └── utils # 工具

├── build # 应用 Logo
├── common # 通用工具
│   └── plugin.js # 插件配置
├── core # 主进程
│   ├── event.js # 事件处理
│   ├── main.js # 应用入口
│   ├── tray.js # 托盘进程
│   └── window.js # 窗口管理
├── public # 静态文件
├── .prettier # 代码格式化配置
├── postcss.config.js # postcss 配置
├── tailwind.config.js # tailwindcss 配置
└── vue.config.js # vue-cli 配置 & electron 打包配置
```

### ✨ 技术

- Electron 16
  - 跨平台的桌面应用程序构建工具
  - [官方文档](https://www.electronjs.org/zh/docs/latest)
- Vue 3
  - JavaScript 前端框架
  - [官方文档](https://v3.cn.vuejs.org/guide/introduction.html)
  - 可使用 setup 语法开发
- Tailwindcss 3
  - 功能类 CSS 语法糖
  - [官方文档](https://www.tailwindcss.cn/docs)
  - 可选功能，可只使用 css 进行插件开发

### 🚀 快速开始

> 来写一个计数器吧
>
> 推荐使用 vscode 作为代码编辑器
>
> 安装 tailwindcss 插件后，将鼠标移至 class 上可查看样式 css

1. clone 本项目
   ```bash
   git clone https://github.com/fzf404/Monit.git --depth-1
   ```
2. 安装项目依赖
   ```bash
   # 假如您使用 npm, 请安装 pnpm
   npm i -g pnpm
   # 使用 yarn 安装依赖
   pnpm i
   ```
3. 编写插件页面 `app/plugins/count.vue`

   ```vue
   <template>
     <main class="h-screen">
       <!-- 窗口控制器 -->
       <Layout />
       <!-- 页面内容 -->
       <article class="flex-col-center space-y-4">
         <h1 class="text-gray-400">计数器</h1>
         <p class="text-5xl">{{ count }}</p>
         <!-- 增加 & 减少按钮 -->
         <p class="space-x-4">
           <button class="btn bg-red-500 hover:bg-red-600" @click="reduce">-</button>
           <button class="btn bg-green-500 hover:bg-green-600" @click="increase">+</button>
         </p>
       </article>
     </main>
   </template>

   <script>
   import Layout from '../layout/custom.vue'
   import { cset, cget } from '../../common/storage.js'

   // 信息获取
   const get = (key, def) => {
     return cget('count', key, def)
   }

   // 信息保存
   const set = (key, value) => {
     return cset('count', key, value)
   }

   export default {
     components: {
       Layout,
     },
     data() {
       return {
         // 读取 count 值
         count: get('count', 0),
       }
     },
     methods: {
       increase() {
         this.count += 1
       },
       reduce() {
         this.count -= 1
       },
     },
     watch: {
       // 保存 count 值
       count() {
         set('count', this.count)
       },
     },
   }
   </script>

   <style scoped>
   /* flex 竖向居中 */
   .flex-col-center {
     @apply h-screen flex flex-col justify-center items-center;
   }
   /* flex 横向居中 */
   .flex-row-center {
     @apply flex flex-row flex-nowrap justify-center items-center;
   }
   </style>
   ```

4. 增加插件配置 `common/plugin.js`

   ```js
   export const pluginList = [
     // ...添加如下行
     { name: 'count', size: [1, 1], description: '计数器' },
   ]
   ```

5. 启动 & 打包

   ```bash
   # 调试应用
   pnpm serve
   # 在托盘中启动 count 插件

   # 构建应用
   pnpm build
   # 构建成功后即可在 dist_electron 找到安装包
   ```

### 🍻 更多

> 待续...
>
> 消息通知、HTTP 请求、数据存储等功能请阅读 github 插件源码。

### 🔥 提交代码

1. 请使用 prettier 进行代码格式化

2. 待补充...
