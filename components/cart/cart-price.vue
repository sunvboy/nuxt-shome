<template>
  <div class="clearfix">
    <span class="price product-price">{{ getprice.price }}</span>
    <span class="price product-price-old" v-if="price_old">{{getprice.price_old}}</span>
  </div>
</template>

<script>
import { toCurrency } from "../../helpers/index";

export default {
  props: {
    price: {
      type: Number,
      default: 0
    },
    price_old: {
      type: Number,
      default: 0
    }
  },
  computed: {
      getprice() {
          let data = {
              price: this.price?toCurrency(this.price):0,
              price_old: this.price_old?toCurrency(this.price_old):''
          }
        return  data
      }
  },
};
</script>
<style scoped>
.product-price-old {
    text-decoration: line-through;
    color: #333 !important;
    font-weight: normal !important;
}
</style>