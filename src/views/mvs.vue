<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <!-- 分类切换 地区 -->
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '全部' }"
              @click="area = '全部'"
            >
              全部
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '内地' }"
              @click="area = '内地'"
            >
              内地
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '港台' }"
              @click="area = '港台'"
            >
              港台
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '欧美' }"
              @click="area = '欧美'"
            >
              欧美
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '日本' }"
              @click="area = '日本'"
            >
              日本
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '韩国' }"
              @click="area = '韩国'"
            >
              韩国
            </span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '全部' }"
              @click="type = '全部'"
            >
              全部
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '官方版' }"
              @click="type = '官方版'"
            >
              官方版
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '原声' }"
              @click="type = '原声'"
            >
              原声
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '现场版' }"
              @click="type = '现场版'"
            >
              现场版
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '网易出品' }"
              @click="type = '网易出品'"
            >
              网易出品
            </span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '上升最快' }"
              @click="order = '上升最快'"
            >
              上升最快
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最热' }"
              @click="order = '最热'"
            >
              最热
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最新' }"
              @click="order = '最新'"
            >
              最新
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="mvs">
      <Hotmv :mvs="mvlist" />
    </div>
    <Pager
      :total="total"
      :id="id"
      :limit="limit"
      :getNewlist2="Getplaylists2"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 总条数
      //   total: 20,
      // 上一页传过来的音乐id
      id: this.$route.query.id,
      // 页码
      page: 1,
      // 页容量
      limit: 8,
      //地区
      area: "全部",
      //类型
      type: "全部",
      //排序
      order: "上升最快",
      //
      Getplaylists2: "GetMvList",
    };
  },
  computed: {
    ...mapState({
      //   newlists: (state) => state.songsheet.newlists,
      mvlist: (state) => state.songsheet.mvlist,
      total: (state) => state.songsheet.total,
    }),
  },
  watch: {
    area() {
      //返回第一页
      this.page = 1;
      this.getList();
    },
    type() {
      //返回第一页
      this.page = 1;
      this.getList();
    },
    order() {
      //返回第一页
      this.page = 1;
      this.getList();
    },
  },
  methods: {
    //mv
    getList() {
      //   //mv
      this.$store.dispatch("GetMvList", {
        // 传递 设置的数据
        area: this.area,
        type: this.type,
        order: this.order,
        //数量
        limit: this.limit,
        //偏移值 分页 （页码-1）*数量
        offset: (this.page - 1) * this.limit,
      });
      // 获取 最新音乐数据
      //   axios({
      //     url: "http://localhost:3000/top/song",
      //     method: "get",
      //     params: {
      //       // 传递 设置的数据
      //       type: this.tag,
      //     },
      //   }).then((res) => {
      //     // console.log(res);
      //     this.lists = res.data.data;
      //   });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.mvs-container {
  padding-top: 20px;
  .filter-wrap > div {
    margin-bottom: 30px;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    ul {
      display: flex;
      li:not(:last-child) {
        border-right: 1px solid #f2f2f1;
      }
    }
    span {
      font-size: 14px;
      height: 100%;
    }
    span.title {
      margin: 20px;
      color: gray;
      cursor: pointer;
      padding: 5px 20px;
      &::before {
        content: "", pos;
      }
    }
    span.title.active {
      color: #dd6d60;
      background-color: #fcf6f5;
      border-radius: 20px;
    }
    .seciton-wrap {
      .section-type {
      }
      .tabs-wrap {
        .tab {
          .title {
          }
        }
      }
    }
  }
}
</style>