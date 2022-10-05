<template>
    <el-table id="personal-score-table" :data="personalScoreTableData" max-height="600">
            <el-table-column prop="name" label="Teammate" align="center"/>
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
            <el-table-column prop="overdue" label="Overdue" align="center">
                <template #default="scope">
                    <div style="color: #E83939">{{ scope.row.overdue }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="healthScore" label="Health Score" align="center">
                <template #default="scope">
                    <el-progress type="circle" width="60" :percentage="scope.row.healthScore" :color="colors" />
                </template>
            </el-table-column>
            <el-table-column label="Operation" align="center">
                <template #default="scope">
                    <el-button color="#E83939" v-model="scope.row.name">Alarm</el-button>
                </template>
            </el-table-column>
        </el-table>
</template>

<script>
const colors = [
    { color: '#E83939', percentage: 50 },
    { color: '#FF9553', percentage: 80 },
    { color: '#85BB7A', percentage: 100 }
]

const personalScoreTableData = [
    {
        name: 'Tim',
        tasks: 5,
        todo: 0,
        inProgress: 0,
        done: 5,
        overdue: 0,
        healthScore: 100,
    },
    {
        name: 'Ben',
        tasks: 10,
        todo: 1,
        inProgress: 1,
        done: 8,
        overdue: 2,
        healthScore: 60,
    },
    {
        name: 'Tony',
        tasks: 5,
        todo: 3,
        inProgress: 2,
        done: 0,
        overdue: 3,
        healthScore: 40,
    }
]

export default {
    name: 'PersonalHealthScore',
    data() {
        return {
            colors,
            personalScoreTableData
        }
    }
}
</script>

<style scoped>
#personal-score-table {
    margin-top: 40px;
}
</style>