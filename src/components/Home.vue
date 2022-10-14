<template>
	<h1 class="title">My Work</h1>
	<div>
		<el-row class="sub-title">
            <el-col :span="20">In Progress</el-col>
            <el-col :span="4" style="text-align: right;">
                <el-button :icon="Plus" link />
            </el-col>
        </el-row>
		<div class="content">
			<el-scrollbar max-height="450px" class="tasks">
				<div
                class="container"
                v-for="(task,index) in inProgressTasks"
                :key="index"
                @mouseover="inProgressHoverIndex = index"
                @mouseleave="inProgressHoverIndex = null">
                    <p>Task {{index+1}}: {{task}}</p>
                    <el-button :icon="Close" link v-if="inProgressHoverIndex === index" />
                </div>
			</el-scrollbar>
		</div>

		<el-row class="sub-title">
            <el-col :span="20">Future</el-col>
            <el-col :span="4" style="text-align: right;">
                <el-button :icon="Plus" link />
            </el-col>
        </el-row>
		<div class="content">
			<el-scrollbar max-height="450px" class="tasks">
				<div
                class="container"
                v-for="(task,index) in futureTasks"
                :key="index"
                @mouseover="futureHoverIndex = index"
                @mouseleave="futureHoverIndex = null">
                    <p>Task {{index+1}}: {{task}}</p>
                    <el-button :icon="Close" link v-if="futureHoverIndex === index" />
                </div>
			</el-scrollbar>
		</div>
		
		<el-row class="sub-title">
            <el-col :span="20">Done</el-col>
            <el-col :span="4" style="text-align: right;">
                <el-button :icon="Plus" link />
            </el-col>
        </el-row>
		<div class="content">
			<el-scrollbar max-height="450px" class="tasks">
				<div
                class="container"
                v-for="(task,index) in doneTasks"
                :key="index"
                @mouseover="doneHoverIndex = index"
                @mouseleave="doneHoverIndex = null">
                    <p>Task {{index+1}}: {{task}}</p>
                    <el-button :icon="Close" link v-if="doneHoverIndex === index" />
                </div>
			</el-scrollbar>
		</div>
	</div>
</template>

<script>
import { Plus, Close } from '@element-plus/icons-vue'

export default {
    name: 'Home',
    data() {
        return {
            Plus,
            Close,
            inProgressHoverIndex: null,
            futureHoverIndex: null,
            doneHoverIndex: null,
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
	min-height: 250px;
	max-height:450px;
	padding: 0 20px;
}

.tasks {
	margin-top: 20px;
	line-height: 2em;
}

.container {
	display: flex;
	justify-content: space-between;
}
</style>
