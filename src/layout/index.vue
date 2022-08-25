<template>
    <el-row class="app-wrapper">
        <el-container>
            <el-aside width="220px">
                <sidebar />
            </el-aside>
            <el-container>
                <el-header height="50px">header</el-header>
                <el-main>main</el-main>
            </el-container>
        </el-container>
  </el-row>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
    name: 'Layout',
    components: {
        Sidebar
    }
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>