<template>
    <div class="top">
        <span>{{ $route.params.course }} Teams:</span>
        <span>
            <el-input
            v-model="search"
            placeholder="Search Team"
            clearable
            @input="searchHandler"
            />
        </span>
    </div>

    <div class="container">
        <div class="teams" v-for="team in filteredData" :key="team" to="/healthScore/team">
            <div class="name">{{ team.name }}</div>
            <div class="project">Project: {{ team.project }}</div>
            <div class="leader">Team Leader: {{ team.leader }}</div>
            <el-button type="primary" plain @click="apply(team)">Apply</el-button>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { listteam, updateUserTeam } from '@/api/team'
import store from '@/store'
import { ElMessage } from 'element-plus'

let search = ref('')

export default {
    name: 'Teams',
    data() {
        return {
            teams: [],
            teamsCopy: [],
            search,
            query: {}
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            listteam(this.query).then(res => {
                console.log(res.data.data)
                this.teams = res.data.data
                this.teamsCopy = Object.assign(this.teams)
            })
        },
        searchHandler() {
            if (search.value != '') {
                this.teams = this.teams.filter(team => (team.name).toLowerCase().match(search.value.toLowerCase()))
            } else {
                this.teams = this.teamsCopy
            }
            return this.teams
        },
        apply(team) {
            updateUserTeam({
                id: store.getters.userId,
                teamId: team.id
            }).then(res => {
                ElMessage({
                    message: 'You have joined ' + team.name,
                    type: 'success'
                })
            }).catch(res => {
                ElMessage.error('Sorry, you cannot join for now')
            })
        }
    },
    computed: {
        filteredData() {
            return this.searchHandler()
        }
    }
}
</script>

<style scoped>
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.container {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
}

.teams {
    width: 300px;
    height: 200px;
    border: 2px solid #CCCCCC;
    border-radius: 20px;
    margin: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.project {
    padding-bottom: 60px;
}
</style>