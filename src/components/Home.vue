<template>
	<h1 class="title">My Work</h1>
	<div>
		<el-row class="sub-title">
            <el-col :span="20">In Progress</el-col>
            <el-col :span="4" style="text-align: right;">
                <el-button :icon="Plus" link @click="addTaskVisible = true" />
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
                    <p>Task {{index+1}}: {{task.description}}</p>
                    <span>
						<el-button :icon="Bottom" link v-if="inProgressHoverIndex === index" @click="shelve(task.id)" />
						<el-button :icon="Close" link v-if="inProgressHoverIndex === index" @click="remove(task.id)" />
					</span>
                </div>
			</el-scrollbar>
		</div>

		<el-row class="sub-title">
            <el-col :span="20">Future</el-col>
        </el-row>
		<div class="content">
			<el-scrollbar max-height="450px" class="tasks">
				<div
                class="container"
                v-for="(task,index) in futureTasks"
                :key="index"
                @mouseover="futureHoverIndex = index"
                @mouseleave="futureHoverIndex = null">
                    <p>Task {{index+1}}: {{task.description}}</p>
                    <span>
                        <el-button :icon="Top" link v-if="futureHoverIndex === index" @click="undertake(task.id)" />
                        <el-button :icon="Close" link v-if="futureHoverIndex === index" @click="remove(task.id)" />
                    </span>
                </div>
			</el-scrollbar>
		</div>
		
		<el-row class="sub-title">
            <el-col :span="20">Done</el-col>
        </el-row>
		<div class="content">
			<el-scrollbar max-height="450px" class="tasks">
				<div
                class="container"
                v-for="(task,index) in doneTasks"
                :key="index"
                @mouseover="doneHoverIndex = index"
                @mouseleave="doneHoverIndex = null">
                    <p>Task {{index+1}}: {{task.description}}</p>
                    <el-button :icon="Close" link v-if="doneHoverIndex === index" @click="remove(task.id)" />
                </div>
			</el-scrollbar>
		</div>
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
                <el-button type="primary" @click="addTask('addTaskForm')">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { Plus, Close, Bottom, Top } from '@element-plus/icons-vue'
import { reactive, ref, shallowRef } from 'vue'
import store from '@/store'
import { listTasks, addTask, updateTaskStatus, removeTask } from '@/api/tasks'

export default {
    name: 'Home',
    data() {
        return {
            Plus: shallowRef(Plus),
            Close: shallowRef(Close),
            Bottom: shallowRef(Bottom),
            Top: shallowRef(Top),
            inProgressHoverIndex: null,
            futureHoverIndex: null,
            doneHoverIndex: null,
            inProgressTasks: [],
            futureTasks: [],
            doneTasks: [],
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
            }
        }
    },
    mounted() {
        this.getTasks()
    },
    methods: {
        getTasks() {
			listTasks(store.getters.token).then(res => {
				this.inProgressTasks = res.data.data.filter(this.isInProgress)
				this.futureTasks = res.data.data.filter(this.isFuture)
				this.doneTasks = res.data.data.filter(this.isDone)
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
        addTask(form) {
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
        shelve(id) {
            let param = {
				id: id,
				status: 0
			}
			updateTaskStatus(param).then(res => {
				this.getTasks()
			}).catch(res => {
				console.log(res)
			})
        },
        undertake(id) {
            let param = {
				id: id,
				status: 1
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

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
