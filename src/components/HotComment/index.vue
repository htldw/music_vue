<template>
    <div>
        
          <div class="comment-wrap" v-if="hotComments">
          <p class="title" v-if="hotCount != 0">
            精彩评论
            <span class="number">({{ hotCount }})</span>
          </p>
          <div class="comments-wrap">
            <!-- 评论 -->
            <div v-for="(item, index) in hotComments" :key="index" class="item">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <!-- 昵称 -->
                  <span class="name">{{ item.user.nickname }}:</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- 评论的回复 -->
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name"
                    >{{ item.beReplied[0].user.nickname }}：</span
                  >
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">
                  <div>{{ item.time | formatDate }}</div>
                  <div class="like">{{ item.likedCount }}点赞</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论
            <span class="number">( {{ total }} )</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name"
                    >{{ item.beReplied[0].user.nickname }}：</span
                  >
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">
                  <div>{{ item.time | formatDate }}</div>
                  <div class="like">{{ item.likedCount }}点赞</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name:"HotComment",
    data() {
        return {
            
        }
    },
    props:[
        "hotComments","hotCount","comments","","total"
    ]
}
</script>
<style lang="less" scoped>
     //评论
  .comment-wrap {
    margin-bottom: 70px;
    .title {
      font-size: 20px;
      .number {
        color: black;
        font-size: 18px;
      }
    }
    .comments-wrap {
      .item {
        display: flex;
        padding-top: 20px;
        &:not(:last-child) {
          .content-wrap {
            border-bottom: 1px solid #f2f2f1;
          }
        }
        .icon-wrap {
          margin-right: 15px;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .content-wrap {
          padding-bottom: 20px;
          flex: 1;
          .content {
            .name {
              color: #517eaf;
              font-size: 14px;
            }
            .comment {
              font-size: 14px;
            }
          }
          .re-content {
            padding: 10px;
            background-color: #e6e5e6;
            border-radius: 5px;
          }
          .content,
          .re-content {
            margin-bottom: 10px;
          }
          .date {
            color: #bebebe;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            .like {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
</style>