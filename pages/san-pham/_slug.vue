<template>
  <main class="product-list">
    <div class="spacing"></div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="title_full">
            <h2>{{ products.title }}</h2>
          </div>
          <div class="clearfix"></div>
          <div class="bread-crumb">
            <ul class="breadcrumb">
              <li class="home">
                <nuxt-link to="/"><span>Trang chủ</span></nuxt-link>
                <span class="mr_lr">&nbsp;/&nbsp;</span>
              </li>
              <li>
                <nuxt-link :to="'/danh-muc-san-pham/' + products.detailCatalogue.canonical" ><span>{{ products.detailCatalogue.title }}</span></nuxt-link>
                <span class="mr_lr">&nbsp;/&nbsp;</span>
              </li>
              <li>
                <strong><span>{{ products.title }}</span></strong>
              </li>
            </ul>
          </div>
        </div>
        <div class="spacing"></div>
        <div class="col-md-4 col-12">
          <carousel :productImage="products.list_image"></carousel>
        </div>
        <div class="spacing d-xl-none"></div>
        <div class="col-md-5 col-12">
          <h1 class="title-product">
            <i class="ion-arrow-right-b"></i>&nbsp;{{ products.title }}
          </h1>
          <div class="group-status">
            <span class="first_status">Thương hiệu:
              <span class="status_name">
                <nuxt-link :to="'/thuong-hieu/' + products.detailBrand.canonical"><span>{{ products.detailBrand.title }}</span></nuxt-link>
              </span></span>
            <span class="first_status">
              <span class="line_tt">|</span> Đánh giá:
              <span class="status_name">{{ products.totalComment }} lượt đánh giá</span>
            </span>
          </div>
          <div style="display: flex;flex-wrap: wrap;">
            <span>Giá: </span>&nbsp;
            <product-price :price="Number(products.price)" :price_sale="Number(products.price_sale)" :price_contact="Number(products.price_contact)"></product-price>
          </div>
          <div class="section dessum" v-html="products.description"></div>
          <addto-cart :productCart="productCart"></addto-cart>

        </div>
        <div class="spacing d-xl-none"></div>

        <div class="col-md-3 col-12">
          <product-tab></product-tab>
        </div>
        <div class="spacing"></div>
        <div class="col-12">
          <ul class="product-tab clearfix">
            <li class="tab-link " @click="activetab=1" :class="[ activetab === 1 ? 'current' : '' ]">
              <h3><span>Mô tả sản phẩm</span></h3>
            </li>
            <li class="tab-link"  @click="activetab=2" :class="[ activetab === 2 ? 'current' : '' ]">
              <h3><span>Bình luận</span></h3>
            </li>
          </ul>
          <div class="tab-float">
            <div id="tab-1" class="tab-content content_extab " :class="[ activetab === 1 ? 'current' : '' ]">
              <div class="rte" v-html="products.content"></div>
            </div>
            <div id="tab-2" class="tab-content content_extab" :class="[ activetab === 2 ? 'current' : '' ]">
              <div class="rte">
                <comments :id="Number(products.id)" module="product"></comments>
              </div>
            </div>
          </div>
        </div>
      </div>
      <rela-list :relaList="products.relaList"></rela-list>
    </div>
    <div class="spacing"></div>
  </main>
</template>

<script>
import {mapState} from "vuex"
import ProductTab from "../../components/product/product-tab.vue";
import Comments from "../../components/comment/Comments.vue";
import Carousel from "../../components/common/Carousel.vue";
import AddtoCart from '../../components/cart/AddtoCart.vue';
import ProductPrice from '../../components/product/ProductPrice.vue';
import RelaList from '../../components/product/relaList.vue';
import CartPopup from '../../components/cart/cart-popup.vue';
import { getPriceProductNoneCurrency } from "../../helpers/index";

export default {
  components: { ProductTab, Carousel,Comments, AddtoCart, ProductPrice, RelaList, CartPopup },
  validate({ params }) {
    if (!params.slug || params.slug.trim() == "") {
      return false;
    }
    return true;
  },
  watchQuery: ["attr"],
  async asyncData({ store, params, redirect }) {
    let result = await store.dispatch("product/actFetchDetailProudct", {
      slug: params.slug
    });
    if (!result.ok) {
      redirect("/");
    }
  },
  computed: {
    ...mapState({
      products: state => state.product.detailProduct
    }),
    getPriceCart() {
      return getPriceProductNoneCurrency(
        this.products.price,
        this.products.price_sale,
        this.products.price_contact
      );
    },
    productCart(){
      let data = {
        id: this.products.id,
        title: this.products.title,
        canonical: this.products.canonical,
        image: this.products.image,
        price: this.getPriceCart.price_final,
        price_old:  this.getPriceCart.price_old,
      }
      return data
    }
  },
  data() {
    return {
      imgProduct: "/assets/images/1.jpg",
      settings: {
        dots: false,
        infinite: false,
        initialSlide: 2,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: false,
        arrows: true,
        centerMargin: "20px"
      },
      activetab: 1,
    };
  },
  methods: {
    handeImage(img) {
      this.imgProduct = img;
    }
  },
  created () {
    const dataSEO= {
        meta_title: this.products.meta_title?this.products.meta_title:this.products.title,
        meta_description: this.products.meta_description?this.products.meta_description.replace(/<[^>]*>?/gm, '').substring(0,320).trim():this.products.description.replace(/<[^>]*>?/gm, '').substring(0,320).trim(),
        meta_images: this.products.image?this.products.image:'',
    }
    this.$parent.$emit("event-seo",dataSEO);
  }
};
</script>

<style>
@import url("@/assets/css/breadcrumb.css");
@import url("@/assets/css/products.css");
.product-tab .tab-link:hover{
  cursor: pointer;
}

</style>
