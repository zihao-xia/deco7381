<template>
  <div class="middle">
    <div class="middle-info">Team1</div>
    <div class="middle-info">Team2</div>
    <div class="middle-info">Team3</div>
  </div>

  <div class="footer" style="max-height: 100%;height: 700px">
    <div class="content-box" style="max-height: 100%;overflow:
    hidden">
      <div
        class="content-item"
        v-for="(item, index) in TEAM1"
        :key="index"
        @click="handleShowComment(item)"
      >
        <div class="content-item-head">
          <div class="content-item-head-title">
            <span
              class="head-title-color"
              :style="{ backgroundColor: item.status}
              "
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
    <div class="content-box" style="max-height: 100%;overflow: hidden">
      <div
          class="content-item"
          v-for="(item, index) in TEAM2"
          :key="index"
          @click="handleShowComment(item)"
      >
        <div class="content-item-head">
          <div class="content-item-head-title">
            <span
                class="head-title-color"
                :style="{ backgroundColor: item.status}
              "
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
    <div class="content-box" style="max-height: 100%;overflow: hidden">
      <div
        class="content-item"
        v-for="(item, index) in TEAM3"
        :key="index"
        @click="handleShowComment(item)"
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
    </div>
  </div>
  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="35%">
    <el-card class="el-card-d" shadow="always">
      <div class="infinite-list-wrapper" style="overflow: auto">
        <el-timeline infinite-scroll-disabled="disabled">
          <div v-if="comments.length > 0">
            <el-timeline-item
              v-for="(item, index) in comments"
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
const DATA = [
  {
    id: 1,
    title: 'Completion of group plan',
    content: 'Please report the completion of prototype',
    time: '2022-10-25',
    status: '#e83939',
    status_name: 'Urgent',
  },
  {
    id: 2,
    title: 'Check UQ personal email',
    content: 'Each team member reports the inspection',
    time: '2022-10-26',
    status: '#03bb7a',
    status_name: 'Normal',
  },

  {
    id: 3,
    title: 'Weekly work plan summary',
    content: 'Each team member reports the inspection',
    time: '2022-10-30',
    status: '#03bb7a',
    status_name: 'Normal',
  },
  {
    id: 4,
    title: '标题3',
    content: '你好3',
    time: '2022-10-3',
    status: '#e83939',
    status_name: 'Urgent',
  },
  {
    id: 5,
    title: '标题3',
    content: '你好3',
    time: '2022-10-3',
    status: '#e83939',
    status_name: 'Urgent',
  },
  {
    id: 6,
    title: '标题3',
    content: '你好3',
    time: '2022-10-3',
    status: '#e83939',
    status_name: 'Urgent',
  },
];

const COMMENTS = [
  {
    memberName: 'Tom',
    content: 'Perlow calls this vicious cycle the "cycle of responsiveness":' +
        ' Once bosses and colleagues experience an employee\'s increased responsiveness, they increase their demands on the employee\'s time. ',
    createTime: '2022-10-1',
  },

  {
    memberName: 'Lily',
    content: 'Work completed........',
    createTime: '2022-10-2',
  },
  {
    memberName: 'Ben',
    content: 'At present, the hardware system design and the debugging work have already completed,' +
        'μ CLinux transplant work has already completed, and we can use FTP transport protocols to download procedure or document. ',
    createTime: '2022-10-2',
  },
  {
    memberName: 'Traverst',
    content: 'Most of the heavy lifting of parsing the inbound message payload is already done by the time the FileUploader method is called with the submitted data. ',
    createTime: '2022-10-3',
  },
  {
    memberName: 'Alex',
    content: 'It is a time of innocence. Love seems eternal. It is a magic time when everything seems perfect and works effortlessly. ' +
        'Our partner seems to be the perfect fit. We effortless dance together in harmony and rejoice our good fortune. ',
    createTime: '2022-10-3',
  },
  {
    memberName: 'Nove',
    content: 'Half the work is already finished.',
    createTime: '2022-10-3',
  },

];

export default {
  name: 'TutorNotification',
  data() {
    return {
      TEAM1:[
        {
          id: 1,
          title: 'Completion of group plan',
          content: 'Please report the completion of prototype',
          time: '2022-10-25',
          status: '#e83939',
          status_name: 'Urgent',
        },
        {
          id: 2,
          title: 'Check UQ personal email',
          content: 'Each team member reports the inspection',
          time: '2022-10-26',
          status: '#03bb7a',
          status_name: 'Normal',
        },
        {
          id: 3,
          title: 'Submit personal report',
          content: 'Each team member reports the inspection',
          time: '2022-11-26',
          status: '#03bb7a',
          status_name: 'Normal',
        }
      ],
      TEAM2:[
        {
          id: 1,
          title: 'API applicable data submission',
          content: 'Please report the completion of the work',
          time: '2022-10-29',
          status: '#e83939',
          status_name: 'Urgent',
        },
        {
          id: 2,
          title: 'Check UQ personal email',
          content: 'Each team member reports the inspection',
          time: '2022-10-26',
          status: '#03bb7a',
          status_name: 'Normal',
        },
        {
          id: 3,
          title: 'API Avaliable',
          content:
              'the back-end member to check each API that is avaliable',
          time: '2022-10-26',
          status: '#e83939',
          status_name: 'Urgent',
        },
        {
          id: 4,
          title: 'Weekly Meeting',
          content:
              'Each team member reports the inspection',
          time: '2022-11-05',
          status: '#03bb7a',
          status_name: 'Normal',
        },
      ],
      TEAM3:[
        {
          id: 1,
          title: 'Milestone',
          content: 'Please report the completion of group documentation',
          time: '2022-11-25',
          status: '#e83939',
          status_name: 'Urgent',
        },
        {
          id: 2,
          title: 'Check UQ personal email',
          content: 'Each team member reports the inspection',
          time: '2022-10-26',
          status: '#03bb7a',
          status_name: 'Normal',
        },
      ],
      list: DATA,
      questions: [],
      done: [],
      message: '',
      allmessages: [],

      dialogVisible: false,
      dialogTitle: 'Comments',

      comments: COMMENTS,
    };
  },
  mounted() {
    // TODO api request
    this.questions = this.list.filter(
      item => item.status_name === 'Urgent'
    );
    this.done = this.list.filter(item => item.status_name === 'Normal');
  },
  methods: {
    handleChangeStatus(item) {
      if (item.status_name === 'Normal') {
        this.questions = this.questions.filter(ele => ele.id !== item.id);
        this.done.push({
          ...item,
          status: '#03bb7a',
          status_name: 'Normal',
        });
        return;
      }

      this.done = this.done.filter(ele => ele.id !== item.id);
      this.questions.push({
        ...item,
        status: '#e83939',
        status_name: 'Urgent',
      });
    },

    submitMessage() {
      if (
        this.message === '' ||
        this.message.replace(/(^\s*)|(\s*$)/g, '') === ''
      ) {
        this.$message('put some comments');
        return;
      }
      const timer = new Date();

      this.allmessages.push({
        createTime:
          timer.getFullYear() +
          '-' +
          timer.getMonth() +
          '-' +
          timer.getDay() +
          1,
        content: this.message,
        memberName: 'visitor',
      });
    },
    handleShowComment() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.user-img,
.at-img {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin: 0 6px;
}

.right-user-info,
.right-at-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 18px;
}

.user-name,
.at-name {
  font-size: 16px;
  color: #000;
  font-weight: 700;
}

.middle {
  height: 63px;
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
  background-color: #b026e3;
}

.add-img {
  width: 30px;
  height: 30px;
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

.content-item-head-user {
  display: flex;
  align-items: center;
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
