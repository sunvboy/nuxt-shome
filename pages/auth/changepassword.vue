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
                <strong><span>Đổi mật khẩu</span></strong>
              </li>
            </ul>
          </div>
        </div>
        <div class="spacing"></div>
        <div class="col-md-3 col-12">
          <aside-left></aside-left>
        </div>
        <div class="col-md-9 col-12">
          <h1 class="title-head margin-top-0">Đổi mật khẩu</h1>
          <div class="page-login">
            <form action="" id="change_customer_password" method="post">
              <p>Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít nhất 8 kí tự</p>
              <div class="form-signup clearfix">
                <c-text-error :txtError="txtError"></c-text-error>
                <fieldset class="form-group">
                  <label for="oldPass">Mật khẩu cũ <span class="error">*</span></label>
                  <input type="password"  name="password"  required="" v-model="data.password" class="form-control form-control-lg"/>
                </fieldset>
                <fieldset class="form-group">
                  <label for="changePass">Mật khẩu mới <span class="error">*</span></label>
                  <input type="password" name="newpassword"  required="" v-model="data.newpassword" class="form-control form-control-lg"/>
                </fieldset>
                <fieldset class="form-group">
                  <label for="confirmPass">Nhập lại mật khẩu mới<span class="error">*</span></label >
                  <input type="password" name="renewpassword" required="" v-model="data.renewpassword" class="form-control form-control-lg"/>
                </fieldset>
                <button class="button btn-edit-addr btn btn-primary btn-more" @click.prevent="handleSubmit">
                  <i class="hoverButton"></i>Thay đổi mật khẩu
                </button>
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
import asideLeft from '../../components/auth/aside-left.vue'
import {mapActions} from 'vuex'
import CTextError from '../../components/common/c-text-error.vue'
export default {
  middleware: "notauthenticated",
  components: { asideLeft,CTextError},
  created() {
      const dataSEO= {
          meta_title: "Thay đổi mật khẩu",
          meta_description: '',
          meta_images: '',
      }
      this.$parent.$emit("event-seo",dataSEO);
  },
  data() {
    return {
      data: {
        password: '',
        newpassword: '',
        renewpassword: '',
      },
       txtError: "",
    }
  },
  methods: {
    ...mapActions({
        actChangePassword: 'auth/actChangePassword'
    }),
    handleSubmit() {
      this.actChangePassword(this.data).then(res => {
          if(res.ok){
            this.data = {
                password: '',
                newpassword: '',
                renewpassword: '',
            }
            this.txtError = ''
					  this.$toast.success(res.message).goAway(3000);


          }else{
             this.txtError = res.message;
          }

      })

    }
  },

}
</script>

<style>
@import url("@/assets/css/auth/thong-tin-tai-khoan.css");
</style>
