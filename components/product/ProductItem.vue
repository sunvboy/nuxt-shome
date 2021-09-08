<template>
  <div class="product-box" v-if="item">
    <div class="product-thumbnail">
      <nuxt-link :to="`/san-pham/` + item.canonical" ><img :src="item.image" :alt="item.title"/></nuxt-link>
      <div class="product-action">
        <addto-cart :productCart="productCart" :isCatalogue="true"></addto-cart>
        <a href="" class="btn" @click.prevent="handleQuickView">
          <i class="ion-eye"></i>
        </a>

        <a v-if="item.wishlist" href="javascript:void(0)" class="btn" :class="[item.wishlist ? 'current' : '']" @click.prevent="handleDeleteWishList(item.id)" title="Thêm vào sản phẩm yêu thích">
          <i class="ion-heart"></i>
        </a>
        <a v-else href="" class="btn" title="Thêm vào sản phẩm yêu thích" @click.prevent="handleAddWishList(item.id)">
          <i class="ion-heart"></i>
        </a>


      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name">
        <nuxt-link :to="`/san-pham/` + item.canonical" :title="item.title">{{item.title}}</nuxt-link>
      </h3>
      <product-price :price="Number(item.price)" :price_sale="Number(item.price_sale)" :price_contact="Number(item.price_contact)"></product-price>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import AddtoCart from '../cart/AddtoCart.vue';
import ProductPrice from "./ProductPrice.vue";
import { getPriceProductNoneCurrency } from "../../helpers/index";

export default {
  components: { ProductPrice, AddtoCart },
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
     ...mapState({
      currentUser: (state) => state.auth.currentUser,
    }),
     getPriceCart() {
      return getPriceProductNoneCurrency(
        this.item.price,
        this.item.price_sale,
        this.item.price_contact
      );
    },
    productCart(){
      let data = {
        id: this.item.id,
        title: this.item.title,
        canonical: this.item.canonical,
        image: this.item.image,
        price: this.getPriceCart.price_final,
        price_old:  this.getPriceCart.price_old,
      }
      return data
    }
  },
  methods: {
    ...mapActions({
      actpQuickView: "product_catalogue/isPopupQuickView",
      actCreateWishList: "auth/actCreateWishList",

    }),
    handleQuickView() {
      let data = {
        isPopupQuickView: true,
        isPopupQuickViewItem: this.item
      }
      this.actpQuickView(data)
    },
    handleAddWishList(productid){
        if(this.currentUser){
          this.actCreateWishList(productid).then((res) => {
              if (!res.ok) {
                this.$toast.error(res.message).goAway(3000);
              }else{
                this.isWishList = 1;
                this.$toast.success(res.message).goAway(3000);
              }
          });
        }else{
          this.$router.push('/login')
        }
    },
    handleDeleteWishList(id){
      this.$store.dispatch('auth/actDeleteWishList',id).then((res) => {
            if(res.ok) {
              this.$toast.success(res.message).goAway(3000);
            }else{
              this.$toast.error(res.message).goAway(3000);
            }
        })

    }
  },
};
</script>

<style>
@import url("@/assets/css/product-item.css");
</style>
