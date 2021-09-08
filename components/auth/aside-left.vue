<template>
  <div class="block-account">
    <h5 class="title-account">Trang tài khoản</h5>
    <p>Xin chào, <span style="color: #ff2d37">{{currentUser?currentUser.fullname?currentUser.fullname:'':''}}</span>&nbsp;!</p>
    <ul>
      <li>
        <nuxt-link class="title-info " to="/auth">Thông tin tài khoản</nuxt-link>
      </li>
      <li>
        <nuxt-link class="title-info" to="/auth/orders">Đơn hàng của bạn</nuxt-link>
      </li>
      <li>
        <nuxt-link class="title-info" to="/auth/changepassword">Đổi mật khẩu</nuxt-link>
      </li>
      <li>
        <nuxt-link class="title-info" to="/auth/wishlist">Sản phẩm yêu thích</nuxt-link>
      </li>
      <li>
        <nuxt-link class="title-info" to="/auth/address">Sổ địa chỉ ({{currentUser?currentUser.count_address?currentUser.count_address:'':''}})</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
      ...mapState({
        currentUser: (state) => state.auth.currentUser,
      }),
  }

};
</script>

<style>
@import url("@/assets/css/auth/aside.css");
</style>
