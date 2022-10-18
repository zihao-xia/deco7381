<template>
	<h1 class="title">{{ name }}</h1>
	<div>
		<div class="sub-title">Description</div>
		<div class="content">
			<el-scrollbar max-height="450px" class="description">
				<p>Hello, I'm {{ name }}!</p>
			</el-scrollbar>
			<div class="container">
				<img class="profile" src="@/assets/images/profile.png" alt="profile"/>
			</div>
		</div>

		<div class="sub-title">Personal Tasks</div>
		<div class="content">
			<el-scrollbar max-height="450px" class="tasks">
				<p v-for="(task,index) in tasks" :key="index">Task {{index+1}}: {{task.description}}</p>
			</el-scrollbar>
		</div>
		
		<div class="sub-title">Personal Task Status</div>
		<div class="task-status">
			<h3 class="status-title">In progress</h3>
			<el-scrollbar max-height="130px" class="status">
				<p v-for="(task,index) in inProgressTasks" :key="index">Task {{index+1}}: {{task.description}}</p>
			</el-scrollbar>
			<h3 class="status-title">Future</h3>
			<el-scrollbar max-height="130px" class="status">
				<p v-for="(task,index) in futureTasks" :key="index">Task {{index+1}}: {{task.description}}</p>
			</el-scrollbar>
			<h3 class="status-title">Done</h3>
			<el-scrollbar max-height="130px" class="status">
				<p v-for="(task,index) in doneTasks" :key="index">Task {{index+1}}: {{task.description}}</p>
			</el-scrollbar>
			<h3 class="status-title">Overdue</h3>
			<el-scrollbar max-height="130px" class="status">
				<p v-for="(task,index) in overdueTasks" :key="index">Task {{index+1}}: {{task.description}}</p>
			</el-scrollbar>
		</div>
	</div>
</template>

<script>
import store from '@/store'
import { listTasks } from '@/api/tasks'

export default {
	name: 'UserInfo',
	data() {
		return {
			name: store.getters.name,
			tasks: [],
			inProgressTasks: [],
			futureTasks: [],
			doneTasks: [],
			overdueTasks: []
		}
	},
	mounted() {
		this.getTasks()
	},
	methods: {
		getTasks() {
			listTasks(store.getters.token).then(res => {
				this.tasks = res.data.data
				this.inProgressTasks = this.tasks.filter(this.isInProgress)
				this.futureTasks = this.tasks.filter(this.isFuture)
				this.doneTasks = this.tasks.filter(this.isDone)
				this.overdueTasks = this.tasks.filter(this.isOverdue)
			})
		},
		isInProgress(task) {
			return task.status == 1
		},
		isFuture(task) {
			return task.status == 0
		},
		isDone(task) {
			return task.status == 2
		},
		isOverdue(task) {
			return task.status == 3
		}
	}
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

.description {
	width: 60%;
	margin: 10px 0 10px;
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

.tasks {
	width: 100%;
	margin: 10px 0 10px;
	line-height: 2em;
}

.task-status {
	padding: 0 20px;
}

.status-title {
	margin: 10px 0 0;
}

.status{
	line-height: 2em;
}
</style>
