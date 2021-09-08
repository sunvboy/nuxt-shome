<template>
  <div class="post-detail__comments">
    <div v-if="isDanger" class="alert alert-danger">{{ txt }}</div>
    <div v-if="isSuccess" class="alert alert-success">{{ txt }}</div>
    <cmt-form
      v-if="currentUser"
      :placeholder="`Nhập bình luận của bạn`"
      :isShow="true"
      v-on:postCommentData="handleComment"
      :isSuccess="isSuccess"
    ></cmt-form>
    <div v-else style="margin-bottom: 10px">
      Vui lòng <nuxt-link to="/login">đăng nhập</nuxt-link> để đăng bình luận
    </div>
    <div v-if="comments.length > 0">
      <p>{{ totalRow }} bình luận</p>
      <ul class="comments">
        <cmt-list-comment
          v-for="v in comments"
          :key="v.id"
          :data="v"
          :moduleid="id"
          module="module"
        ></cmt-list-comment>
      </ul>
    </div>
    <div class="text-center" style="margin-top: 20px" v-if="hasMoreComment">
      <app-button
        @click.native="handleLoadMore"
        :isLoading="isLoading"
        type="primary"
        :isSizeLarge="true"
        >Load more</app-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CmtForm from "./CmtForm.vue";
import CmtListComment from "./CmtListComment.vue";
export default {
  async fetch() {
    try {
      await this.$store.dispatch("comment/actFetchListComment", {
        module: this.module,
        moduleid: this.id,
        parentid: 0,
      });
    } catch (e) {
      console.log(e)
    }
  },
  data() {
    return {
      isLoading: false,
      isDanger: false,
      isSuccess: false,
      txt: false,
      idNoneComments: [],
    };
  },
  components: { CmtForm, CmtListComment },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    module: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState({
      comments: (state) => state.comment.listComment.comments,
      page: (state) => state.comment.listComment.page,
      totalPage: (state) => state.comment.listComment.totalPage,
      totalRow: (state) => state.comment.listComment.totalRow,
      currentUser: (state) => state.auth.currentUser,
    }),
    hasMoreComment() {
      return this.page < this.totalPage;
    },
  },
  methods: {
    ...mapActions({
      actFetchListComment: "comment/actFetchListComment",
      actAddComment: "comment/actAddComment",
    }),
    handleLoadMore() {
      if (this.isLoading || !this.handleLoadMore) {
        return;
      }
      this.isLoading = true;
      this.actFetchListComment({
        page: this.page + 1,
        module: this.module,
        moduleid: this.id,
        parentid: 0,
        idNoneComments: this.idNoneComments,
      }).then(() => {
        this.isLoading = false;
      });
    },
    handleComment({ comment, callback }) {
      this.isDanger = false;
      this.isSuccess = false;
      this.actAddComment({
        comment: comment,
        moduleid: this.id,
        module: this.module,
      }).then((res) => {
        callback();
        if (res.ok) {
          this.idNoneComments.push(res.data.id);
          this.isSuccess = true;
          this.txt = res.message;
          this.testTimeout = setTimeout(() => {
            this.isSuccess = false;
            this.txt = "";
          }, 1500);
        } else {
          this.isDanger = true;
          this.txt = res.message;
        }
      });
    },
  },
};
</script>

<style>
@import url("~/assets/css/comments.css");
@import url("~/assets/css/button.css");
@import url("~/assets/css/alert.css");
</style>