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
        <div class="col-md-9 col-12">
          <h1 class="title-head margin-top-0">Quản lý đơn hàng</h1>
          <div class="iOhDoD">
            <div class="inner">
              <table>
                  <thead>
                  <tr>
                      <th>Mã đơn hàng</th>
                      <th>Ngày mua</th>
                      <th>Họ và tên</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái đơn hàng</th>
                  </tr>
                  </thead>
                  <tbody v-if="posts">
                    <tr v-for="item in posts" :key="item.id">
                        <td><nuxt-link :to="{ path: '/auth/orders/view', query: { id: item.id }}">{{item.code}}</nuxt-link></td>
                        <td>{{item.created}}</td>
                        <td>{{item.fullname}}</td>
                        <td><cart-price :price="Number(item.total_cart_final)"></cart-price></td>
                        <td>{{getStatus(item.status)}}</td>
                    </tr>
                  </tbody>
              </table>
              
            </div>
            <!-- Btn Loadmore -->
              <div class="text-center" v-if="hasMorePosts" style="margin-top:20px">
                <app-button  @click.native="handleLoadMore" :isLoading="isLoading" type="primary" :isSizeLarge="true">Load more</app-button>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="spacing"></div>
  </main>
</template>

<script>
import {mapActions,mapState} from "vuex"
import AppButton from '../../../components/AppButton.vue';

import asideLeft from '../../../components/auth/aside-left.vue'
import CartPrice from '../../../components/cart/cart-price.vue';
export default {
  components: { asideLeft, CartPrice, AppButton },
  middleware: "notauthenticated",
  created() {
    const dataSEO = {
      meta_title: "Danh sách đơn hàng",
      meta_description: "",
      meta_images: "",
    };
    this.$parent.$emit("event-seo", dataSEO);
  },
  async asyncData({ store }) {
    await store.dispatch("auth/actViewOrders");
  },
  computed: {
    ...mapState({
      posts: (state) => state.auth.orders.posts,
      page: (state) => state.auth.orders.page,
      totalPage: (state) =>state.auth.orders.totalPage,
      totalRow: (state) => state.auth.orders.totalRow,
    }),
    hasMorePosts() {
      return this.page < this.totalPage;
    },
    createdCheck() {
      return true;
    },
   
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
     ...mapActions({
      actViewOrders: "auth/actViewOrders",
     }),
     handleLoadMore() {
      if (this.isLoading || !this.handleLoadMore) {
        return;
      }
      this.isLoading = true;
      this.actViewOrders({
        page: this.page + 1,
      }).then(() => {
        this.isLoading = false;
      });
    },
     getStatus(status) {
      switch(status) {
        case "completed":
          return "Đã hoàn thành"
        case "processing":
          return "Đã xử lý"
        case "canceled":
          return "Đã hủy"
        default:
          return "Đang chờ"
      }

    }
  },
}
</script>
<style scoped>
@import url("@/assets/css/auth/orders/index.css");

</style>