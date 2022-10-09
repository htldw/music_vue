<template>
  <div>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"

    ></el-pagination>
  </div>
</template>
<script>

export default {
  name: "Pager",
  data() {
    return {
      // 页码
      page: 1,
    };
  },
  props: [
      "total","id","limit","getNewlist2"
  ],
  methods: {
    // 分页功能
    handleCurrentChange(val) {
      // 保存页码
      this.page = val;
      this.getNewlist();
    },
    // //获取最新列表
    getNewlist() {
      //获取最新列表
      this.$store.dispatch(`${this.getNewlist2}`, {
        id: this.id,
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
      });
    },
  },
};
</script>
<style  scoped >
     /* //分页器区域 */
  .el-pagination {
    margin-top: 50px;
    text-align: center;

  }

  ::v-deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
    background-color: #dd6d60;
  }
</style>