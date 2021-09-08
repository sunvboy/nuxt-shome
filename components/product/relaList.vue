<template>
  <div class="row">
    <div class="spacing"></div>
    <div class="col-12">
      <div class="title_full">
        <h2>Sản phẩm liên quan</h2>
      </div>
       <div class="cards" v-if="relaList">
              <div class="products-item" v-for="v in relaList" :key="v.id">
                <product-item :item="v"></product-item>
              </div>
        </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '../product/ProductItem.vue';
export default {
  components: { ProductItem },
  props: {
      relaList: {
          type: Array,
          default: []
      },
  },
  
  };
</script>

<style></style>
