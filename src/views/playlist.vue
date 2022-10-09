<template>
  <div class="playlist-container">
    <!-- 头部区域 -->
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img class="imgf" :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <img class="avatarimg" :src="playlist.creator.avatarUrl" alt="" />
          <span class="name">{{ playlist.creator.nickname }}/</span>
          <span class="time">{{ playlist.createTime | formatDate }} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <!-- 分类标签 -->
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="tag-wrap">
          <span class="title">歌曲:{{ playlist.trackCount }}首</span>
          &nbsp; &nbsp; &nbsp;
          <span class="title">播放量:{{ playlist.playCount }}</span>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <!-- 简介 -->
          <span class="desc">
            {{ playlist.description }}
          </span>
        </div>
      </div>
    </div>

    <el-tabs v-model="activeIndex">
      <!-- //歌单中歌曲 -->
      <el-tab-pane label="歌曲列表" name="1">
        <SongList :playlist="playlist.tracks" />
      </el-tab-pane>
      <!-- 评论 -->
      <el-tab-pane :label="`评论(${total})`" name="2">
        <!-- 精彩评论 -->
        <HotComment :hotComments="hotComments" :hotCount="hotCount" :comments="comments" :total="total" />
        <!-- 分页器  :getNewlist="getNewlist"-->
        <Pager
          :total="total"
          :id="id"
          :limit="limit"
          :getNewlist2="GetNewComment"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      //显示歌曲列表
      activeIndex: "1",
      // 上一页传过来的音乐id
      id: this.$route.query.id,
      limit: 10,
      // 当前播放的歌曲在本页歌单中的索引
      currentMusicIndex: 0,
      // 页码
      page: 1,
      GetNewComment: "GetNewComment",
    };
  },
  computed: {
    ...mapState({
      playlist: (state) => state.playlist.playlist,
      //热门评论
      hotComments: (state) => state.playlist.hotComments,
      //评论总数
      hotCount: (state) => state.playlist.hotCount,
      //最新评论
      comments: (state) => state.playlist.comments,
      //最新评论总数
      total: (state) => state.playlist.total,
      url: (state) => state.discovery.url,
    }),
  },
  mounted() {
    //派发action,通知vuex发请求
    //歌单详情
    this.$store.dispatch("GetPlaylist", this.id);
    // 获取热门评论
    this.$store.dispatch("GetComment", { id: this.id, type: 2 });
    //获取最新评论
    this.getNewlist();
    // this.$bus.$emit("hello",{ query: this.getNewlist()});
    // console.log(this.getNewlist());
  },

  methods: {
    //获取最新评论

    getNewlist() {
      //  console.log("调用");
      //获取最新评论
      this.$store.dispatch("GetNewComment", {
        id: this.id,
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
      });
    },
  },
};
</script>
<style lang="less" >
.playlist-container {
  margin: auto;
  padding-top: 40px;
  // 歌单详情顶部区域
  .top-wrap {
    display: flex;
    margin-bottom: 12px;
    span {
      font-size: 17px;
    }
    .img-wrap {
      margin-right: 30px;
      .imgf {
        width: 230px;
        height: 230px;
      }
    }
    .info-wrap {
      span {
        &:first-child {
          margin-right: 10px;
        }
      }
      .title {
        margin-bottom: 20px;
      }
      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        .avatarimg {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .name {
          margin-right: 10px;
        }
        .time {
          font-size: 14px;
        }
      }
      .play-wrap {
        width: 120px;
        height: 35px;
        border-radius: 4px;
        background: linear-gradient(to right, #e85e4d, #c6483c);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        span {
          color: white;
        }
        .iconfont {
          margin-right: 8px;
        }
        .text {
          font-size: 16px;
        }
      }
      .tag-wrap {
        display: flex;
        margin-bottom: 15px;
        span {
          margin: 0;
        }
        ul {
          display: flex;
          align-items: center;
          li {
            font-size: 15px;
            &:not(:last-child)::after {
              content: "/";
              margin: 0 4px;
            }
          }
        }
      }
      .desc-wrap {
        span {
          &:last-child {
            font-size: 15px;
          }
        }
      }
    }
  }
  .el-tabs__active-bar {
    background-color: #c3473a;
  }

  .el-tabs__item:hover,
  .el-tabs__item.is-active {
    color: #c3473a;
  }
 
}
</style>