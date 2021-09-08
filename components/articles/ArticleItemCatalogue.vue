<template>
  <ul class="article-item__categories" v-if="listCatalogue.length > 0">
    <li v-for="v in listCatalogue" :key="v.id">
      <nuxtLink :to="'/danh-muc-bai-viet/'+v.canonical" class="btn btn-category">{{v.title}}</nuxtLink>
      
      </li>
  </ul>
</template>
<script>
export default {
  props: {
    listCatalogue: {
       type: Array,
       default: []
    },
  }
};
</script>

<style>
</style>
