<template>
    <div id="title">
        <h1>Team Dashboard</h1>
    </div>
    <div id="goals">
        <el-scrollbar id="goal-list">
            <div v-for="goal in goals" :key="goal" class="goal">
                <div class="goal-title">
                    <span class="goal-name">{{ goal.name }}</span>
                    <span class="goal-due">Due date: {{ goal.due }}</span>
                </div>
                <div class="goal-description">Description:
                    <div>{{ goal.description }}</div>
                </div>
            </div>
        </el-scrollbar>
    </div>
    <div id="score">
        <el-link id="score-title" :underline="false" href="/healthScore/team">Team Member & Team Health Score</el-link>
        <HealthScoreChart />
    </div>
</template>

<script>
import HealthScoreChart from './HealthScoreChart.vue'

export default {
  name: 'Dashboard',
  components: {
      HealthScoreChart
  },
  data() {
      return {
          goals: [{name: 'Team Goal 1', due: 'xx/xx/xxxx', description: 'This is a description'},
          {name: 'Team Goal 2', due: 'xx/xx/xxxx', description: 'This is a description'},
          {name: 'Team Goal 3', due: 'xx/xx/xxxx', description: 'This is a description'},
          {name: 'Team Goal 4', due: 'xx/xx/xxxx', description: 'This is a description'},
          {name: 'Team Goal 5', due: 'xx/xx/xxxx', description: 'This is a description'},
          {name: 'Team Goal 6', due: 'xx/xx/xxxx', description: 'This is a description'}]
      }
  }
}
</script>

<style scoped>
#title, #goals {
    width: 80%;
}

#title, #score {
    text-align: center;
}

#title {
    font-size: 2em;
    padding: 50px 0 50px;
}

#goals, #score {
        padding-top: 20px;
        height: 550px;
}

#title, #goals {
    border-bottom: 1px solid var(--el-border-color);
}

#goal-list {
    height: 520px;
    padding: 0 5px;
}

.goal {
    list-style: none;
    height: 100px;
    padding: 5px;
}

.goal-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

#score-title {
    font-size: 1.5em;
    font-weight: bold;
}
</style>