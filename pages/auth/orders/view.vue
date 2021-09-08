<template>
  <main class="product-list">
    <div class="spacing"></div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="bread-crumb">
            <ul class="breadcrumb">
              <li class="home">
                <nuxt-link to="/"><span>Trang chủ</span></nuxt-link>
                <span class="mr_lr">&nbsp;/&nbsp;</span>
              </li>
              <li>
                <strong><span>Quản lý đơn hàng</span></strong>
              </li>
            </ul>
          </div>
        </div>
        <div class="spacing"></div>
        <div class="col-md-3 col-12">
          <aside-left></aside-left>
        </div>
        <div class="col-md-9 col-12" v-if="detailOrder">
            <h1 class="title-head margin-top-0">Chi tiết đơn hàng</h1>
            <div class="infoOrder" >
                <div class=" colOrder">
                    <div class="title">Địa chỉ người nhận</div>
                    <div class="content"><p class="name">{{detailOrder.fullname}}</p>
                        <p class="address"><span>Địa chỉ: </span>{{detailOrder.address_detail}} <span v-html="`${detailOrder.address_ward}, ${detailOrder.address_distric}, ${detailOrder.address_city}`"></span></p>
                        <p class="phone"><span>Điện thoại: </span>{{detailOrder.phone}}</p>
                    </div>
                </div>
                <div class=" colOrder">
                    <div class="title">Phương thức thanh toán</div>
                    <div class="content">
                       
                        <p>{{detailOrder.payment}}</p>
                    </div>
                </div>
                <div class=" colOrder">
                    <div class="title">Ghi chú</div>
                    <div class="content"><p class="">{{detailOrder.note}}</p></div>
                </div>
            </div>
            <table class="tableOrder" v-if="detailOrder.data_order">
                <thead>
                <tr>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tạm tính</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="v in detailOrder.data_order" :key="v.id">
                    <td>
                        <div class="product-item">
                            <img :src="v.image" :alt="v.title" style="object-fit: contain;">
                            <div class="product-info">
                                <nuxt-link class="product-name" :to="`/san-pham/${v.canonical}`">{{v.title}}</nuxt-link>
                            </div>
                        </div>
                    </td>
                    <td class="price"><cart-price :price="Number(v.price)"></cart-price></td>
                    <td class="quantity">{{v.quantity}}</td>
                    <td class="raw-total"><cart-price :price="Number(v.price*v.quantity)"></cart-price></td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colspan="3"><span>Tạm tính</span></td>
                    <td><cart-price :price="Number(detailOrder.total_cart_final-detailOrder.ship)"></cart-price></td>
                </tr>
                <tr>
                    <td colspan="3"><span>Phí vận chuyển</span></td>
                    <td><cart-price :price="Number(detailOrder.ship)"></cart-price></td>
                </tr>
                <tr>
                    <td colspan="3"><span>Tổng cộng</span></td>
                    <td><span class="sum"><cart-price :price="Number(detailOrder.total_cart_final)"></cart-price></span></td>
                </tr>
                </tfoot>
            </table>
            <nuxt-link class="view-list-order" to="/auth/orders">&lt;&lt; Quay lại đơn hàng của tôi</nuxt-link>
        </div>
      </div>
    </div>
    <div class="spacing"></div>
  </main>
</template>

<script>
import asideLeft from '../../../components/auth/aside-left.vue'
import CartPrice from '../../../components/cart/cart-price.vue';
export default {
  components: { asideLeft, CartPrice },
  async asyncData({ store, redirect, route }) {
    let id = route.query.id ? route.query.id : "";
    var result = await store.dispatch("auth/actDetailOrders", { id: id });
    if (result.ok) {
      return {
        detailOrder: result.data,
      };
    } else {
      redirect("/auth/orders");
    }
  },
  data() {
    return {
      detailOrder: null,
    };
  },
}
</script>

<style scoped>
@import url("@/assets/css/auth/orders/order-detail.css");
</style>