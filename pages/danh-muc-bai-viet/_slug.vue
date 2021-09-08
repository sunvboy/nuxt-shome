<template>
  <div class="articles-list section">
    <div class="container">
      <!-- Main Title -->

      <main-title :title="getTitle" :isSearchTitle="true"></main-title>

      <!-- End Main Title -->

      <div v-if="newsList.length !== 0">
        <!-- End Row News List -->
        <div class="row jc-center" v-for="v in newsList" :key="v.id">
          <div class="col-12 col-md-8">
            <div class="popular-news__list--card">
              <article-item
                :item="v"
                :isStyleCard="true"
                :isCatalogue="true"
              ></article-item>
            </div>
          </div>
        </div>

        <!-- End Row News List -->
      </div>

      <!-- Btn Loadmore -->
      <div class="text-center" v-if="hasMoreArticles">
        <app-button
          @click.native="handleLoadMore"
          :isLoading="isLoading"
          type="primary"
          :isSizeLarge="true"
          >Load more</app-button
        >
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import ArticleItem from "../../components/articles/ArticleItem.vue";

export default {
  components: { ArticleItem },
  validate({ params }) {
    if (!params.slug || params.slug.trim() == "") {
      return false;
    }
    return true;
  },
  async asyncData({ store, params, redirect }) {
   
    let result = await store.dispatch("article_catalogue/actFetchListArticleByCatalogue", {
      slug: params.slug,
    });
    if (result.ok) {
      return {
        category: result.category,
      };
    } else {
      redirect("/");
    }
  
  },
  data() {
    return {
      category: null,
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      newsList: (state) => state.article_catalogue.newsListByCatalogue.posts,
      page: (state) => state.article_catalogue.newsListByCatalogue.page,
      totalPage: (state) =>state.article_catalogue.newsListByCatalogue.totalPage,
      totalRow: (state) => state.article_catalogue.newsListByCatalogue.totalRow,
    }),
    hasMoreArticles() {
      return this.page < this.totalPage;
    },
    createdCheck() {
      return true;
    },
    getTitle() {
      return `${this.category.title}`;
    },
  },

  methods: {
    ...mapActions({
      actFetchNewsList: "article_catalogue/actFetchListArticleByCatalogue",
    }),
    handleLoadMore() {
      if (this.isLoading || !this.handleLoadMore) {
        return;
      }
      this.isLoading = true;
      this.actFetchNewsList({
        page: this.page + 1,
        catalogueid: this.category.id,
      }).then(() => {
        this.isLoading = false;
      });
    },
  },
  created () {
    const dataSEO= {
        meta_title: this.category.meta_title?this.category.meta_title:this.category.title,
        meta_description: this.category.meta_description?this.category.meta_description.replace(/<[^>]*>?/gm, '').substring(0,320).trim():this.category.description.replace(/<[^>]*>?/gm, '').substring(0,320).trim(),
        meta_images: this.category.image?this.category.image:'',
    }
    this.$parent.$emit("event-seo",dataSEO);
  },
};
</script>

<style>
</style>