<template>
  <div>
    <div class="items">
      <div class="item" v-for="(item, index) in songs" :key="index">
        <div class="img-wrap">
          <!-- 封面 -->
          <img class="imgf" :src="item.picUrl" alt="" />
          <span class="iconfont icon-play" @click="play(item.id)"></span>
        </div>
        <div class="song-wrap">
          <!-- 歌名 -->
          <div class="song-name">{{ item.name }}</div>
          <!-- 歌手名 -->
          <div class="singer">{{ item.song.artists[0].name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "NewMusic",
  data() {
    return {
      // playState: false,
      id:''
    };
  },
  props: ["songs"],
 computed: {
    ...mapState({
      url: (state) => state.discovery.url,
      newlists: (state) => state.songsheet.newlists,
    }),
  },
  methods: {
    // 播放音乐
    async play(id) {

      // console.log(id);
      // if (!this.playState) {
        this.$store.dispatch("GetSong", id);
         if (this.url === null || this.url == undefined) {
        await this.$message({
          message: "暂无版权！",
          type: "warning",
        });
      }
      // }
      // console.log(id);
      // this.$bus.$emit("hello", this.playState);      
      // this.playState = !this.playState;
    },
  },

};
</script>
<style lang="less" scoped>
// 最新音乐

.items {
  height: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 15px;
  .item {
    height: 100px;
    width: 50%;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #f5f5f5;
    }
    .img-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        .iconfont {
          opacity: 1;
        }
      }
      .imgf {
        width: 80px;
        height: 80px;
      }
      .iconfont {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        color: #dd6d60;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        font-size: 14px;
        background: rgba(255, 255, 255, 0.8);
        opacity: 0;
        &::before {
          transform: translateX(3px);
        }
      }
    }
    .song-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      padding: 10px;
      font-size: 16px;
      .song-name {
      }
      .singer {
        font-size: 14px;
        color: gray;
      }
    }
  }
}
</style>