// packages/index.js 核心文件
import { createApp } from "vue";
import { ElTableV2 } from "element-plus";

import 'element-plus/theme-chalk/el-table-v2.css';

export default function (el, props) {
  // 参数说明 插入节点的el、props(所有的配置项、属性等，)、方法、事件
  return createApp(ElTableV2, props).mount(el)
}
