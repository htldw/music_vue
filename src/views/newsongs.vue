<template>
  <div class="songs-container">
    <!-- 头部导航 -->
    <div class="tab-bar">
      <span class="item" @click="tag = 0" :class="{ active: tag == 0 }">
        全部
      </span>
      <span class="item" @click="tag = 7" :class="{ active: tag == 7 }">
        华语
      </span>
      <span class="item" @click="tag = 96" :class="{ active: tag == 96 }">
        欧美
      </span>
      <span class="item" @click="tag = 8" :class="{ active: tag == 8 }">
        日本
      </span>
      <span class="item" @click="tag = 16" :class="{ active: tag == 16 }">
        韩国
      </span>
    </div>
    <!--  :playlist = "newlists" -->

    <!-- <SongList :playlist = "newlists"/> -->
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead class="toptr">
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lists" :key="index" class="el-table__row">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt="" />
              <!-- 播放按钮 -->
              <span @click="play(item.id)" class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span
                  class="iconfont icon-mv"
                  v-if="item.mv !== 0"
                  @click="toMV(item.mv)"
                ></span>
              </div>
            </div>
          </td>
          <td>{{ item.album.artists["0"].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | formatDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      // 分类
      tag: "0",
      lists: [],
    };
  },

  computed: {
    ...mapState({
      newlists: (state) => state.songsheet.newlists,
      url: (state) => state.discovery.url,

    }),
  },
  watch: {
    tag(){
      // console.log(this.tag);
      // 最新音乐
    this.getList();


    }
    
  },
  methods: {
    //最新音乐
    getList() {
      //   //最新音乐
      //   this.$store.dispatch("GetNewSongs", {
      //     // 传递 设置的数据
      //     type: this.tag,
      //   });
      // 获取 最新音乐数据
      axios({
        url: "http://localhost:3000/top/song",
        method: "get",
        params: {
          // 传递 设置的数据
          type: this.tag,
        },
      }).then((res) => {
        // console.log(res);
        this.lists = res.data.data;
      });
    },
    async play(id) {
      // console.log(this.id);
      this.$store.dispatch("GetSong", id);
      // console.log(this.url);
      if (this.url === null || this.url == undefined) {
        await this.$message({
          message: "暂无版权！",
          type: "warning",
        });
      }
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.songs-container {
  // 头部导航
  .tab-bar {
    margin: 20px 0;
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

  // 歌曲
  .el-tabs__active-bar {
    background-color: #c3473a;
  }
  .el-tabs__item:hover,
  .el-tabs__item.is-active {
    color: #c3473a;
  }
  .el-table {
    border-bottom: none;
    border-collapse: collapse;
    .toptr {
      th {
        height: 44px;
        font-weight: normal;
        &:first-child {
          width: 50px;
        }
        &:first-child(2) {
          width: 300px;
        }
        &:first-child(3) {
          width: 200px;
        }
      }
    }

    tbody {
      border-bottom: none;
      tr {
        text-align: center;
        &:nth-child(2n) {
          background-color: #fafafa;
        }
        &:hover {
          background-color: #f5f7fa;
        }
        td {
          border-bottom: none;
          padding: 12px 0;
          &:first-child {
            padding-left: 10px;
          }
          .img-wrap {
            position: relative;
            width: 70px;
            height: 70px;

            img {
              width: 70px;
              height: 70px;
              border-radius: 5px;
            }
            .icon-play {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 25px;
              height: 25px;
              color: #dd6d60;
              font-size: 12px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, 0.8);
              &::before {
                transform: translateX(1px);
              }
            }
          }
          .song-wrap {
            span {
              //   margin-top: 22px;
              display: inline-block;
              // color: #bebebe;
            }
            .name-wrap {
              .icon-mv {
                padding-left: 5px;
                color: #dd6d60;
              }
            }
          }
        }
      }
    }
  }
  .el-table.playlit-table th {
    &:nth-child(2) {
      width: 130px;
    }
    &:nth-child(3) {
      width: 300px;
    }
    &:nth-child(4) {
      width: 200px;
    }
  }
}
</style>