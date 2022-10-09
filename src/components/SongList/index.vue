<template>
  <div>
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
        <tr
          class="el-table__row"
          v-for="(item, index) in playlist"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <!-- v-if="playlist.item"  item.album.coverImgUrl -->
              <img :src="item.al.picUrl" alt="" />
              <!-- 播放按钮 -->
              <span class="iconfont icon-play" @click="play(item.id)"></span>
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
          <td>
            {{ item.ar[0].name }}
          </td>
          <td>
            {{ item.al.name }}
          </td>
          <td>
            {{ item.dt | formatDate }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "SongList",

  data() {
    return {
      // 上一页传过来的音乐id
      id: this.$route.query.id,
      //播放状态
      // playState: false,
      // url:this.url
    };
  },
  // props: ["playlist"],
  props: ["playlist"],
  // playlist: {
  //   type: Array,
  //   default: [],
  // },

  computed: {
    ...mapState({
      url: (state) => state.discovery.url,
      newlists: (state) => state.songsheet.newlists,
    }),
  },

  watch: {
    // playlist(newVal, oldVal) {
    //   if (newVal.length > 0) {
    //     //执行。。。。。。
    //     console.log("我接收到了！");
    //     console.log(newVal);
    //     this.playlist = newVal
    //   }
    // }
  },
  created() {
    this.getList();
    // console.log(this.newlists);
  },
  methods: {
    getList() {
      //最新音乐
      this.$store.dispatch("GetNewSongs", {
        // 传递 设置的数据
        type: this.tag,
      });
    },
    // 播放音乐
    async play(id) {
      // console.log(this.id);
      // this.$store.dispatch("GetSong", id);
      //  if (this.playState) {
        this.$store.dispatch("GetSong", id);
      // }
      // this.$bus.$emit("hello", this.playState);
      // this.playState = !this.playState;
      // console.log(this.url);
      if (this.url === null || this.url == undefined) {
        await this.$message({
          message: "暂无版权！",
          type: "warning",
        });
      }
      // let query = {
      //   url: this.url,
      //   //播放状态
      //   // playState: this.playState,
      // };
      // if (query.url === null || query.url == "" || query.url == undefined) {
      //   await this.$message({
      //     message: "暂无版权！",
      //     type: "warning",
      //   });
      // } else {
      //   // this.playState = true;
      //   // (this.url = (state) => state.discovery.url), console.log(this.url);
      //   console.log(this.url);
      //   this.$bus.$emit("hello", query);
      // }
    },
  },
};
</script>
<style lang="less" scoped>
// 歌单中歌曲
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
            // margin-top: 20px;
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
</style>