<template>
  <main>
    <news-latest></news-latest>
    <news-popular></news-popular>
    <news-list></news-list>
  </main>
</template>

<script>
import {mapState} from 'vuex'
export default {

  async asyncData({store}) {
  
    await Promise.all([
      store.dispatch("article/actFetchLatestArticles"),
      store.dispatch("article/actFetchPopularNews"),
      store.dispatch("article/actFetchNewsList"),
    ]);
  },
  computed: {
    ...mapState({
      fcSystem: state => state.fcSystem
    }),
    
  },
  created () {
   
    this.$parent.$emit("event-seo",{});
  },
};
</script>
<style scoped>

</style>