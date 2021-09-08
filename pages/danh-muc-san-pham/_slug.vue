<template>
  <main class="product-list">
    <div class="spacing"></div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <breadcrumb :info="category" :isCatalogue="true"></breadcrumb>
        </div>
        <div class="spacing"></div>
        <div class="sidebar col-md-3 col-12" v-if="attribute_catalogue">
          <filter-catalogue :attribute_catalogue="attribute_catalogue" @handleListPostsEmit="handleFilter"></filter-catalogue>
        </div>
        <div class="main_container col-md-9 col-12">
          <div class="row">
            <div class="col-md-12 col-12">
              <div class="clearfix">
                <sort-by @handleListPostsEmitSort="handleSort"></sort-by>
              </div>
            </div>
            <div class="cards" v-if="posts">
              <div class="products-item" v-for="v in posts" :key="v.id">
                <product-item :item="v"></product-item>
              </div>
            </div>
            <div class="col-md-12 col-12">
              <!-- <vertical-pagination :pageProps="page" @handeEmitPage="handlePage"></vertical-pagination> -->
              <div class="text-center" v-if="hasMoreProductCatalogue">
                <app-button
                  @click.native="handleLoadMore"
                  :isLoading="isLoading"
                  type="primary"
                  :isSizeLarge="true"
                  >Load more</app-button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="spacing"></div>

  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppButton from '../../components/AppButton.vue';
import Breadcrumb from "../../components/Breadcrumb.vue";
import VerticalPagination from "../../components/pagination/vertical-pagination.vue";
import FilterCatalogue from "../../components/product/FilterCatalogue.vue";
import ProductItem from "../../components/product/ProductItem.vue";
import SortBy from "../../components/product/SortBy.vue";

export default {
  components: {
    Breadcrumb,
    SortBy,
    ProductItem,
    FilterCatalogue,
    VerticalPagination,
    AppButton
  },
  validate({ params }) {
    if (!params.slug || params.slug.trim() == "") {
      return false;
    }
    return true;
  },

  watchQuery: ["attr"],
  async asyncData({ store, params, redirect, route }) {
    let query = route.query.attr ? route.query.attr : "";
    let result = await store.dispatch("product_catalogue/actFetchListProductByCatalogue",{slug: params.slug, isAttr: 1, attr: query});
    if (result.ok) {
      return {
        category: result.category,
        attribute_catalogue: result.attribute_catalogue,
      };
    } else {
      redirect("/");
    }
  },
  data() {
    return {
      category: null,
      attribute_catalogue: null,
      sort: "",
      attr: this.$route.query.attr ? this.$route.query.attr : "",
      // page: 0,
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      posts: state => state.product_catalogue.productsListByCatalogue.posts,
      totalRow: state => state.product_catalogue.productsListByCatalogue.totalRow,
      page: state => state.product_catalogue.productsListByCatalogue.page,
      totalPage: state => state.product_catalogue.productsListByCatalogue.totalPage,
    }),
    hasMoreProductCatalogue() {
      return this.page < this.totalPage;
    }
  },
  methods: {
    ...mapActions({
      actFetchListProductByCatalogue:
        "product_catalogue/actFetchListProductByCatalogue"
    }),
    handleSort(sort){
      this.sort = sort
      this.handleListPosts();

    },
    handleFilter(attr){
      this.attr = attr
      this.handleListPosts();
    },
    // handlePage(page){
    //   this.page = page
    //   this.handleListPosts();
    // },
    handleListPosts() {
      this.actFetchListProductByCatalogue({
        slug: this.$route.params.slug,
        isAttr: 1,
        attr: this.attr,
        sort: this.sort,
        page: 1
      }).then(function (response) {
        console.log(response.status)
      })
      .catch(function (error) {
          console.log(error);
      });
      
    },
    handleLoadMore() {
      if (this.isLoading || !this.handleLoadMore) {
        return;
      }
      this.isLoading = true;
      this.actFetchListProductByCatalogue({
        page: this.page + 1,
        slug: this.$route.params.slug,
        isAttr: 1,
        attr: this.attr,
        sort: this.sort,
      }).then(() => {
        this.isLoading = false;
      });
    },
  },
  created () {
    if(this.category){
      const dataSEO= {
          meta_title: this.category.meta_title?this.category.meta_title:this.category.title,
          meta_description: this.category.meta_description?this.category.meta_description.replace(/<[^>]*>?/gm, '').substring(0,320).trim():this.category.description.replace(/<[^>]*>?/gm, '').substring(0,320).trim(),
          meta_images: this.category.image?this.category.image:'',
      }
      this.$parent.$emit("event-seo",dataSEO);
    }
    
  }
};
</script>

<style>
@import url("@/assets/css/product_catalogue.css");
.vue-ads-text-white.vue-ads-cursor-default {
  background: red;
  color: #fff;
}
.fa-angle-left:before {
  content: "\f124";
  display: inline-block;
  font-family: "Ionicons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-rendering: auto;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}
.fa-angle-right:before {
  content: "\f125";
  display: inline-block;
  font-family: "Ionicons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-rendering: auto;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}

</style>
