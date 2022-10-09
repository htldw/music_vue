<template>
  <div class="top-container">
    <!-- 左边 -->
    <div class="left-box">
      <div class="icon-wrapper" style="line-height: 55px">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      <!-- <div class="history-wrapper">
                <span class="iconfont icon-arrow-lift"></span>
                <span class="iconfont icon-arrow-right"></span>
            </div> -->
    </div>
    <!-- 右边搜索区域 -->
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <!-- 搜索框 -->
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model="inputValue"
          @keyup.enter="toResult"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 输入的内容
      inputValue: "",
    };
  },
  methods: {
    toResult() {
      // 非空判断
      if (this.inputValue == "") {
        // 提示用户
        this.$message.warning("请输入内容");
      } else {
        // 去搜索页 携带数据
        this.$router.push("/searchresult?id=" + this.inputValue);
        let keywords = this.inputValue;
        this.$store.dispatch("GetSearch", { keywords, type: 1 });
      }
    },
  },

  mounted() {
    //派发action,通知vuex发请求
  },
};
</script>
<style scoped lang="less">
// 外层
.top-container {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #f9f9f9;
  width: 100%;
  // 左边盒子
  .left-box {
    display: flex;
    .icon-wrapper {
      margin-right: 80px;
      .iconfont {
        margin-right: 10px;
        font-size: 12px;
        width: 18px;
        height: 18px;
        display: inline-block;
        text-align: center;
        line-height: 18px;
        &::before {
          opacity: 0;
          transition: 0.2s;
        }
        &:hover::before {
          opacity: 1;
        }
      }
      .icon-home {
        background-color: #dd6d60;
        border-radius: 50%;
      }
      .icon-sami-select {
        background-color: #dcc060;
        border-radius: 50%;
      }
      .icon-full-screen {
        background-color: #84bb58;
        border-radius: 50%;
      }
    }
  }
  // 右边区域
  .right-box {
    display: flex;
    align-items: center;
  }
}
</style>