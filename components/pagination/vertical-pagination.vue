<template>
<div v-if="totalRow">
<vue-ads-pagination
    :total-items="totalRow"
    :max-visible-pages="maxVisiblePages"
    :page="page"
    :loading="loading"
    :items-per-page="itemsPerPage"
    @range-change="rangeChange"
    @page-change="pageChange"
  >
    <template slot-scope="props">
      <div class="vue-ads-pr-2 vue-ads-leading-loose">
        Hiển thị từ {{ props.start }} đến {{ props.end }} của {{ totalRow }} sản phẩm
      </div>
    </template>
    <template slot="buttons" slot-scope="props">
      <vue-ads-page-button
        v-for="(button, key) in props.buttons"
        :key="key"
        v-bind="button"
        @page-change="page = button.page"
      />
    </template>
    </vue-ads-pagination>
</div>
  
</template>

<script>
import { mapState,mapActions } from "vuex";
import VueAdsPagination, { VueAdsPageButton } from "vue-ads-pagination";
import Pagination from './Pagination.vue';
import PageButton from './PageButton.vue';

export default {
  components: {
    VueAdsPagination,
    VueAdsPageButton,
    PageButton,
    Pagination,
  },
  props: {
    pageProps: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      loading: false,
      page: this.pageProps,
      maxVisiblePages: 4,
      itemsPerPage: 21
    };
  },
   computed: {
    ...mapState({
      totalRow: state => state.product_catalogue.productsListByCatalogue.totalRow
    })
  },
  methods: {
    ...mapActions({
      actFetchListProductByCatalogue:
        "product_catalogue/actFetchListProductByCatalogue"
    }),
    pageChange(page) {
      this.pageProps = page;
    },

    rangeChange(start, end) {
    
      this.$emit('handeEmitPage',this.page)

      
    }
  }
};
</script>

<style>
  

</style>

