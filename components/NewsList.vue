<template>
  
    <div class="articles-list section" v-if="newsList.length !== 0">
      <div class="container">

        <!-- Main Title -->
     
        <main-title title="News List" :isButton="true" titleButton="View more"></main-title>
        <!-- End Main Title -->

        <!-- End Row News List -->
        <div class="row">
          
          <div class="col-12 col-md-6" v-for="v in newsList" :key="v.id">
             <article-item :item="v" :isStyleCard="true" :isCatalogue="false" :isStats="false" :isDescription="false"></article-item>

          </div>
          
        </div>
        <!-- End Row News List -->

        <!-- Btn Loadmore -->
        <div class="text-center" v-if="hasMoreArticles">
          <app-button @click.native="handleLoadMore" :isLoading="isLoading" type="primary" :isSizeLarge="true">Load more</app-button>
        
        </div>

      </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import AppButton from './AppButton.vue'
import ArticleItem from './articles/ArticleItem.vue'
import MainTitle from './MainTitle.vue'
export default {
  components: { MainTitle, ArticleItem, AppButton },
  computed:{
    ...mapState({
      newsList: state => state.article.newsList.posts,
      page: state => state.article.newsList.page,
      totalPage: state => state.article.newsList.totalPage,

    }),
    hasMoreArticles(){
      return this.page < this.totalPage
    }
  },
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    ...mapActions({
      'actFetchNewsList': 'article/actFetchNewsList'
    }),
    handleLoadMore(){
      if(this.isLoading || !this.handleLoadMore){
        return
      }
      this.isLoading = true;
      this.actFetchNewsList({
        page: this.page + 1
      })
      .then(() => {
        this.isLoading = false
      })
    }
  }

}
</script>

<style>

</style>