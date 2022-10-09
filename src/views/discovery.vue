
<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="banner-el" :interval="3000" type="card" height="230px">
      <!-- 循环获取到的接口数据 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" class="bannerimg" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->

    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <Songsheet :list="list" />
    </div>

    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <NewMusic :songs="songs" />
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <Hotmv :mvs="mvs" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },

  mounted() {
    //派发action,通知vuex发请求
    //轮播图
    this.$store.dispatch("getBannerList");
    //推荐歌单
    this.$store.dispatch("GetPersonalized");
    // 最新音乐
    this.$store.dispatch("GetNewsong");
    // 推荐mv
    this.$store.dispatch("GetMv");
  },

  computed: {
    ...mapState({
      banners: (state) => state.discovery.banners,
      list: (state) => state.discovery.list,
      songs: (state) => state.discovery.songs,
      mvs: (state) => state.discovery.mvs,
      url: (state) => state.discovery.url,
    }),
  },
  methods: {
    // //   获取音乐url
    // async playMusic(id) {
    //   this.$store.dispatch("GetSong", id);
    //   let url = this.url;
    //   if (url === null || url == "" || url == undefined) {
    //     this.$message({
    //       message: "暂无版权！",
    //       type: "warning",
    //     });
    //   } else {
    //     // console.log(this.$parent.musicUrl)
    //     // 设置给父组件的 播放地址
    //     this.$parent.musicUrl = url;
    //   }
    // },

    // 去mv详情页
    toMV(id) {
      this.$router.push(`/mv?id=${id}`);
    },
  },
};
</script>
<style lang="less" scoped>
.discovery-container {
  //  height: 230px;
  //轮播图区域
  .banner-el {
    .bannerimg {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  //最新音乐
  .news {
    margin-bottom: 40px;
    .title {
      font-weight: normal;
      margin-bottom: 20px;
      padding-left: 8px;
    }
  }
  // 推荐歌单
  .recommend {
    margin-bottom: 40px;
    .title {
      font-weight: normal;
      margin-bottom: 20px;
      padding-left: 8px;
    }
  }
  // 推荐mv
  .mvs {
    margin-bottom: 40px;
    .title {
      font-weight: normal;
      margin-bottom: 20px;
      padding-left: 8px;
    }
  }
}
</style>