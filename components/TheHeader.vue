<template>
      <header id="header">
      <div class="container">
        <div class="row no-gutters header">
          <div class="col-2">
            <!-- Logo -->
            <div class="header-logo">
              <nuxt-link to="/">
                <img :src="fcSystem.homepage_logo" :alt="fcSystem.homepage_company">
              </nuxt-link>
            </div>
          </div>
          <div class="col-4">
            <!-- Header Search -->
            <form-search></form-search>
          </div>
          <div class="col-6">
            <!-- Nav -->
            <div class="header-nav">
              <menu-header :isRoot="true" :listMenu="listMenu"></menu-header>

              <ul class="header-nav__lists">
                <li class="cartheader"><nuxt-link to="/cart/gio-hang"><i class="icons ion-bag"></i><span>{{cart.countItem}}</span></nuxt-link></li>
                <li v-if="currentUser" class="user">
                  <nuxt-link to="/auth"><i class="icons ion-person"></i> {{currentUser.fullname}}</nuxt-link>
                  <ul>
                    <li><a href="" @click.prevent="handleLogout">Đăng xuất</a></li>
                  </ul>
                </li>
                <li v-else class="user"><nuxt-link to="/login"><i class="icons ion-person"></i> Tài khoản</nuxt-link>
                <ul>
                    <li><nuxt-link to="/register">Đăng ký</nuxt-link></li>
                    <li><nuxt-link to="/login">Đăng nhập</nuxt-link></li>
                  </ul>
                </li>

              </ul>

            </div>
          </div>
        </div>
      </div>
    </header>
  
</template>

<script>
import { mapState,mapActions,mapGetters } from "vuex";
import FormSearch from './common/FormSearch.vue';
import MenuHeader from './common/MenuHeader.vue'
export default {
  components: { MenuHeader, FormSearch },
  props: {
    fcSystem: {
      fcSystem: Object,
      default: null
    },
  },
  computed: {
    ...mapState({
      listMenu: (state) => state.appMenuHeader,
      currentUser: (state) => state.auth.currentUser,
    }),
    ...mapGetters({
      'cart': 'cart/cartInfo'
    }),
  },
  methods: {
    ...mapActions({
      'actLogout': 'auth/actLogout'
    }),
    handleLogout(req) {
      this.actLogout();
      this.$router.push('/')
      
    }
  },
}
</script>
<style>
    @import url("@/assets/css/header.css");
</style>