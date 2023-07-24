<template>
  <div class="comment-wrap">
    <p class="comment-title">
      {{title}}
      <span class="comment-number">({{ commentsTotal }})</span>
    </p>
    <div class="comments-wrap">
      <div class="item" v-for="(item, index) in comments" :key="index">
        <div class="icon-wrap">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="content-wrap">
          <div class="content">
            <span class="name">{{ item.user.nickname }}</span>
            <span class="comment">: {{ item.content }}</span>
          </div>
          <div class="re-content" v-if="item.beReplied.length">
            <span class="name">@{{ item.beReplied[0].user.nickname }}</span>
            <span class="comment">: {{ item.beReplied[0].content }}</span>
          </div>
          <div class="date">{{ item.time | timestamp }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title:{
      type:String,
      default:"最新评论"
    },
    commentsTotal: {
      type: Number,
      default: 0
    },
    comments: {
      type: Array,
      default: () => [
        {
          user: {
            avatarUrl: "",
            nickname: "",
            content: ""
          },
          beReplied: [
            {
              user: {
                nickname: "",
                content: ""
              }
            }
          ],
          time: Date.now()
        }
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-wrap {
  margin-bottom: 70px;

  .comment-title {
    font-size: 20px;

    .comment-number {
      color: black;
      font-size: 20px;
    }
  }

  .item {
    display: flex;
    padding-top: 20px;

    .icon-wrap {
      margin-right: 15px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

    }

    &:not(:last-child) {
      .content-wrap {
        border-bottom: 1px solid #f2f2f1;
      }
    }

    .date {
      color: #bebebe;
      font-size: 14px;
    }

    .content-wrap {
      padding-bottom: 20px;
      flex: 1;

      .name {
        color: #517eaf;
        font-size: 14px;
      }

      .comment {
        font-size: 14px;
      }

      .re-content {
        padding: 10px;
        background-color: #f7f7f7;
        border-radius: 2px;
      }
    }
  }
}

.comment-wrap .item .content-wrap .content,
.comment-wrap .item .content-wrap .re-content {
  margin-bottom: 10px;
}
</style>
