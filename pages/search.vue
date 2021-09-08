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
            <article-item
              :item="v"
              :isStyleCard="true"
              :isCatalogue="true"
              :isStats="true"
            ></article-item>
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
import ArticleItem from "../components/articles/ArticleItem.vue";
import MainTitle from "../components/MainTitle.vue";
export default {
  head() {
    return {
      title: 'Tìm kiếm - '+this.keyword,
      meta: [
        {
          property: "og:locale",
          content: 'vi_VN',
        },{
          hid: "description",
          name: "description",
          charset: "UTF-8",
          content: '',
        },{
          name: "og:type",
          property: "og:type",
          content: 'website',
        },{
          name: "og:title",
          property: "og:title",
          content: '',
        },{
          name: "og:image",
          content: '',
        },{
          name: "og:description",
          content: '',
        },{
          name: "twitter:card",
          content: 'summary',
        },{
          name: "twitter:title",
          content: '',
        },{
          name: "twitter:description",
          content: '',
        },{
          name: "twitter:image",
          content: '',
        }
      ],
    };
  },
  components: { MainTitle, ArticleItem },
  watchQuery: ["keyword"],
  validate({ query }) {
    if (!query.keyword || query.keyword.trim() == "") {
      return false; // if the params are valid
    }
    return true; // will stop Nuxt.js to render the route and display the error page
  },
  async asyncData({ store, query }) {
    await store.dispatch("article/actFetchNewsList", {
      keyword: query.keyword,
    });
    return {
      keyword: query.keyword,
    };
  },
  computed: {
    ...mapState({
      newsList: (state) => state.article.newsList.posts,
      page: (state) => state.article.newsList.page,
      totalPage: (state) => state.article.newsList.totalPage,
      totalRow: (state) => state.article.newsList.totalRow,
    }),
    hasMoreArticles() {
      return this.page < this.totalPage;
    },
    createdCheck() {
      return true;
    },
    getTitle() {
      return `${this.totalRow} Results found for "${this.keyword}"`;
    },
  },
  data() {
    return {
      isLoading: false,
      keyword: "",
    };
  },
  methods: {
    ...mapActions({
      actFetchNewsList: "article/actFetchNewsList",
    }),
    handleLoadMore() {
      if (this.isLoading || !this.handleLoadMore) {
        return;
      }
      this.isLoading = true;
      this.actFetchNewsList({
        page: this.page + 1,
        keyword: this.keyword,
      }).then(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>
<style>

</style>