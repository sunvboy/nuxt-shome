<template>
  <div class="popular-news section bg-white-blue" v-if="popularNews.length !== 0">
      <div class="container">

        <!-- Main Title -->
        <main-title title="Popular news" :isViewMore="true" viewMoreText="Xem thêm"></main-title>
        <!-- End Main Title -->

        <div class="popular-news__list spacing">
          <div class="popular-news__list--left">
            <div class="popular-news__list--row">
              <div class="popular-news__list--card">
              <!-- Popular news card -->
              <article-item :item="popularNews[0]" :isStyleCard="true" :isCatalogue="true" :isDescription="true" :isStats="true"></article-item>
              <!-- End Popular news card -->
              </div>
              <div class="popular-news__list--card">
              <!-- Popular news card -->
              <article-item :item="popularNews[1]" :isStyleCard="true" :isCatalogue="true" :isDescription="true" :isStats="true"></article-item>
              <!-- End Popular news card -->
              </div>
             
            </div>

          </div>
          <div class="popular-news__list--right">
            <div class="popular-news__list--row">
              <!-- Popular news card -->
              <article-item :item="popularNews[2]" :isStyleRow="true" :isStyleCard="true" :isCatalogue="true" :isDescription="true" :isStats="true"></article-item>

              <!-- End Popular news card -->
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import ArticleItem from './articles/ArticleItem.vue'

export default {
  components: { ArticleItem },
  computed:{
     ...mapState({
        popularNews: state => state.article.popularNews
      })

    }
}
</script>

<style>
@import url(@/assets/css/popular-news-list.css);
</style>