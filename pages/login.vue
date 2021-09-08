<template>
  <main class="login">
    <div class="spacing"></div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 block-center">
          <h1 class="form-title text-center">Login</h1>
          <div class="form-login-register">
            <form action="" @submit.prevent="handleLogin">
              <div class="form-control">
                <label for="">Email</label>
                <input type="text" placeholder="Email" v-model="email" />
                <c-text-error :txtError="txtError"></c-text-error>
              </div>
              <div class="form-control">
                <label for="">Mật khẩu</label>
                <i v-if="!isShowPassword" class="toggle-password ion-eye" @click.prevent="handleShowPassword"></i>
                <i v-else class="toggle-password ion-eye-disabled" @click.prevent="handleShowPassword"></i>
                <input :type="getTypePassword" placeholder="Password..." v-model="password"/>
              </div>
              <div class="d-flex jc-between ais-center">
                <button class="btn btn-primary btn-size-large" type="submit">
                  Đăng nhập
                </button>
                <nuxt-link to="/register">Đăng ký</nuxt-link>
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
import { mapActions } from "vuex";
import cTextError from '../components/common/c-text-error.vue';
export default {
  components: { cTextError },
  created () {
      const dataSEO= {
          meta_title: "Đăng nhập",
          meta_description: '',
          meta_images: '',
      }
      this.$parent.$emit("event-seo",dataSEO);
  },
  middleware: "authenticated",
  data() {
    return {
      email: "",
      password: "",
      isShowPassword: false,
      txtError: "",
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
      actLogin: "auth/actLogin",
    }),
    handleLogin(e) {
      e.preventDefault();
      this.actLogin({
        email: this.email,
        password: this.password,
      }).then((res) => {
        if (res.ok) {
          this.$router.push("/");
        } else {
          this.txtError = res.message;
        }
      });
    },
    handleShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    }
  },
};
</script>

<style>
@import url(@/assets/css/login.css);
@import url(@/assets/css/button.css);
@import url(@/assets/css/alert.css);

</style>