<template>
  <div class="price-box clearfix" v-if="getPrice">
    <div class="special-price">
      <span class="price product-price">{{ getPrice.price_final }}</span>
      <span class="price product-price-old" v-if="getPrice.price_old">{{getPrice.price_old}}</span>
    </div>
  </div>
</template>

<script>
import { getPriceProduct } from "../../helpers/index";

export default {
  props: {
    price: {
      type: Number,
      default: 0
    },
    price_sale: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getPrice() {
      return getPriceProduct(
        this.price,
        this.price_sale,
      );
    }
  }
};
</script>
<style scoped>
.price-box {
    margin-top: 0px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.price-box .special-price {
    color: #898989;
    display: inline-block;
}
.price-box .special-price span {
    display: inline;
    color: #ff2d37;
    font-size: 1.07143em;
    line-height: 1.71429em;
    font-weight: 600;
}
.product-price-old {
    text-decoration: line-through;
    color: #333 !important;
    font-weight: normal !important;
}
</style>