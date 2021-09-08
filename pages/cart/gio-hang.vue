<template>
  <main class="product-list">
    <div class="spacing"></div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="title_full">
            <h2>Giỏ hàng</h2>
          </div>
          <div class="clearfix"></div>
          <div class="bread-crumb">
            <ul class="breadcrumb">
              <li class="home">
                <nuxt-link to="/"><span>Trang chủ</span></nuxt-link>
                <span class="mr_lr">&nbsp;/&nbsp;</span>
              </li>

              <li>
                <strong><span>Giỏ hàng</span></strong>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12">
          <h1 class="title_cart">
            <a href="javascript:void(0)">Giỏ hàng của bạn
              <span>(<span class="cart-popup-count">{{cart.countItem}}</span> sản phẩm)</span></a>
          </h1>
        </div>
        <div class="col-12 col-lg-8 col-md-8 col-sm-6 pd-right cart_desktop">
          <div class="cart" v-if="listCart">
            <div >
              <div class="bg-scroll">
                <div class="cart-thead">
                  <div class="text-left" style="width: 43%">Sản phẩm</div>
                  <div style="width: 19%" class="a-center">Giá</div>
                  <div style="width: 13%" class="a-center">Số lượng</div>
                  <div style="width: 25%" class="a-center">Thành tiền</div>
                </div>
                <div class="cart-tbody">
                  <div v-for="item in listCart" :key="item.id">
                    <cart-item :item="item"></cart-item>
                  </div>
                </div>
                <div class="btn_bottom">
                  <nuxt-link to="/" class="button btn-continue">Tiếp tục mua hàng</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 col-md-4 col-sm-6">
            <div class="totals">
                <div class="totals">
                    <div class="inner">
                            <div class="wrap_checkprice">
                                <div class="li_table shopping-cart-table-total">
                                    <span class="li-left li_text">Thành tiền:</span>
                                    <span class="li-right totals_price price"><cart-price :price="Number(cart.totalPrice)"></cart-price></span>
                                </div>
                            </div>
                            <div class="wrap_btn">
                                <nuxt-link class="button btn-proceed-checkout" to="/cart/thanh-toan">
                                 Tiến hành thanh toán
                                </nuxt-link>
                            </div>
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
import {mapState,mapGetters} from 'vuex'
import CartItem from '../../components/cart/cart-item.vue';
import cartPrice from '../../components/cart/cart-price.vue';
export default {
  components: { cartPrice, CartItem },
    computed: {
        ...mapGetters({
            'cart': 'cart/cartInfo'
        }),
        ...mapState({
            listCart: state => state.cart.listCart
        })
    }, 
    created () {
      const dataSEO= {
          meta_title: "Giỏ hàng",
          meta_description: '',
          meta_images: '',
      }
      this.$parent.$emit("event-seo",dataSEO);
    },

};
</script>

<style>
@import url("@/assets/css/cart/gio-hang.css");
</style>
