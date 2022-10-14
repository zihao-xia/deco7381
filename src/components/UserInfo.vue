<template>
	<h1 class="title">Tim</h1>
	<div>
		<div class="sub-title">Description</div>
		<div class="content">
			<el-scrollbar max-height="450px" class="description">
				<p>Hello, I'm Tim!</p>
			</el-scrollbar>
			<div class="container">
				<img class="profile" src="@/assets/images/profile.png" alt="profile"/>
			</div>
		</div>

		<div class="sub-title">Personal Goals</div>
		<div class="content">
			<el-scrollbar max-height="450px" class="goals">
				<p v-for="(goal,index) in goals" :key="index">Goal {{index+1}}: {{goal}}</p>
			</el-scrollbar>
		</div>
		
		<div class="sub-title">Personal Task Status</div>
		<div class="task-status">
			<el-scrollbar max-height="130px" class="status">
				<h3>In progress</h3>
				<p v-for="(task,index) in inProgressTasks" :key="index">Task {{index+1}}: {{task}}</p>
			</el-scrollbar>
			<el-scrollbar max-height="130px" class="status">
				<h3>Future</h3>
				<p v-for="(task,index) in futureTasks" :key="index">Task {{index+1}}: {{task}}</p>
			</el-scrollbar>
			<el-scrollbar max-height="130px" class="status">
				<h3>Done</h3>
				<p v-for="(task,index) in doneTasks" :key="index">Task {{index+1}}: {{task}}</p>
			</el-scrollbar>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserInfo',
	data() {
		return {
			goals: ['go shop mart with mum!'],
			inProgressTasks: [
				'Prepare for midterm exam',
				'Complete asssignment 2',
				'Complete weekly quiz'
			],
			futureTasks: [
				'Complete assignment 3',
				'Complete assignment 4',
				'Complete final exam'
			],
			doneTasks: [
				'Complete assignment 1',
				'Prepare for week 3 content',
				'Prepare for week 4 content'
			]
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

.goals {
	width: 100%;
	margin: 10px 0 10px;
}

.task-status {
	padding: 0 20px;
}

.status{
	margin-top: 20px;
	line-height: 2em;
}
</style>
