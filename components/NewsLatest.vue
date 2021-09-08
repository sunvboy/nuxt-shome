<template>
  <div class="latest-news section">
    <div class="container">
      <main-title title="Bài viết mới nhất" :isButton="false"></main-title>
      <div class="latest-news__list spacing">
        <div v-for="v in latestArticles" :key="v.id" class="latest-news__card">
           <article-item :isStyleCard="false" :item="v"></article-item>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from './articles/ArticleItem.vue'
import {mapState} from 'vuex'
export default {
  components: { ArticleItem },
  computed:{
    ...mapState({
      latestArticles: state => state.article.latestArticles
    })
  }
}
</script>

<style>
@import url(@/assets/css/latest-news-list.css);
</style>
