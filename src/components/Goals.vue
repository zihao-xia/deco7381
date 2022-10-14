<template>
	<h1 class="title">Personal Goals</h1>
	<div>
		<el-row class="sub-title" justify="space-between">
            <el-col :span="20"><el-icon><Flag /></el-icon>Upcoming Goals</el-col>
            <el-col :span="4" style="text-align: right;">
                <el-button :icon="Plus" link @click="add" />
            </el-col>
        </el-row>
		<div class="content">
			<el-scrollbar max-height="450px" class="goals">
				<div
				class="goal-list"
                v-for="(goal,index) in upcomingGoals"
                :key="index"
                @mouseover="goalHoverIndex = index"
                @mouseleave="goalHoverIndex = null">
                    <p>Goal {{index+1}}: {{goal}}</p>
					<span>
						<el-button :icon="Check" link v-if="goalHoverIndex === index" @click="finish" />
						<el-button :icon="Close" link v-if="goalHoverIndex === index" @click="remove" />
					</span>
                </div>
			</el-scrollbar>
			<div class="container">
				<img class="profile" src="@/assets/images/profile.png" alt="profile"/>
			</div>
		</div>

		<div class="sub-title"><el-icon><Trophy /></el-icon>Achieved Goals</div>
		<div class="content">
			<el-scrollbar max-height="450px" class="goals">
				<p v-for="(goal,index) in achievedGoals" :key="index">Goal {{index+1}}: {{goal}}</p>
			</el-scrollbar>
		</div>

		<el-divider></el-divider>

		<h2>Personal Health Score Detail</h2>
		<el-table class="table" :data="healthScore" stripe>
			<el-table-column prop="task" label="Task" />
			<el-table-column prop="time" label="Time" />
			<el-table-column prop="status" label="Status" />
		</el-table>
	</div>
</template>

<script>
import { Plus, Check, Close } from '@element-plus/icons-vue'

const healthScore = [
	{
		task: 'Complete assignment 1',
		time: '2022-10-01',
		status: 'Finished'
	},
	{
		task: 'Complete quiz 1',
		time: '2022-10-02',
		status: 'Overdue'
	},
	{
		task: 'Prepare for week 3 content',
		time: '2022-10-03',
		status: 'Finished'
	},
	{
		task: 'Complete quiz 2',
		time: '2022-10-04',
		status: 'Overdue'
	}
]

export default {
	name: 'Goals',
	data() {
		return {
			Plus,
			Check,
			Close,
			goalHoverIndex: null,
			upcomingGoals: [
				'Check email box',
				'Reply email',
				'go shop mart with mum!'
			],
			achievedGoals: [
				'Get up early',
				'Buy cat food'
			],
			goalsed: [],indexs:[],
			healthScore
		}
	},
	methods: {
		add() {
			var goal = prompt("Input your goals：");
			if (goal !== '' && goal != null) {
				this.goals.push(goal)
			} else {
				alert('Error')
			}
		},
		finish(item,index){
			this.goalsed.push(item);this.indexs.push(parseInt(index));
		},
		remove(item){
			const index=this.goals.indexOf(item)
			this.goals.splice(index,1);
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

.goals {
	width: 60%;
	margin-top: 20px;
	line-height: 2em;
}

.goal-list {
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
