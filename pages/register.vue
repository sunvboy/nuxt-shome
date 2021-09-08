<template>
  <main class="login">
    <div class="spacing"></div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 block-center">
          <h1 class="form-title text-center">Đăng ký tài khoản</h1>
          <div class="form-login-register">
            <form action="">
              <div class="form-control">
                <label for="">Email</label>
                <input type="text" placeholder="Email" v-model="data.email" />
                <c-text-error :txtError="txtError"></c-text-error>
              </div>
              <div class="form-control">
                <label for="">Họ và tên</label>
                <input type="text" placeholder="Họ và tên" v-model="data.fullname"/>
              </div>
              <div class="form-control">
                <label for="">Số điện thoại</label>
                <input type="text" placeholder="Số điện thoại" v-model="data.phone"/>
              </div>
              <div class="form-control">
                <label for="">Địa chỉ</label>
                <input type="text" placeholder="Địa chỉ" v-model="data.address"/>
              </div>
              <div class="form-control">
                <label for="">Mật khẩu</label>
                <i v-if="!isShowPassword"  class="toggle-password ion-eye" @click.prevent="handleShowPassword"></i>
                <i v-else class="toggle-password ion-eye-disabled" @click.prevent="handleShowPassword"></i>
                <input :type="getTypePassword" placeholder="Mật khẩu" v-model="data.password"/>
              </div>

              <div class="d-flex jc-between ais-center">
                <button class="btn btn-primary btn-size-large" @click="handleRegister">Đăng ký</button>
                <nuxt-link to="/login">Đăng nhập</nuxt-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="spacing"></div>
  </main>
</template>

<script>
import {mapActions} from "vuex";
import cTextError from '../components/common/c-text-error.vue';
export default {
  components: { cTextError },
  middleware: "authenticated",
  created () {
      const dataSEO= {
          meta_title: "Đăng ký",
          meta_description: '',
          meta_images: '',
      }
      this.$parent.$emit("event-seo",dataSEO);
  },
  data() {
    return {
      isShowPassword: false,
      txtError: "",
      data: {
        email: "",
        fullname: "",
        phone: "",
        password: "",
        address: "",
      },
    };
  },
  computed: {
    getTypePassword() {
      if (this.isShowPassword) return "text";
      return "password";
    },
  },
  methods: {
      ...mapActions({
          actRegister: 'auth/actRegister'
      }),
    handleRegister(e) {
      e.preventDefault();
      this.actRegister(this.data).then((res) => {
        if (res.ok) {
          this.$router.push("/login");
        } else {
          this.txtError = res.message;
        }
      });
    },
    handleShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
  },
};
</script>

<style>
@import url(@/assets/css/login.css);
@import url(@/assets/css/button.css);
@import url(@/assets/css/alert.css);

</style>