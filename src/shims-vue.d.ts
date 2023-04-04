/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/* mockjs  */
declare module 'mockjs'

declare module 'xlsx-style'
declare module 'file-saver'