<template>
  <div class="playlists-container">
    <!-- 头部 -->
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img :src="topList.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">
          {{ topList.name }}
        </div>
        <!-- 介绍 -->
        <div class="info">
          {{ topList.description }}
        </div>
      </div>
      <!-- 背景 -->
      <img :src="topList.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <!-- 主体 -->
    <div class="tab-container">
      <!-- //导航 -->
      <div class="tab-bar">
        <span
          class="item"
          :class="{ active: tag == '全部' }"
          @click="tag = '全部'"
        >
          全部
        </span>
        <span
          class="item"
          :class="{ active: tag == '欧美' }"
          @click="tag = '欧美'"
        >
          欧美
        </span>
        <span
          class="item"
          :class="{ active: tag == '华语' }"
          @click="tag = '华语'"
        >
          华语
        </span>
        <span
          class="item"
          :class="{ active: tag == '流行' }"
          @click="tag = '流行'"
        >
          流行
        </span>
        <span
          class="item"
          :class="{ active: tag == '说唱' }"
          @click="tag = '说唱'"
        >
          说唱
        </span>
        <span
          class="item"
          :class="{ active: tag == '摇滚' }"
          @click="tag = '摇滚'"
        >
          摇滚
        </span>
        <span
          class="item"
          :class="{ active: tag == '民谣' }"
          @click="tag = '民谣'"
        >
          民谣
        </span>
        <span
          class="item"
          :class="{ active: tag == '电子' }"
          @click="tag = '电子'"
        >
          电子
        </span>
        <span
          class="item"
          :class="{ active: tag == '轻音乐' }"
          @click="tag = '轻音乐'"
        >
          轻音乐
        </span>
        <span
          class="item"
          :class="{ active: tag == '影视原声' }"
          @click="tag = '影视原声'"
        >
          影视原声
        </span>
        <span
          class="item"
          :class="{ active: tag == 'ACG' }"
          @click="tag = 'ACG'"
        >
          ACG
        </span>
        <span
          class="item"
          :class="{ active: tag == '怀旧' }"
          @click="tag = '怀旧'"
        >
          怀旧
        </span>
        <span
          class="item"
          :class="{ active: tag == '治愈' }"
          @click="tag = '治愈'"
        >
          治愈
        </span>
        <span
          class="item"
          :class="{ active: tag == '旅行' }"
          @click="tag = '旅行'"
        >
          旅行
        </span>
      </div>
      <!-- //歌单列表 -->
      <div class="tab-content">
        <Songsheet :list="list" />
      </div>
    </div>
    <!-- //分页器 -->
    <!-- 分页器
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
     -->
    <Pager :total="total || 0" :limit="limit" :getNewlist2="Getplaylists2" />
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // 页码
      page: 1,
      limit: 10,
      // 当前选择的数据
      tag: "全部",
      Getplaylists2: "Getplaylists",
    };
  },
  computed: {
    ...mapState({
      topList: (state) => state.songsheet.topList,
      list: (state) => state.songsheet.list,
      total: (state) => state.songsheet.total,
    }),
  },
  watch: {
    tag() {
      // console.log(this.tag);
      // 顶部的 精品歌单
      this.getTopList();
      // 歌单列表
      this.getNewlist();
      // 修改页码为1
      this.page = 1;
    },
  },
  methods: {
    //推荐歌单列表
    getNewlist() {
      this.$store.dispatch("Getplaylists", {
        limit: 10,
        // 起始的值 （页码-1）*每页多少条数据
        offset: (this.page - 1) * 10,
        // 分类数据
        cat: this.tag,
      });
    },
    //顶部的推荐歌单
    getTopList() {
      this.$store.dispatch("GetSongsheet", {
        limit: 1,
        // 分类数据
        cat: this.tag,
      });
    },
  },
  mounted() {
    //派发action,通知vuex发请求
    //顶部的推荐歌单
    this.getTopList();

    //推荐歌单列表
    this.getNewlist();
  },
};
</script>
<style lang="less" scoped>
.playlists-container {
  .top-card {
    padding: 20px;
    height: 200px;
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    .icon-wrap {
      margin-right: 20px;
      z-index: 1;
      img {
        width: 160px;
        height: 160px;
      }
    }
    .content-wrap {
      z-index: 1;
      .tag {
        color: #dfac67;
        border: 1px solid #dfac67;
        width: 100px;
        height: 30px;
        text-align: center;
        border-radius: 5px;
        font-size: 16px;
        line-height: 30px;
        cursor: pointer;
      }
      .title {
        color: white;
        padding-top: 10px;
      }
      .info {
        color: #888482;
        font-size: 14px;
        padding-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }
    }
    .bg {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      filter: blur(20px);
    }
    .bg-mask {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  // 主体
  .tab-container {
    padding-top: 30px;
    .tab-bar {
      display: flex;
      justify-content: flex-end;
      .item {
        font-size: 15px;
        color: gray;
        margin-right: 20px;
        cursor: pointer;
      }
      .item.active {
        color: #dd6d60;
      }
    }
    .tab-content {
      margin-top: 20px;
    }
  }
}
</style>