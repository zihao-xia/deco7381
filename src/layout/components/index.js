export { default as Sidebar } from './Sidebar.vue'
export { default as Navbar } from './Navbar.vue'
export { default as Dashboard } from './Dashboard.vue'

// 引用方式
//import { Header, Sidebar } from './components/'
// './components/'  它会优先在 components 文件夹下寻找index.js文件
// 其次会是 index.vue 文件。这样做是方便维护
// 不再是
//import Header from './components/Header.vue'
//import Sidebar from './components/Sidebar.vue'