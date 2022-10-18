<template>
	<h1 class="title">Task Management</h1>
	<div>
		<el-row class="sub-title" justify="space-between">
            <el-col :span="20"><el-icon><Flag /></el-icon>Upcoming Tasks</el-col>
            <el-col :span="4" style="text-align: right;">
                <el-button :icon="Plus" link @click="addTaskVisible = true" />
            </el-col>
        </el-row>
		<div class="content">
			<el-scrollbar max-height="450px" class="tasks">
				<div
				class="task-list"
                v-for="(task,index) in upcomingTasks"
                :key="index"
                @mouseover="taskHoverIndex = index"
                @mouseleave="taskHoverIndex = null">
                    <p>Task {{index+1}}: {{task.description}}</p>
					<span>
						<el-button :icon="Check" link v-if="taskHoverIndex === index" @click="achieveTask(task.id)" />
						<el-button :icon="Close" link v-if="taskHoverIndex === index" @click="remove(task.id)" />
					</span>
                </div>
			</el-scrollbar>
			<div class="container">
				<img class="profile" src="@/assets/images/profile.png" alt="profile"/>
			</div>
		</div>

		<div class="sub-title"><el-icon><Trophy /></el-icon>Achieved Tasks</div>
		<div class="content">
			<el-scrollbar max-height="450px" class="tasks">
				<p v-for="(task,index) in achievedTasks" :key="index">Task {{index+1}}: {{task.description}}</p>
			</el-scrollbar>
		</div>

		<el-divider></el-divider>

		<h2>Personal Health Score Detail</h2>
		<el-table class="table" :data="healthScore" stripe>
			<el-table-column prop="task" label="Task" align="center" />
			<el-table-column prop="time" label="Time" align="center" />
			<el-table-column prop="status" label="Status" align="center" />
			<el-table-column prop="score" label="Score" width="80" align="center" />
		</el-table>
	</div>

	<el-dialog v-model="addTaskVisible" title="Add Task">
        <el-form :model="addTaskForm" :rules="addTaskRules" ref="addTaskForm">
            <el-form-item label="Title" label-width="100px" prop="name">
                <el-input v-model="addTaskForm.name" />
            </el-form-item>
            <el-form-item label="Description" label-width="100px" prop="description">
                <el-input v-model="addTaskForm.description" />
            </el-form-item>
            <el-form-item label="Due Time" label-width="100px" prop="dueTime">
                <el-date-picker v-model="addTaskForm.dueTime"
                type="date"
                placeholder="Select Due Time"
                value-format="YYYY-MM-DD HH:mm" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addTaskVisible = false">Cancel</el-button>
                <el-button type="primary" @click="add('addTaskForm')">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { Plus, Check, Close } from '@element-plus/icons-vue'
import { reactive, ref, shallowRef } from 'vue'
import store from '@/store'
import { listTasks, addTask, updateTaskStatus, removeTask } from '@/api/tasks'

const healthScore = [
	{
		task: 'Complete assignment 1',
		time: '2022-10-01',
		status: 'Finished',
		score: '+5'
	},
	{
		task: 'Complete quiz 1',
		time: '2022-10-02',
		status: 'Overdue',
		score: '-5'
	},
	{
		task: 'Prepare for week 3 content',
		time: '2022-10-03',
		status: 'Finished',
		score: '+5'
	},
	{
		task: 'Complete quiz 2',
		time: '2022-10-04',
		status: 'Overdue',
		score: '-5'
	}
]

export default {
	name: 'TaskManagement',
	data() {
		return {
			Plus: shallowRef(Plus),
			Check: shallowRef(Check),
			Close: shallowRef(Close),
			taskHoverIndex: null,
			upcomingTasks: [],
			achievedTasks: [],
			addTaskVisible: ref(false),
            addTaskForm: reactive({
                name: '',
                userId: store.getters.userId,
                description: '',
                dueTime: ''
            }),
            addTaskRules: {
                name: [{
                    required: true,
                    message: 'Enter your task title',
                    trigger: 'blur'
                }],
                description: [{
                    required: true,
                    message: 'Enter your task description',
                    trigger: 'blur'
                }],
                dueTime: [{
                    required: true,
                    message: 'Select your task due time',
                    trigger: 'change'
                }]
            },
			tasksed: [],indexs:[],
			healthScore
		}
	},
    mounted() {
        this.getTasks()
    },
	methods: {
		getTasks() {
			listTasks(store.getters.token).then(res => {
				this.upcomingTasks = res.data.data.filter(this.isUpcoming)
				this.achievedTasks = res.data.data.filter(this.isAchieved)
			})
		},
		isUpcoming(task) {
			return task.status == 1 || task.status == 0
		},
		isAchieved(task) {
			return task.status == 2
		},
        add(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    addTask(this.addTaskForm).then(res => {
                        this.addTaskVisible = false
                        this.getTasks()
                    }).catch(res => {
                        console.log(res)
                    })
                }
            })
        },
		achieveTask(id) {
			let param = {
				id: id,
				status: 2
			}
			updateTaskStatus(param).then(res => {
				this.getTasks()
			}).catch(res => {
				console.log(res)
			})
		},
		remove(id) {
			removeTask({id: id}).then(res => {
				this.getTasks()
			}).catch(res => {
				console.log(res)
			})
		}
	},

}
</script>

<style scoped>
.title {
	font-size: 1.5em;
	margin: 30px 0;
}

.sub-title {
	border-bottom: 1px solid var(--el-border-color);
	line-height: 30px;
	font-weight: bold;
	color: #5F5F5F;
}

.content {
	display: flex;
	justify-content: space-between;
	min-height: 250px;
	max-height:450px;
	padding: 0 20px;
}

.tasks {
	width: 60%;
	margin-top: 20px;
	line-height: 2em;
}

.task-list {
	display: flex;
	justify-content: space-between;
}

.container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.profile {
	width: 200px;
	height: 200px;
	border: 1px solid black;
	margin: 5px 5px 5px 0;
	border-radius: 110px;
}

.table {
	width: 100%;
	margin-top: 20px;
}
</style>
