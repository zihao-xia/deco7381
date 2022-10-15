<template>
  <div class="s-dialog" v-show="visible">
    <div class="s-item">
      <div class="s-label">
        <span>Title:</span>
      </div>
      <div class="s-value">
        <input
          type="text"
          class="s-input"
          :value="form.title"
          @input="handleInput"
        />
      </div>
    </div>

    <div class="s-item">
      <div class="s-label">
        <span>Question content:</span>
      </div>
      <div class="s-value">
        <textarea
          id="s-textarea"
          cols="30"
          rows="10"
          :value="form.content"
          @input="handleTextarea"
        ></textarea>
      </div>
    </div>

    <div class="s-item">
      <div class="s-label">
        <span>@ :</span>
      </div>
      <div class="s-value">
        <span class="s-checkout-box" v-for="item in checkboxs" :key="item">
          <input
            type="checkbox"
            class="s-checkbox"
            @input="handleCheckbox(item, $event)"
          />
          <span class="s-label">{{ item }}</span>
        </span>
      </div>
    </div>

    <div class="s-item">
      <div class="s-label">
        <span>Select color:</span>
      </div>
      <div class="s-value">
        <span
          type="checkbox"
          class="s-color-item"
          v-for="item in colors"
          :key="item"
          :style="{ backgroundColor: item }"
          @click="handleSelectColor(item)"
        ></span>
      </div>
    </div>

    <div class="btns">
      <div class="confirm" @click="hanldeConfirm">Confirm</div>
      <div class="cancel" @click="handleCancel">Cancel</div>
    </div>
  </div>
</template>

<script>
const COLORS = ['#e83939', '#03bb7a'];
const CHECKBOXS = ['Ben', 'Jack', 'Mary'];
export default {
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  name: 'Popup',
  data() {
    return {
      colors: COLORS,
      checkboxs: CHECKBOXS,
      commits: [],
    };
  },
  methods: {
    handleInput(e) {
      this.$emit('update:form', { ...this.form, title: e.target.value });
    },
    handleTextarea(e) {
      this.$emit('update:form', { ...this.form, content: e.target.value });
    },
    handleCheckbox(name, e) {
      if (e.target.checked) {
        this.commits.push(name);
      } else {
        this.commits = this.commits.filter(item => item != name);
      }
      this.$emit('update:form', { ...this.form, commits: this.commits });
    },

    handleSelectColor(color) {
      this.$emit('update:form', { ...this.form, color });
    },
    hanldeConfirm() {
      this.$emit('on-submit');
    },
    handleCancel() {
      this.$emit('on-close');
    },
  },
};
</script>

<style scoped>
.s-dialog {
  width: 600px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 6px;
  padding: 16px 18px;

  box-shadow: 0 0 10px #222;
}

.s-item {
  width: 100%;

  display: flex;
  align-items: center;

  margin: 10px 0;
}

.s-label {
  width: 100px;
}

.s-value {
  flex: 1;
}

.s-input,
#s-textarea {
  width: 100%;
  height: 40px;
  padding-left: 10px;
}
#s-textarea {
  padding-top: 10px;
}

.s-checkout-box {
  display: inline-block;
  margin: 0 10px;
}
.s-checkbox {
  display: inline-block;
  margin: 0 6px;
  width: 18px;
  height: 18px;
}
.s-color-item {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 0 18px;
  border-radius: 50%;
}

.btns {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm,
.cancel {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  margin: 0 18px;
  cursor: pointer;
}
.confirm {
  color: #fff;
  background-color: #039be5;
}
.cancel {
  color: #fff;
  background-color: #ccc;
}
</style>
