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
                        <router-view></router-view>
                    </el-main>
                    <!-- Dashboard -->
                    <div id="dashboard" v-if="!$route.meta.hideDashboard">
                        <dashboard />
                    </div>
                </div>
            </el-container>
        </el-container>
  </el-row>
</template>

<script>
import { Sidebar, Navbar, Dashboard } from '../layout/components'

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
    height: calc(100vh - 50px);
    display: flex;
}

#dashboard {
    width: 40%;
    border-left: 1px solid var(--el-border-color);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
}
</style>