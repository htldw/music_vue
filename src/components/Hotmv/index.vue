<template>
  <div>
    <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index">
          <div class="img-wrap">
            <img class="imgmv" :src="`${item.picUrl?item.picUrl:item.cover}`" alt="" />
            <span class="iconfont icon-play" @click="toMV(item.id)"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <!-- 播放次数 -->
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- mv名 -->
            <div class="name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Hotmv",
  data() {
    return {};
  },
  props: ["mvs"],
  methods:{
     //前往MV
    async toMV(id) {
      // console.log(id);
      this.$router.push(`/mv?id=${id}`);
    },
  }
};
</script>
<style lang="less" scoped>
// 推荐MV
.mvs {
  .title {
    margin-bottom: 20px;
  }
  .items {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    .item {
      width: 250px;
      cursor: pointer;
      .img-wrap {
        width: 100%;
        position: relative;
        &:hover {
          .icon-play:nth-child(2) {
            opacity: 1;
          }
        }
        .imgmv {
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
            position: absolute;
            top: 10px;
            left: -15px;
            font-size: 12px;
            display: flex;
            align-items: center;
            margin-right: 5px;
            opacity: 1;
            color: white;
            background: rgba(255, 255, 255, 0);
          }
          .num {
          }
        }
      }
      .info-wrap {
        .name {
          font-size: 15px;
          margin-bottom: 5px;
        }
        .singer {
          font-size: 14px;
          color: #c5c5c5;
        }
      }
    }
  }
}
</style>