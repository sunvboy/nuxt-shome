<template>

    <div v-if="!isCatalogue" class="form_product_content">
      <div class="soluong show">
        <div class="label_sl">Số lượng:</div>
        <div class="input_number_product">
          <button class="num_1 button_qty" type="button" @click="handleMinus">
            <i class="ion-ios-minus-empty"></i>
          </button>
          <input
            id="qtym"
            name="quantity"
            class="form-control"
            v-model="quantity"
            type="number"
            value="1"
            min="1"
          />
          <button class="num_2 button_qty" @click="handlePlus">
            <i class="ion-ios-plus-empty"></i>
          </button>
        </div>
      </div>
      <div class="clearfix"></div>
      <button type="submit" class="btn_base" @click.prevent="handeBuyProduct">
        <span class="text_1">Cho vào giỏ hàng</span>
      </button>
    </div>
    <button v-else class="btn" @click.prevent="handeBuyProduct">
          <i class="ion-bag"></i>
    </button>
</template>

<script>
import { validateQuantity } from "../../helpers/index";

import { mapActions,mapState } from "vuex";

export default {
  props: {
    productCart: {
      type: Object,
      default: null
    },
    isCatalogue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      quantity: 1,
    };
  },
  computed: {
    ...mapState({
      isPopupCart: state => state.cart.isPopupCart
    })
  },
  methods: {
    ...mapActions({
      addBuyProduct: "cart/addBuyProduct",
      handleisPopupCart: "cart/isPopupCart",
      actpQuickView: "product_catalogue/isPopupQuickView"

    }),
    handeBuyProduct(e) {
      //e.preventDefault();
      let isdataPopup = {
          isPopupCartProduct: this.productCart,
          isPopupCart: true,
      }
      const check = validateQuantity(this.quantity);
      if (check) {
        let numQty = parseInt(this.quantity);
        let data = {
          product: this.productCart,
          quantity: numQty
        };
       
        this.addBuyProduct(data);
        this.handleisPopupCart(isdataPopup)
        let dataQuickView = {
          isPopupQuickView: false,
          isPopupQuickViewItem: null
        };
        this.actpQuickView(dataQuickView);
        
      } else {
          this.handleisPopupCart(isdataPopup) 
      }
    },
    handleMinus() {
      if (this.quantity == 1) {
        this.quantity == 1;
      } else {
        this.quantity = this.quantity - 1;
      }
    },
    handlePlus() {
      this.quantity = this.quantity + 1;
    }
  }
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
