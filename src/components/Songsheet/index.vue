
<template>
  <div>
    <div class="items">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="img-wrap">
          <div class="desc-wrap">
            <span class="desc"></span>
          </div>
          <img :src="`${item.picUrl?item.picUrl:item.coverImgUrl}`" alt="" class="imgt" />
          <!-- 播放按钮 -->
          <span class="iconfont icon-play" @click="toPlaylist(item.id)"></span>
        </div>
        <p class="name">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Songsheet",
  data() {
    return {};
  },
  props: ["list"],
  methods: {
    // 去歌单详情页
    toPlaylist(id) {
      // 跳转并携带数据即可
      this.$router.push(`/playlist?id=${id}`);
      // console.log(id);
    },
  },
};
</script>
<style lang="less" scoped>

.items {
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 200px;
      margin: 10px;
      position: relative;
      overflow: hidden;
     

      .img-wrap {
        position: relative;
        &:hover {
          .icon-play {
            opacity: 1;
          }
        }
        &:hover {
          .desc-wrap {
            top: 0;
          }
        }
        .desc-wrap {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          font-size: 16px;
          color: white;
          background: rgba(0, 0, 0, 0.5);
          max-height: 50px;
          padding: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          top: -50px;
          .desc {
            font-size: 14px;
          }
        }
        .imgt {
          width: 200px;
          height: 200px;
          border-radius: 5px;
        }

        .icon-play {
          position: absolute;
          right: 10px;
          bottom: 13px;
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
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: 14px;
      }
    }
  }
</style>