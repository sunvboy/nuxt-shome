<template>
  <div
    v-if="isPopupQuickView && isPopupQuickViewItem"
    id="quickview"
    role="dialog"
    class="modal fade"
    :class="[isPopupQuickView === true ? 'in' : '']"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <button
          type="button"
          class="close"
          style="position: relative; z-index: 9;"
          @click="handleCloseQuickView"
        >
          <span aria-hidden="true"><i class="ion-android-close"></i></span>
        </button>
        <div class="row row-noGutter">
          <div class="modal-left col-sm-6 col-lg-6 col-md-6">
            <carousel
              :productImage="isPopupQuickViewItem.list_image"
            ></carousel>
          </div>
          <div class="modal-right col-sm-6 col-lg-6 col-md-6">
            <h1 class="title-product">
              <i class="ion-arrow-right-b"></i>&nbsp;{{ isPopupQuickViewItem.title }}
            </h1>
            <div class="group-status">
              <span class="first_status" v-if="isPopupQuickViewItem.detailBrand" @click="handleCloseQuickView">Thương hiệu:
                <span class="status_name">
                  <nuxt-link  :to="'/thuong-hieu/' + isPopupQuickViewItem.detailBrand.canonical"><span>{{ isPopupQuickViewItem.detailBrand.title }}</span></nuxt-link>
                </span>
              </span>
              <span class="first_status" v-if="isPopupQuickViewItem.totalComment">
                <span class="line_tt" v-if="isPopupQuickViewItem.detailBrand">|</span> Đánh giá:
                <span class="status_name">{{ isPopupQuickViewItem.totalComment }} lượt đánh giá</span>
              </span>
            </div>
            <div style="display: flex;flex-wrap: wrap;">
              <span>Giá: </span>&nbsp;
              <product-price
                :price="Number(isPopupQuickViewItem.price)"
                :price_sale="Number(isPopupQuickViewItem.price_sale)"
                :price_contact="Number(isPopupQuickViewItem.price_contact)"
              ></product-price>
            </div>
            <div class="section dessum" v-html="isPopupQuickViewItem.description"></div>
            <addto-cart :productCart="productCart"></addto-cart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddtoCart from '../cart/AddtoCart.vue';
import Carousel from "../common/Carousel.vue";
export default {
  components: { Carousel, AddtoCart },
  computed: {
    ...mapState({
      isPopupQuickView: state => state.product_catalogue.isPopupQuickView,
      isPopupQuickViewItem: state => state.product_catalogue.isPopupQuickViewItem
    }),
    productCart(){
      let data = {
        id: this.isPopupQuickViewItem.id,
        title: this.isPopupQuickViewItem.title,
        image: this.isPopupQuickViewItem.image,
        price: this.isPopupQuickViewItem.price,
        price_sale:  this.isPopupQuickViewItem.price_sale,
        price_contact: this.isPopupQuickViewItem.price_contact,
      }
      return data
    }
  },
  methods: {
    ...mapActions({
      actpQuickView: "product_catalogue/isPopupQuickView"
    }),
    handleCloseQuickView() {
      let data = {
        isPopupQuickView: false,
        isPopupQuickViewItem: null
      };
      this.actpQuickView(data);
    }
  }
};
</script>

<style>
@import url("@/assets/css/product-quick-view.css");
</style>
