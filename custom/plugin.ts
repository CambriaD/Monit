/*
 * @Author: fzf404
 * @Date: 2022-05-25 23:18:50
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-22 01:01:19
 * @Description: plugin 配置
 */
interface pluginList {
  name: string
  size: number[]
  description: string
  debug?: boolean
}

/**
 * @description: 插件列表
 * @return {*}
 */
// TODO 调整插件大小为整数
export const pluginList: pluginList[] = [
  { name: 'welcome', size: [1, 1], description: '欢迎' },
  { name: 'count', size: [1, 1], description: '计数器' },
  { name: 'github', size: [2, 1], description: '监控' },
  { name: 'clock', size: [2, 1], description: '翻页时钟' },
  { name: 'todo', size: [1, 1.5], description: '待办' },
  { name: 'camera', size: [2, 1.5], description: '相机' },
  // debug 模式下 build 时不会被打包
  { name: 'live2d', size: [2, 1.5], description: '角色跟踪', debug: true },
  { name: 'bilibili', size: [1, 1], description: '监控', debug: true },
  { name: 'music', size: [2, 1], description: '音乐', debug: true },
]
