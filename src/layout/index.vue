<template>
    <el-row class="app-wrapper">
        <el-container>
            <!-- Sidebar -->
            <el-aside :width="open? '220px' : '0px'">
                <sidebar :open="open" />
            </el-aside>
            <el-container>
                <!-- Header -->
                <el-header height="50px">
                    <navbar @switchSidebar="switchSidebar" />
                </el-header>
                <div class="main-wrapper">
                    <!-- Main -->
                    <el-main>
                        main
                    </el-main>
                    <!-- Dashboard -->
                    <dashboard />
                </div>
            </el-container>
        </el-container>
  </el-row>
</template>

<script>
import { Sidebar, Navbar, Dashboard } from './components/'

export default {
    name: 'Layout',
    components: {
        Sidebar,
        Navbar,
        Dashboard
    },
    data() {
        return {
            open: true
        }
    },
    methods: {
        switchSidebar() {
            this.open = !this.open
            console.log(this.open)
        }
    }
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.el-aside {
      transition: 0.5s
  }

.el-header {
    padding: 0;
}

.main-wrapper {
    height: 100%;
    display: flex;
}
</style>