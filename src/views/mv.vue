<template>
  <div class="mv-container">
    <!-- //头部视频区域 -->
    <div class="mv-wrap">
      <h3 class="title">详情</h3>
      <div class="video-wrap">
        <video ref="video" autoplay controls :src="url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="icon" alt="" />
          </div>
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：{{ mvInfo.publishTime }}</span>
          <span class="number">播放：{{ mvInfo.playCount }}次</span>
          <p class="desc">
            {{ mvInfo.desc }}
          </p>
        </div>
      </div>
      <HotComment
        :hotComments="hotComments"
        :hotCount="hotTotal"
        :comments="comments"
        :total="total"
      />
      <Pager
        :total="total || 0"
        :id="id"
        :limit="limit"
        :getNewlist2="GetMvComment"
      />
    </div>
    <!-- 相关视频 -->
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div
            v-for="(item, index) in simiMvs"
            :key="index"
            class="item"
            @click="toMV(item.id)"
          >
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount }}</div>
              </div>
              <span class="time">{{ item.duration | formatDate }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // 上一页传过来的音乐id
      id: this.$route.query.id,
      limit: 10,
      // 页码
      page: 1,
      GetMvComment: "GetMvComment",
      videomes: "暂停音乐",
    };
  },
  computed: {
    ...mapState({
      url: (state) => state.mv.url,
      simiMvs: (state) => state.mv.simiMvs,
      mvInfo: (state) => state.mv.mvInfo,
      uid: (state) => state.mv.uid,
      icon: (state) => state.mv.icon,
      hotComments: (state) => state.mv.hotComments,
      hotTotal: (state) => state.mv.hotTotal,
      comments: (state) => state.mv.comments,
      total: (state) => state.mv.total,
    }),
  },
  methods: {
    // 去mv详情页
    toMV(id) {
      this.$router.push(`/mv?id=${id}`);
      this.$router.go(0);
    },
    getList() {
      this.$store.dispatch("GetMvUrl", { id: this.id });
    },
    getMvList() {
      this.$store.dispatch("GetUrl", { mvid: this.id });
    },
    getMvDetail() {
      this.$store.dispatch("GetMvDetail", { mvid: this.id });
    },
    getArtists() {
      setTimeout(() => {
        this.$store.dispatch("GetArtists", { id: this.uid });
      }, 800);
    },
    getMvComment() {
      this.$store.dispatch("GetMvComment", {
        id: this.id,
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
      });
    },
  },
  created() {
    this.getList();
    this.getMvList();
    this.getMvDetail();
    this.getArtists();
    this.getMvComment();
  },
  watch: {},
  mounted() {
    this.$bus.$emit("video", this.videomes);
  },
};
</script>
<style lang="less">
.mv-container {
  display: flex;
  .title {
    margin-bottom: 20px;
  }
  // 视频区域
  .mv-wrap {
    width: 700px;
    margin-right: 35px;
    .data {
      margin-right: 25px;
      color: #bebebe;
      font-size: 14px;
    }
    .number {
      color: #bebebe;
      font-size: 14px;
    }
    .video-wrap {
      width: 100%;
      height: 390px;
      margin-bottom: 20px;
      video {
        border-radius: 5px;
        height: 100%;
        width: 700px;
        outline: none;
      }
    }

    // mv信息
    .info-wrap {
      margin-bottom: 50px;

      .singer-info {
        display: flex;
        align-items: center;
        margin-bottom: 35px;
        .avatar-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-right: 10px;
          overflow: hidden;
          img {
            height: 100%;
          }
        }
        .name {
        }
      }
      .mv-info {
        .title {
          font-size: 30px;
        }
        .desc {
          font-size: 15px;
          margin-top: 20px;
        }
      }
    }
  }
  //相关视频
  .mv-recommend {
    .title {
      flex: 1;
    }
    .mvs {
      .items {
        display: flex;
        flex-wrap: wrap;
        .item {
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          &:hover {
            background-color: #f5f5f5;
          }
          .img-wrap {
            width: 180px;
            position: relative;
            margin-right: 10px;
            &:hover > .icon-play {
              opacity: 1;
            }
            img {
              width: 100%;
              border-radius: 5px;
            }
            .icon-play {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 40px;
              height: 40px;
              color: #dd6d60;
              font-size: 20px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, 0.8);
              opacity: 0;
              &::before {
                transform: translateX(3px);
              }
            }
            .num-wrap {
              position: absolute;
              color: white;
              top: 0;
              right: 0;
              display: flex;
              align-content: center;
              font-size: 15px;
              padding-right: 5px;
              padding-top: 2px;
              .icon-play {
                font-size: 12px;
                display: flex;
                align-items: center;
                margin-right: 5px;
              }
              .num {
              }
            }
            .time {
              position: absolute;
              bottom: 5px;
              right: 5px;
              color: white;
              font-size: 15px;
            }
          }
          .info-wrap {
            flex: 1;

            .name {
              font-size: 15px;
            }
            .singer {
              font-size: 14px;
              color: #c5c5c5;
            }
          }
        }
      }
    }
  }
}
</style>