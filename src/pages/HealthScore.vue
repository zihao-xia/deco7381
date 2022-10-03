<template>
    <div class="main">
        <h2>{{ team.name }} Health Score</h2>
        <el-row id="overview" align="middle">
            <el-col :span="8" id="count">
                <div class="content">
                    <div class="title">Projects</div>
                    <div class="number" v-text="projectNum"></div>
                </div>
                <div class="content">
                    <div class="title">Tasks</div>
                    <div class="number" v-text="taskNum"></div>
                </div>
            </el-col>
            <el-col :span="12" id="progress">
                <div class="content">
                    <div class="title">To Do</div>
                    <div class="number" v-text="todo" :style="'color: #C4BAC1'"></div>
                </div>
                <div class="content">
                    <div class="title">In Progress</div>
                    <div class="number" v-text="inProgress" :style="'color: #85BB7A'"></div>
                </div>
                <div class="content">
                    <div class="title">Done</div>
                    <div class="number" v-text="done" :style="'color: #FF9553'"></div>
                </div>
            </el-col>
            <el-col :span="4" id="score-chart">
                <div class="chart">
                    <HealthScoreRadialBarChart />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import HealthScoreRadialBarChart from '../components/HealthScoreRadialBarChart.vue'

let team = {
    name: 'Pet Alliance',
    project: 1
}

let projectNum = 1, taskNum = 20, todo = 5, inProgress = 10, done = 5

export default {
    name: 'Health Score',
    components: {
        HealthScoreRadialBarChart
    },
    data() {
        return {
            team,
            projectNum,
            taskNum,
            todo,
            inProgress,
            done
        }
    }
}
</script>

<style scoped>
.main {
    width: 95%;
    margin: 0 auto;
}

#overview {
    margin-top: 40px;
    height: 300px;
    border: 1px solid #D4D4D4;
}

#overview .el-col {
    height: 90%;
}

#count, #progress {
    border-right: 1px solid #D4D4D4;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.content {
    text-align: center;
    line-height: 100px;
    font-size: 1.2em;
}

.title, .number {
    margin: auto;
}

.chart {
    margin-top: 45px;
}
</style>