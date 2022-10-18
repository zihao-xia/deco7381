<template>
  <div class="title">
    <div class="middle-info">Questions</div>
    <div class="middle-info">Comments</div>
    <div class="middle-info">Done</div>
  </div>

  <div class="footer">
    <div class="content-box">
      <div
        class="content-item"
        v-for="(item, index) in questions"
        :key="index"
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
            <span class="footer-name" @click="handleChangeStatus(item)">{{
              item.status_name
            }}</span>
          </div>
        </div>
      </div>
      <div class="add-btn" @click="handleAddBtnClick">
        <el-icon color="#FFFFFF" :size="20"><Plus /></el-icon>
      </div>
    </div>
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
      <!-- <div class="add-btn">
        <img src="@/assets/imgs/add.svg" class="add-img" alt="" />
      </div> -->
    </div>
    <div class="content-box">
      <div class="content-item" v-for="(item, index) in done" :key="index">
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
            <span class="footer-name" @click="handleChangeStatus(item)">{{
              item.status_name
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <s-dialog
    :visible="visible"
    v-model="formData"
    @on-submit="handleSubmit"
    @on-close="visible = false"
  ></s-dialog>

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
</template>

<script>
import Popup from './components/Popup.vue';

const DATA = [
  {
    id: 1,
    title: 'check UQ email',
    content: 'before 12pm',
    time: '2022-10-1',
    status: '#e83939',
    status_name: 'in progress',
  },
  {
    id: 2,

    title: 'Studio meeting',
    content: 'before 1pm on STCAL building Four room 202',
    time: '2022-10-2',
    status: '#03bb7a',
    status_name: 'done',
  },

  {
    id: 3,
    title: 'Group Meeting',
    content: 'before 1pm online zoom number is 876523456;',
    time: '2022-10-3',
    status: '#e83939',
    status_name: 'in progress',
  },
];

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
  components: { Popup },
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
      visible: false,
      list: DATA,
      questions: [],
      done: [],
      comments: DATA_COMMENTS,

      dialogVisible: false,
      dialogTitle: 'Comments',

      messages: COMMENTS,
    };
  },
  mounted() {
    // TODO api request
    this.questions = this.list.filter(
      item => item.status_name === 'in progress'
    );
    this.done = this.list.filter(item => item.status_name === 'done');
  },
  methods: {
    handleSubmit() {
      const timer = new Date();
      //TODO api request
      if (this.formData.form.color === '#03bb7a') {
        this.done.push({
          title: this.formData.form.title,
          content: this.formData.form.content,
          time:
            timer.getFullYear() +
            '-' +
            timer.getMonth() +
            '-' +
            timer.getDay() +
            1,
          status: this.formData.form.color,
          status_name: 'done',
        });
      }
      if (this.formData.form.color === '#e83939') {
        this.questions.push({
          title: this.formData.form.title,
          content: this.formData.form.content,
          time:
            timer.getFullYear() +
            '-' +
            timer.getMonth() +
            '-' +
            timer.getDay() +
            1,
          status: this.formData.form.color,
          status_name: 'in progress',
        });
      }

      this.visible = false;
      this.formData.form.title = '';
      this.formData.form.content = '';
      this.formData.form.commits = [];
      this.formData.form.color = '';
    },
    handleAddBtnClick() {
      this.visible = true;
    },

    handleChangeStatus(item) {
      if (item.status_name === 'in progress') {
        this.questions = this.questions.filter(ele => ele.id != item.id);
        this.done.push({
          ...item,
          status: '#03bb7a',
          status_name: 'done',
        });
        return;
      }

      this.done = this.done.filter(ele => ele.id != item.id);
      this.questions.push({
        ...item,
        status: '#e83939',
        status_name: 'in progress',
      });
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
</style>
