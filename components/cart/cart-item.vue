<template>
  <div class="item-cart" v-if="item">
    <div class="content_ content_s s1">
      <nuxt-link
        class="product-image"
        :to="`/san-pham/${item.product.canonical}`"
        ><img
          width="75"
          height="auto"
          :alt="item.product.title"
          :src="item.product.image"
      /></nuxt-link>
    </div>
    <div class="content_ content_s s2">
      <h3 class="product-name">
        <nuxt-link
          class="text2line"
          :to="`/san-pham/${item.product.canonical}`"
          >{{ item.product.title }}</nuxt-link
        >
      </h3>
      <a
        class="button remove-item remove-item-cart"
        href=""
        @click.prevent="handleDelete"
        ><i class="ion-trash-b" aria-hidden="true"></i> Xóa sản phẩm</a
      >
    </div>
    <div class="a-center s3">
      <span class="item-price"
        ><span class="price bold-price"
          ><cart-price
            :price="Number(item.product.price)"
            :price_old="Number(item.product.price_old)"
          ></cart-price></span
      ></span>
    </div>
    <div class="a-center s4">
      <div class="input_qty_pr">
        
        <input
          type="number"
          maxlength="3"
          min="0"
          class="input-text number-sidebar input_pop input_pop"
          name="Lines"
          size="4"
          :value="item.quantity"
          @blur="handleChangeQuantity"
        />
       
      </div>
    </div>
    <div class="a-center s5">
      <span class="item-price cart-price">
        <span class="price pink">
          <cart-price
            :price="Number(item.product.price * item.quantity)"
          ></cart-price>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import cartPrice from "./cart-price.vue";
import { validateQuantity } from "../../helpers/index";

export default {
  components: { cartPrice },
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    ...mapActions({
      actDelete: "cart/deletetocart",
      updateQuantity: "cart/updateQuantity",
      showLoading: "showLoading"
    }),
    handleChangeQuantity(e) {
      this.showLoading(true);
      setTimeout(() => {
        this.quantity = parseInt(e.target.value);
        const check = validateQuantity(this.quantity);
        console.log(check)
        if (check) {
          let data = {
            objProduct: this.item,
            quantity: this.quantity
          };
          this.updateQuantity(data);
          this.$toast.success("Cập nhập giỏ hàng thành công").goAway(3000);
        } else {
          this.$toast.error("Cập nhập giỏ hàng không thành công").goAway(3000);
        }
        this.showLoading(false);
      }, 200);
    },
    handleDelete() {
      if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
        this.actDelete(this.item.product);
        this.$toast.success("Xóa sản phẩm thành công").goAway(3000);
      }
    }
  }
};
</script>

<style></style>
