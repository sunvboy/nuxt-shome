<template>
  <li class="item">
    <div class="comments__section">
      <div class="comments__section--avatar">
        <a href="javascript:void(0)">
          <img :src="data.avatar" :alt="data.fullname" />
        </a>
      </div>
      <div class="comments__section--content">
        <a href="javascript:void(0)" class="comments__section--user">{{
          data.fullname
        }}</a>
        <div class="comments__section--time">
          {{ $dayjs(data.created).fromNow() }}
        </div>
        <div class="comments__section--text">
          {{ data.comment }}
        </div>
        <i
          class="ion-reply comments__section--reply"
          @click.prevent="handeShowReply"
        ></i>
      </div>
    </div>
    <cmt-form
      v-on:postCommentData="handleCommentReply"
      :placeholder="`Trả lời bình luận của ${data.fullname}...`"
      :isShow="isShow"
    ></cmt-form>
    <ul class="comments" v-if="commentsReplyPaging.comments.length > 0">
      <li class="item" v-for="v in commentsReplyPaging.comments" :key="v.id">
        <div class="comments__section">
          <div class="comments__section--avatar">
            <a href="javascript:void(0)">
              <img :src="v.avatar" :alt="v.fullname" />
            </a>
          </div>
          <div class="comments__section--content">
            <a href="javascript:void(0)" class="comments__section--user">{{
              v.fullname
            }}</a>
            <p class="comments__section--time">
              {{ $dayjs(v.created).fromNow() }}
            </p>
            <p class="comments__section--text">
              {{ v.comment }}
            </p>
            <!-- <i class="ion-reply comments__section--reply"></i> -->
          </div>
        </div>
      </li>
    </ul>

    <div  class="comments__hidden" v-if="data.count_parent_comment && data.count_parent_comment - commentsReplyPaging.comments.length !== 0">
      <a href="#" @click.prevent="handeLoadReplyComment"><i class="icons ion-ios-undo"></i> Xem thêm {{ data.count_parent_comment - commentsReplyPaging.comments.length }} câu trả lời</a>
    </div>
   
  </li>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CmtForm from "./CmtForm.vue";
export default {
  components: { CmtForm },
  props: {
    data: {
      type: Object,
      default: null,
    },
    moduleid:{
      type: Number,
      default: 0,
    },
    module:{
      type: String,
      default: '',
    }
  },
  data() {
    return {
      isLoading: false,
      isShow: false,
      idNoneComments: [],
    };
  },
  computed: {
    ...mapState({
      hashCommentReply: (state) => state.comment.hashCommentReply,
    }),
    getID() {
      if (!this.data) {
        return 0;
      }
      return Number(this.data.id);
    },
    commentsReplyPaging() {
      const key = "reply-parent-" + this.getID;
      if (this.hashCommentReply.hasOwnProperty(key)) {
        return this.hashCommentReply[key];
      }
      return {
        page: 0,
        totalRow: 0,
        totalPage: 1,
        comments: [],
      };
    },
    hasLoadingCommentsReply() {
      return this.commentsReplyPaging.page < this.commentsReplyPaging.totalPage;
    },
  },
  methods: {
    ...mapActions({
      actFetchListComment: "comment/actFetchListComment",
      actPostNewComment : "comment/actAddComment ",
    }),
    handeLoadReplyComment() {
      if (this.isLoading && !this.handeLoadReplyComment) {
        return;
      }
      this.isLoading = true;
      this.actFetchListComment({
        page: this.commentsReplyPaging.page + 1,
        parentid: this.getID,
        idNoneComments: this.idNoneComments
      }).then(() => {
        this.isLoading = false;
      });
    },
    handeShowReply() {
      this.isShow = !this.isShow;
    },
    handleCommentReply({comment,callback}) {
      this.$store.dispatch('comment/actAddComment',{
        comment: comment,
        moduleid: this.moduleid,
        parentid: this.data.id,
        module: this.module
      }, {root:true}).then((res) => {
        callback();
        if (res.ok) {
          this.idNoneComments.push(res.data.id);
        } else {
          switch (res.error) {
            case "comment_duplicate":
              alert("Bình luận bị trùng, vui lòng kiểm tra lại!");
              break;
            case "comment_flood":
              alert("Nghi vấn spam, vui lòng bình luận chậm lại!");
              break;
            default:
              alert(res.error);
              break;
          }
        }
      });
    },
  },
};
</script>

<style>
</style>