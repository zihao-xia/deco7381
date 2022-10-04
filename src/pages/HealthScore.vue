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
                    <div class="number" v-text="todo" style="color: #C4BAC1"></div>
                </div>
                <div class="content">
                    <div class="title">In Progress</div>
                    <div class="number" v-text="inProgress" style="color: #FF9553"></div>
                </div>
                <div class="content">
                    <div class="title">Done</div>
                    <div class="number" v-text="done" style="color: #85BB7A"></div>
                </div>
            </el-col>
            <el-col :span="4" id="score-chart">
                <div class="chart">
                    <HealthScoreRadialBarChart />
                </div>
            </el-col>
        </el-row>

        <el-table id="project-table" :data="projectTableData" max-height="600">
            <el-table-column prop="name" label="Project Name" align="center"/>
            <el-table-column prop="status" label="Project Status" align="center">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.status === 'Done'">{{ scope.row.status }}</el-tag>
                    <el-tag type="info" v-if="scope.row.status === 'To Do'">{{ scope.row.status }}</el-tag>
                    <el-tag type="warning" v-if="scope.row.status === 'In Progress'">{{ scope.row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="tasks" label="Total Task" align="center"/>
            <el-table-column prop="todo" label="To Do" align="center">
                <template #default="scope">
                    <div style="color: #C4BAC1">{{ scope.row.todo }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="inProgress" label="In Progress" align="center">
                <template #default="scope">
                    <div style="color: #FF9553">{{ scope.row.inProgress }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="done" label="Done" align="center">
                <template #default="scope">
                    <div style="color: #85BB7A">{{ scope.row.done }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="rate" label="Rate" align="center">
                <template #default="scope">
                    <el-progress
                    :text-inside="true"
                    :stroke-width="24"
                    :percentage="scope.row.rate"
                    :color="rateColor"
                    />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import HealthScoreRadialBarChart from '../components/HealthScoreRadialBarChart.vue'

let team = {
    name: 'Pet Alliance',
    project: 4
}

let projectNum = 4, taskNum = 24, todo = 7, inProgress = 2, done = 15

const projectTableData = [
    {
        name: 'Project 1',
        status: 'Done',
        tasks: 5,
        todo: 0,
        inProgress: 0,
        done: 5,
        rate: 100
    },
    {
        name: 'Project 2',
        status: 'In Progress',
        tasks: 10,
        todo: 1,
        inProgress: 1,
        done: 8,
        rate: 80
    },
    {
        name: 'Project 3',
        status: 'In Progress',
        tasks: 5,
        todo: 2,
        inProgress: 1,
        done: 2,
        rate: 40
    },
    {
        name: 'Project 4',
        status: 'To Do',
        tasks: 4,
        todo: 4,
        inProgress: 0,
        done: 0,
        rate: 0
    }
]

const rateColor = (percentage) => {
    if (percentage < 50) {
        return '#F26161'
    } else if (percentage === 100) {
        return '#7AC756'
    } else {
        return '#E29836'
    }
}

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
            done,
            projectTableData,
            rateColor
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

#project-table {
    margin-top: 100px;
}
</style>