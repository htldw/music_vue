<template>
  <div class="result-container">
    <div class="title-wrap">
      <!-- 标题 v-if="`${activeIndex === 'songs' || 'lists'}`"--> 
      <h2 class="title">{{ $route.query.id }}</h2>
      <span class="sub-title" v-show="ischeck1">找到 {{ count }} 个结果</span>
      <span class="sub-title" v-show="ischeck2">找到 {{ playlistCount }} 个结果</span>
      <span class="sub-title" v-show="ischeck3">找到 {{ mvCount }} 个结果</span>

    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <SongList :playlist="songList" />
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <Songsheet class="items" :list="playlists" />
      </el-tab-pane>
      <el-tab-pane class="mvs" label="MV" name="mv">
        <Hotmv class="items" :mvs="mvs" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // tab切换时 会改变的数据
      activeIndex: "songs",
      id: this.$route.query.id,
      ischeck1:true,
      ischeck2:false,
      ischeck3:false,

    };
  },
  created() {
    this.$store.dispatch("GetSearch", { keywords: this.id, type: 1 });
  },
  methods: {},

  watch: {
    //监听点击了哪个
    activeIndex() {
      let type = 1;
      switch (this.activeIndex) {
        case "songs":
          this.ischeck1 = true
          this.ischeck2 = false
          this.ischeck3 = false

          type = 1;
          this.id = this.$route.query.id;
          break;
        case "lists":
          type = 1000;
          this.ischeck2 = true
          this.ischeck1 = false
          this.ischeck3 = false


          this.id = this.$route.query.id;
          break;
        case "mv":
          type = 1004;
          this.ischeck3 = true
          this.ischeck1 = false
          this.ischeck2 = false

          this.id = this.$route.query.id;
          break;

        default:
          break;
      }
      this.$store.dispatch("GetSearch", { keywords: this.id, type });
    },
  },
  computed: {
    ...mapState({
      songList: (state) => state.playlist.songList,
      count: (state) => state.playlist.count,
      playlistCount: (state) => state.playlist.playlistCount,
      mvCount: (state) => state.playlist.mvCount,

      playlists: (state) => state.playlist.playlists,
      mvs: (state) => state.playlist.mvs,
    }),
  },
};
</script>
<style lang="less" >
.result-container {
  .title-wrap {
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;
    .title {
      margin-right: 10px;
    }
    .sub-title {
      font-size: 15px;
      color: #bebebe;
    }
  }
  .el-tabs__item {
  }
  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>