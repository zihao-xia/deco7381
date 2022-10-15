<template>
    <el-row justify="space-between" class="container">
        <el-col class="team" :span="11">
            <h2 class="title">Team</h2>
            <el-scrollbar max-height="90vh">
                <el-card class="notification-box" v-for="notification in teamNotifications" :key="notification">
                    <div class="item">{{ notification.originator }} mentions you:</div>
                    <div class="item">{{ notification.content }}</div>
                    <div class="item">Date: {{ notification.date }}</div>
                </el-card>
            </el-scrollbar>
        </el-col>

        <el-divider direction="vertical" />

        <el-col class="tutor" :span="11">
            <h2 class="title">Tutor</h2>
            <el-scrollbar max-height="90vh">
                <el-card class="notification-box" v-for="notification in tutorNotifications" :key="notification">
                    <div class="item">{{ notification.originator }} mentions you:</div>
                    <div class="item">{{ notification.content }}</div>
                    <div class="item">Date: {{ notification.date }}</div>
                </el-card>
            </el-scrollbar>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'Notification',
    data() {
        return {
            teamNotifications: [
                {
                    originator: 'Bob',
                    content: 'You need to do your task asap.',
                    date: '2022-10-10'
                },
                {
                    originator: 'Bob',
                    content: 'You need to do your task asap.',
                    date: '2022-10-09'
                },
                {
                    originator: 'Bob',
                    content: 'You need to do your task asap.',
                    date: '2022-10-08'
                },
                {
                    originator: 'Bob',
                    content: 'You need to do your task asap.',
                    date: '2022-10-08'
                },
                {
                    originator: 'Bob',
                    content: 'You need to do your task asap.',
                    date: '2022-10-08'
                },
                {
                    originator: 'Bob',
                    content: 'You need to do your task asap.',
                    date: '2022-10-08'
                },
                {
                    originator: 'Bob',
                    content: 'You need to do your task asap.',
                    date: '2022-10-08'
                }
            ],
            tutorNotifications: [
                {
                    originator: 'Bob',
                    content: 'You need to do your task asap.',
                    date: '2022-10-10'
                },
                {
                    originator: 'Bob',
                    content: 'You need to do your task asap.',
                    date: '2022-10-09'
                },
                {
                    originator: 'Bob',
                    content: 'You need to do your task asap.',
                    date: '2022-10-08'
                }
            ]
        }
    }
}
</script>

<style scoped>
.container {
    height: 100%;
    overflow: hidden;
}

.el-divider {
    height: 100%;
}

.title {
    width: 100%;
    height: 2em;
    line-height: 2em;
    background-color: #B3BAC1;
    margin-bottom: 2em;
    text-align: center;
}

.notification-box {
    margin: 2em 0 2em;
    min-height: 200px;
}

.item {
    padding: 20px 0;
}
</style>