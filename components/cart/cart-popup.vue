<template>
  <div
    v-if="isPopupCart && isPopupCartProduct"
    id="popupCartModal"
    class="modal fade "
    role="dialog"
    :class="[isPopupCart === true ? 'in' : '']"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <button
          type="button"
          class="close"
          style="position: relative; z-index: 9;"
          @click="handleClose"
        >
          <span aria-hidden="true"><i class="ion-android-close"></i></span>
        </button>
        <div class="row row-noGutter">
          <div class="modal-left col-sm-6 col-lg-6 col-md-6">
            <h3 class="title">
              <i class="ion-checkmark-round"></i> Sản phẩm vừa được thêm
              <span class="hidden-xs">vào giỏ hàng</span>
            </h3>
            <div class="modal-body">
              <div class="media">
                <div class="media-left">
                  <div class="thumb-1x1">
                    <img :src="isPopupCartProduct.image" :alt="isPopupCartProduct.title" />
                  </div>
                </div>
                <div class="media-body">
                  <div class="product-title">
                    {{ this.isPopupCartProduct.title }}
                  </div>
                  <div class="product-new-price">
                     <cart-price :price="Number(isPopupCartProduct.price)" :price_old="Number(isPopupCartProduct.price_old)"></cart-price>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-right col-sm-6 col-lg-6 col-md-6">
            <h3 class="title right_title" @click="handleClose">
              <nuxt-link to="/cart/gio-hang"
                ><i class="ion-bag"></i> Giỏ hàng
                <span
                  >(<b class="cart-popup-count">{{ cart.countItem }}</b
                  >)</span
                ></nuxt-link
              >
            </h3>
            <div class="total_price">
              <span>Tổng tiền: </span>
              <span>
                <product-price
                  :price="Number(cart.totalPrice)"
                  :price_sale="0"
                  :price_contact="0"
                ></product-price>
              </span>
            </div>
            <div   @click="handleClose">
              <nuxt-link
              to="/cart/thanh-toan"
              class="btn btn-primary checkout_button btn-full"
              >Tiến hành thanh toán</nuxt-link
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import ProductPrice from "../product/ProductPrice.vue";
import CartPrice from './cart-price.vue';
export default {
  components: { ProductPrice, CartPrice },
  computed: {
    ...mapState({
      isPopupCart: state => state.cart.isPopupCart,
      isPopupCartProduct: state => state.cart.isPopupCartProduct,
    }),
    ...mapGetters({
      cart: "cart/cartInfo"
    })
  },
  methods: {
    ...mapActions({
      handleisPopupCart: "cart/isPopupCart"
    }),
    handleClose() {
      let isdataPopup = {
          isPopupCartProduct: {},
          isPopupCart: false
      }
      this.handleisPopupCart(isdataPopup);
    }
  }
};
</script>

<style>
@import url("@/assets/css/cart/cart-popup.css");
</style>
