<template>
  <div class="comments__form" v-if="currentUser && isShow">
      <div class="comments__form--control">
        <div class="comments__section--avatar">
          <a href="javascript:void(0)">
            <img :src="currentUser.avatar" :alt="currentUser.fullname" />
          </a>
        </div>
        <textarea :placeholder="placeholder" v-model="comment"></textarea>
      </div>
      <div class="text-right">
          <app-button @click.native="handleComment" :isLoading="isLoading">Gửi</app-button>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
     placeholder: {
      type: String,
      default: ''
    },
     isShow: {
      type: Boolean,
      default: false
    }
  },computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
    })
  },
  data() {
    return {
      comment: '',
      isLoading: false,
    }
  },
  methods: {
    handleComment() {
      const data = {
        comment: this.comment,
        callback: () => {
          this.comment = '';
          this.isLoading = false;
        }
      }
      this.$emit('postCommentData', data)
    
    }
  },

}
</script>

<style>

</style>