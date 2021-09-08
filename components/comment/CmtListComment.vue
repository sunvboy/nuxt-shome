<template>
  <cmt-list-comment-item :data="data" :moduleid="moduleid" module="module"></cmt-list-comment-item>
</template>

<script>
import CmtListCommentItem from "./CmtListCommentItem.vue";
export default {
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
    },
  },
  components: { CmtListCommentItem },
};
</script>

<style>
</style>