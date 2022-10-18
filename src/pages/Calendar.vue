<template>
  <el-calendar v-model="value">
    <!-- cited from https://juejin.cn/post/7018013519241019400 -->
    <template #dateCell="{data}">
      <div class="calendar-item">
        <div class="calendar-time">
          {{ data.day.split('-').slice(2).join('')}}
        </div>
        <div>
          <span class="remark-text calendar-time" v-for="(item, index) in dealDate(data.day)" :key="index">
            {{ item }}
          </span>
        </div>
      </div>
      </template>
  </el-calendar>
</template>


<script>
import store from '@/store'
import { listTasks } from '@/api/tasks'

export default {
  name: 'Calendar',
  data() {
    return {
      value: new Date(),
      tasks: []
    }
  },
  mounted() {
    this.getTasks()
  },
  methods: {
    getTasks() {
			listTasks(store.getters.token).then(res => {
				this.tasks = res.data.data
			})
		},
    dealDate(day) {
      let task = ''
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].dueTime.includes(day)) {
          task = this.tasks[i].name
          break
        }
      }
      return task
    }
  }
}
</script>