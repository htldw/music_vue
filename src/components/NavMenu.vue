<template>
  <div class="index-container">
    <!-- 导航区域 -->
    <div class="nav">
      <ul>
        <li class="nav-li">
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li class="nav-li">
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li class="nav-li">
          <router-link to="/newsongs">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link>
        </li>
        <li class="nav-li">
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 主体区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
    <div class="player">
      <!-- autoplay 自动播放 -->
      <audio ref="audio" :src="this.url"  controls autoplay></audio>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // playState: false, // 音乐播放状态(true暂停, false播放)
      musicUrl:
        "http://m7.music.126.net/20200303182550/8aa5971b1630d1527a922ccd2b97f392/ymusic/035d/0109/520e/478f86cc9f6c6539f7c8ed3e06c1bf8e.mp3",
    };
  },
  computed: {
    ...mapState({
      url: (state) => state.discovery.url,
    }),
  },
  methods: {},
  mounted() {
    //  this.playState = !this.playState // 点击设置对立状态
    // console.log('School',this)
    this.$bus.$on("video", (data) => {
        this.$refs.audio.pause() 
        console.log(data); 
    });
   
  },
  watch: {
     url(){
      this.$refs.audio.play(); 
      
    },
    // playState() {
     
    //   if (!this.playState) {
    //     // 如果状态为false
    //     this.$refs.audio.play(); // 调用audio标签的内置方法play可以继续播放声音
    //   } else {
    //     this.$refs.audio.pause(); // 暂停audio的播放
    //   }
    // },
   
  
  },
};
</script>
<style lang="less" scoped>
.index-container {
  display: flex;
  // 导航区域
  .nav {
    background-color: #ededed;
    width: 200px;
    height: 100%;
    .nav-li {
      height: 60px;
      cursor: pointer;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #e7e7e7;
      }
      .iconfont {
        margin-right: 10px;
        font-size: 20px;
      }
      a {
        color: black;
        padding-left: 30px;
        font-size: 18px;
        line-height: 60px;
        width: 100%;
        height: 100%;
      }
      a.router-link-active {
        color: #dd6d60;
        .iconfont {
          color: #dd6d60;
        }
      }
    }
  }
  // 主体区域
  .main {
    flex: 1;
    overflow-y: scroll;
    padding: 10px 20px;
    div {
      max-width: 1100px;
      margin: 0 auto;
    }
  }
  // 播放标签
  .player {
    background: #f1f3f4;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    audio {
      width: 100%;
      border-radius: none;
      outline: none;
    }
  }
}
</style>