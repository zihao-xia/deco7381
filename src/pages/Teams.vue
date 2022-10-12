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
        <router-link class="teams" v-for="team in filteredData" :key="team" to="/healthScore/team">
            <div class="name">{{ team.name }}</div>
            <div class="project">Project: {{ team.project }}</div>
            <div class="leader">Team Leader: {{ team.leader }}</div>
        </router-link>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
let search = ref('')
let teams = [
    {name: 'Team 1', project: 'AR bike glass', leader: 'Tim'},
    {name: 'Team 2', project: 'AR bike glass', leader: 'Ben'},
    {name: 'Team 3', project: 'AR bike glass', leader: 'Lucy'},
    {name: 'Team 4', project: 'AR bike glass', leader: 'Jack'},
    {name: 'Team 5', project: 'AR bike glass', leader: 'Bob'},
    {name: 'Team 6', project: 'AR bike glass', leader: 'Alex'}
]
let teamsCopy = Object.assign(teams)

export default {
    name: 'Teams',
    data() {
        return {
            teams,
            search
        }
    },
    methods: {
        searchHandler() {
            if (search.value != '') {
                teams = teams.filter(team => (team.name).toLowerCase().match(search.value.toLowerCase()))
            } else {
                teams = teamsCopy
            }
            return teams
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
    display: block;
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