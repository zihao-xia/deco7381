<template>
  <el-row class="sidebar">
    <el-col class="sidebar-container" :style="`width:${open ? '220' : '0'}px;`">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          class="el-menu-vertical-demo"
          :router="true"
          background-color="#8c15b8"
          text-color="#fff"
          active-text-color="#fff"
        >
          <el-row>
            <el-col id="menu-title">
              <span><img src="@/assets/images/Logo.png" alt="logo" style="width: 50px;"></span>
              <p>Teamwork</p>
            </el-col>
          </el-row>
          <!-- <div v-for="(item, i) in routers" :key="i">
            <el-submenu v-if="item.children" :index="item.path" class="hide-tile">
              <template #title>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item v-for="(children, index) in item.children" :key="index" :index="item.path + '/' +children.path">{{ children.name }}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.path">
              <template #title>{{ item.name }}</template>
            </el-menu-item>
          </div> -->
          <el-menu-item index="/">
            <el-icon><HomeFilled /></el-icon>
            <span>Home</span>
          </el-menu-item>
          <el-menu-item index="/notification">
            <el-icon><Bell /></el-icon>
            <span>Notification</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <el-icon><DataBoard /></el-icon>
            <span>My Board</span>
          </el-menu-item>
          <el-sub-menu index="">
            <template #title>
              <span class="sub-menu-title">Show More</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/taskmanagement">
                <el-icon><Trophy /></el-icon>Task Management
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/tutor">
                <el-icon><Service /></el-icon>Tutor Page
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/tutorNotification">
                <el-icon><Bell /></el-icon>Tutor Notification
              </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu v-for="workspace in workspaces" :key="workspace" :index="workspace.name">
              <template #title>
                <span class="sub-menu-title">{{ workspace.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>
                  <el-icon><User /></el-icon>{{ workspace.leader }}
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { listteam } from '@/api/team'

export default {
  name: 'Sidebar',
  props: {
    open: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      workspaces: [],
      query: {}
    }
  },
  computed: {
      ...mapGetters([
      'routers'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      listteam(this.query).then(res => {
          this.workspaces = res.data.data
      })
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100vh;
}

#menu-title {
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 40px 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.el-menu-item, .sub-menu-title {
  padding-left: 50px !important;
  font-weight: bold;
}

.el-menu-item-group {
  background-color: #47026d;
}
</style>