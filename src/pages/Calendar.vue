<template>
  <el-calendar v-model="value">
    <!-- cited from https://juejin.cn/post/7018013519241019400 -->
    <template #dateCell="{data}">
      <div class="calendar-item">
        <div class="calendar-time">
          {{ data.day.split('-').slice(2).join('')}}
        </div>
        <div>
          <span class="remark-text calendar-time" v-for="(item, index) in dealMyDate(data.day)" :key="index">
            {{ item }}
          </span>
        </div>
      </div>
      </template>
  </el-calendar>
</template>


<script>
import { reactive } from 'vue'

const resDate = reactive([
  { date: '2022-10-01', content: 'Task 1' },
  { date: '2022-10-02', content: 'Task 1' },
  { date: '2022-10-03', content: 'Task 1' },
  { date: '2022-10-11', content: 'Task 2' },
  { date: '2022-10-12', content: 'Task 2' },
  { date: '2022-10-13', content: 'Task 2' },
  { date: '2022-10-15', content: 'Task 3' },
  { date: '2022-10-16', content: 'Task 3' },
])

const dealMyDate = (v) => {
  let res = '';
  for (let index = 0; index < resDate.length; index++) {
    if (resDate[index].date == v) {
      res = resDate[index].content;
      break;
    }
  }
  return res;
}

export default {
  name: 'Calendar',
  data() {
    return {
      value: new Date(),
      dealMyDate
    }
  }
}
</script>