<template>
  <div class="title">
    <div class="middle-info">Questions</div>
    <div class="middle-info">Comments</div>
    <div class="middle-info">Done</div>
  </div>

  <div class="footer">
    <el-scrollbar class="content-box">
      <div
        class="content-item"
        v-for="(item, index) in questions"
        :key="index"
      >
        <div class="content-item-head">
          <div class="content-item-head-title">
            <span
              class="head-title-color"
              :style="{ backgroundColor: item.color }"
            ></span>
            <span class="head-title-name">{{ item.name }}</span>
          </div>
          <el-icon><UserFilled /></el-icon>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="content-item-footer">
          <span class="footer-time">{{ item.createTime }}</span>
          <div class="footer-status">
            <span
              class="footer-color"
              :style="{ backgroundColor: item.color }"
            ></span>
            <span class="footer-name" @click="handleChangeStatus(item)">{{
              item.username
            }}</span>
          </div>
        </div>
      </div>
      <div class="add-btn" @click="askQuestionVisible = true">
        <el-icon color="#FFFFFF" :size="20"><Plus /></el-icon>
      </div>
    </el-scrollbar>
    <div class="content-box">
      <div
        class="content-item"
        v-for="(item, index) in comments"
        :key="index"
        @click.stop="handleShowComment(item)"
      >
        <div class="content-item-head">
          <div class="content-item-head-title">
            <span
              class="head-title-color"
              :style="{ backgroundColor: item.status }"
            ></span>
            <span class="head-title-name">{{ item.title }}</span>
          </div>
          <el-icon><UserFilled /></el-icon>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="content-item-footer">
          <span class="footer-time">{{ item.time }}</span>
          <div class="footer-status">
            <span
              class="footer-color"
              :style="{ backgroundColor: item.status }"
            ></span>
            <span
              class="footer-name"
              @click.stop="handleQuestionCommentStatus(item)"
              >{{ item.status_name }}</span
            >
          </div>
        </div>
      </div>

    </div>
    <div class="content-box">
      <div class="content-item" v-for="(item, index) in done" :key="index">
        <div class="content-item-head">
          <div class="content-item-head-title">
            <span
              class="head-title-color"
              :style="{ backgroundColor: item.color }"
            ></span>
            <span class="head-title-name">{{ item.name }}</span>
          </div>
          <el-icon><UserFilled /></el-icon>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="content-item-footer">
          <span class="footer-time">{{ item.createTime }}</span>
          <div class="footer-status">
            <span
              class="footer-color"
              :style="{ backgroundColor: item.color }"
            ></span>
            <span class="footer-name" @click="handleChangeStatus(item)">{{
              item.username
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="35%">
    <el-card class="el-card-d" shadow="always">
      <div class="infinite-list-wrapper" style="overflow: auto">
        <el-timeline infinite-scroll-disabled="disabled">
          <div v-if="messages.length > 0">
            <el-timeline-item
              v-for="(item, index) in messages"
              :key="index"
              :timestamp="item.createTime"
              placement="top"
            >
              <el-card class="el-card-m" style="height: 120px">
                <h4>{{ item.memberName }}：</h4>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.content }}</p>
              </el-card>
            </el-timeline-item>
          </div>
          <div v-else>
            <el-timeline-item placement="top">
              <el-card class="el-card-m" style="height: 120px">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Say something</p>
              </el-card>
            </el-timeline-item>
          </div>
        </el-timeline>
      </div>
    </el-card>
  </el-dialog>

  <el-dialog v-model="askQuestionVisible" title="Ask Question">
        <el-form :model="askQuestionForm" :rules="askQuestionRules" ref="askQuestionForm">
            <el-form-item label="Title" label-width="100px" prop="name">
                <el-input v-model="askQuestionForm.name" />
            </el-form-item>
            <el-form-item label="Content" label-width="100px" prop="content">
                <el-input v-model="askQuestionForm.content" />
            </el-form-item>
            <el-form-item label="Color" label-width="100px" prop="color">
                <el-select v-model="askQuestionForm.color" placeholder="Select Color">
                  <el-option label="Red" value="#E71811" />
                  <el-option label="Blue" value="#409EFF" />
                  <el-option label="Yellow" value="#FFCA28" />
                  <el-option label="Green" value="#58A55C" />
                  <el-option label="Purple" value="#8C15B8" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="askQuestionVisible = false">Cancel</el-button>
                <el-button type="primary" @click="ask('askQuestionForm')">Ask</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script>
import { listboard, askQuestion } from '@/api/board'
import { reactive } from 'vue'

const DATA_COMMENTS = [
  {
    id: 7,

    title: 'API error',
    content: 'Error importing file',
    time: '2022-10-2',
    status: '#ffca28',
    status_name: 'incomments',
  },

  {
    id: 8,
    title: 'Unable to connect to the network',
    content: 'Unable to connect to the network',
    time: '2022-10-3',
    status: '#ffca28',
    status_name: 'incomments',
  },
];

const COMMENTS = [
  {
    memberName: 'Anonymous user',
    content: 'There is a problem with your database',
    createTime: '2022-10-1',
  },

  {
    memberName: 'Anonymous user',
    content: 'Try to update the system',
    createTime: '2022-10-12',
  },
];

export default {
  name: 'DiscussionBoard',
  data() {
    return {
      formData: {
        form: {
          title: '',
          content: '',
          commits: [],
          color: '',
        },
      },
      askQuestionVisible: false,
      askQuestionForm: reactive({
        name: '',
        content: '',
        color: '',
        type: 1
      }),
      askQuestionRules: {
        name: [{
            required: true,
            message: 'Enter your question title',
            trigger: 'blur'
        }],
        content: [{
            required: true,
            message: 'Enter your question content',
            trigger: 'blur'
        }],
        color: [{
            required: true,
            message: 'Enter your favorite color',
            trigger: 'change'
        }]
      },
      list: [],
      questions: [],
      done: [],
      comments: DATA_COMMENTS,
      dialogVisible: false,
      dialogTitle: 'Comments',
      messages: COMMENTS,
      query: {}
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      listboard(this.query).then(res => {
        this.list = res.data.data
        this.questions = this.list.filter(item => item.type === 1)
        this.done = this.list.filter(item => item.type === 2)
      })
    },
    ask(form) {
      this.$refs[form].validate(valid => {
          if (valid) {
              askQuestion(this.askQuestionForm).then(res => {
                  this.askQuestionVisible = false
                  this.getList()
              }).catch(res => {
                  console.log(res)
              })
          }
      })
    },
    handleShowComment(item) {
      this.dialogTitle = 'Question is ：' + item.title;
      this.dialogVisible = true;
    },
    handleQuestionCommentStatus(item) {
      this.comments = this.comments.filter(ele => ele.id != item.id);
      this.done.push({
        ...item,
        status: '#03bb7a',
        status_name: 'done',
      });
    },
  },
};
</script>

<style scoped>
.title {
  height: 40px;
  margin: 14px auto;

  display: flex;
  align-items: center;
  text-align: center;

  color: #222;
  background-color: #b3bac1;
}

.middle-info {
  width: 33.33%;
}

.footer {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-around;
}

.content-box {
  width: 30%;
  height: 804px;
  border: 1px solid #bbb;
  border-radius: 10px;
}
.add-btn {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 39px;
  background-color: #8c15b8;
  cursor: pointer;
}

.content-item {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.content-item-head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content-item-head-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head-title-color {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 10px;
}

.content {
  width: 100%;
  font-size: 14px;
  color: #222;
  padding: 14px 10px;
}
.content-item-footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin: 5px 0;
}
.footer-time {
  color: #222;
  font-size: 14px;
}
.footer-status {
  display: flex;
  align-items: center;
}
.footer-color {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 10px;
}
.footer-name {
  cursor: pointer;
}

.infinite-list-wrapper {
  width: 100%;
  margin-bottom: 10px;
}
.submit-message {
  width: 100%;
  background: rgb(235, 245, 247);
  color: cadetblue;
  letter-spacing: 20px;
  margin: 10px 0;
}
.comments {
  width: 100%;
}

.addbtn {
  cursor: pointer;
}
</style>
