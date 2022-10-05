<template>
    <div class="main">
        <div class="navi">
            <span style="font-size: 1.5em; font-weight: bold;">
                {{ team.name }} Health Score
            </span>
            <span>
                <router-link class="switchBtn" to="/healthScore/team">
                    <el-button color="#8C15B8" plain>Team</el-button>
                </router-link>
                <router-link class="switchBtn" to="/healthScore/personal">
                    <el-button color="#8C15B8" plain>Personal</el-button>
                </router-link>
            </span>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
let team = {
    name: 'Pet Alliance',
    project: 4
}

export default {
    name: 'HealthScore',
    data() {
        return {
            team
        }
    }
}
</script>

<style scoped>
.main {
    width: 95%;
    margin: 0 auto;
}

.navi {
    display: flex;
    justify-content: space-between;
}

.switchBtn {
    margin-left: 10px;
}
</style>