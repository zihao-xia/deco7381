<template>
    <div class="navbar">
      <div class="nav-left">
        <!-- switch -->
        <div class="sidebar-switch" @click="switchSidebar">
            <el-icon :size="18"><Operation /></el-icon>
        </div>

        <!-- breadcrumb -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in levelList" :key="item.path">
              {{ item.meta.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="nav-router">
        <router-link to="/calendar">Calendar</router-link>
        <el-divider direction="vertical" />
        <router-link to="/discussionboard">Discussion Board</router-link>
      </div>

      <!-- user info -->
      <div class="nav-right">
        <el-dropdown class="nav-menu">
        <div class="avatar-wrapper">
            <el-icon><UserFilled /></el-icon>
            <span>{{ name }}</span>
            <el-icon><CaretBottom /></el-icon>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><router-link to="/user">My Board</router-link></el-dropdown-item>
              <el-dropdown-item @click="logout">Sign out</el-dropdown-item>
            </el-dropdown-menu>
        </template>
        </el-dropdown>
      <!-- mentions -->
        <span class="mentions">
          <el-icon><ChatDotRound /></el-icon>
          <span>Mentions(0)</span>
        </span>
      </div>
    </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'Navbar',
  props: {
      open: {
          type: Boolean,
          default: true
      }
  },
  data() {
    return {
      levelList: null,
      name: store.getters.name
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
      switchSidebar() {
          this.$emit('switchSidebar')
      },
      getBreadcrumb() {
        const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
        this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      },
      logout() {
        store.dispatch('user/LogOut').then(() => {
          location.reload()
        })
      }
  }
}
</script>

<style lang="scss">
.navbar {
  width: 100%;
  height: 50px;
  -webkit-box-shadow: 0 1px 4px rgba(0,21,41,0.08);
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);
  display: flex;
  justify-content: space-between;
  .sidebar-switch {
    height: 100%;
    width: 50px;
    padding: 0 15px;
    line-height: 58px;
    float: left;
    cursor: pointer;
  }
  .el-breadcrumb {
    line-height: 50px;
    display: inline-block;
  }
  .nav-router {
    line-height: 50px;
  }
  .nav-menu {
    cursor: pointer;
    height: 50px;
    .avatar-wrapper {
      display: flex;
      align-items: center;
    }
  }
  .mentions {
    margin: 0 20px;
    line-height: 50px;
  }
}
</style>