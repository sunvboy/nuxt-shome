<template>
  <p class="article-item__desc" v-html="description.replace(/<[^>]*>?/gm, '').substring(0,200)"></p>
</template>

<script>
export default {
  props:{
    description: {
      propName: {
        type: String,
        default: ''
      }
    },
  }

}
</script>

<style>

</style>