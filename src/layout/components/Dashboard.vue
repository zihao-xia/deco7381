<template>
    <div id="title">
        <h1 v-if="teamName !== ''">{{ teamName }} Dashboard</h1>
        <div v-else >
            <el-link href="/tutor"><h1>Apply for a team</h1></el-link>
            <el-divider direction="vertical" />
            <el-button text @click="createTeamVisible = true"><h1>Create a team</h1></el-button>
        </div>
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

    <el-dialog v-model="createTeamVisible" title="Create Team">
        <el-form :model="createTeamForm" :rules="createTeamRules" ref="createTeamForm">
            <el-form-item label="Team Name" label-width="100px" prop="name">
                <el-input v-model="createTeamForm.name" />
            </el-form-item>
            <el-form-item label="Project" label-width="100px" prop="project">
                <el-input v-model="createTeamForm.project" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="createTeamVisible = false">Cancel</el-button>
                <el-button type="primary" @click="createTeam('createTeamForm')">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import HealthScoreChart from './HealthScoreChart.vue'
import { listteam, createteam, updateUserTeam } from '@/api/team'
import store from '@/store'
import { reactive, ref } from 'vue'

export default {
  name: 'Dashboard',
  components: {
      HealthScoreChart
  },
  data() {
      return {
          goals: [{name: 'Start Sprint 1', due: '2022-10-07', description: 'Everyone needs to get to work.'},
          {name: 'Finish Sprint 1', due: '2022-10-14', description: 'Everyone needs to finish the work'},
          {name: 'Start Sprint 2', due: '2022-10-21', description: 'We should improve our work.'},
          {name: 'Finish Sprint 2', due: '2022-10-28', description: 'Try to finish the work.'},
          {name: 'Start Sprint 3', due: '2022-11-04', description: 'Time to start your work.'},
          {name: 'Finish Sprint 3', due: '2022-11-11', description: 'The final work for this semester.'}],
          teams: [],
          teamName: '',
          createTeamVisible: ref(false),
          createTeamForm: reactive({
              name: '',
              project: '',
              leader: store.getters.name
          }),
          createTeamRules: {
              name: [{
                  required: true,
                  message: 'Enter your team name',
                  trigger: 'blur'
              }]
          }
      }
  },
  created() {
      this.getTeamName(),
      this.joinCreatedTeam()
  },
  methods: {
      getTeamName() {
          listteam({}).then(async res => {
              this.teams = res.data.data
              for (let i = 0; i < this.teams.length; i++) {
                  if (this.teams[i].id == store.getters.teamId) {
                      this.teamName = this.teams[i].name
                      break
                  }
              }
          })
      },
      createTeam(form) {
          this.$refs[form].validate(valid => {
              if (valid) {
                  createteam(this.createTeamForm).then(async res => {
                      this.joinCreatedTeam()
                  }).catch(res => {
                      console.log(res)
                  }).finally(() => {
                      this.createTeamVisible = false
                      this.getTeamName()
                  })
              }
          })
      },
      joinCreatedTeam() {
          listteam({}).then(async res => {
              this.teams = res.data.data
              for (let i = 0; i < this.teams.length; i++) {
                  if (this.teams[i].leader == store.getters.name) {
                      updateUserTeam({
                            id: store.getters.userId,
                            teamId: this.teams[i].id
                        })
                      break
                  }
              }
          })
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