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
                <strong><span>Thông tin tài khoản</span></strong>
              </li>
            </ul>
          </div>
        </div>
        <div class="spacing"></div>
        <div class="col-md-3 col-12">
          <aside-left></aside-left>
        </div>
        <div class="col-md-9 col-12">
          <h1 class="title-head margin-top-0">Thông tin tài khoản</h1>
          <div class="page-login">
            <form action="" id="change_customer_password" method="post">
              <p>Vui lòng nhập đầy đủ thông tin</p>
              <div class="form-signup clearfix">
                <fieldset class="form-group">
                  <label for="oldPass">Ảnh đại diện</label>
                  <input
                    type="file"
                    ref="avatar"
                    style="display: none"
                    @change="handleCustomRequest"
                  />
                  <a href="" @click.prevent="$refs.avatar.click()">
                    <img
                      v-if="getAvatar"
                      v-bind:src="getAvatar"
                      alt="avatar"
                      class="avatar"
                    />
                  </a>
                </fieldset>
                <fieldset class="form-group">
                  <label for="oldPass"
                    >Email <span class="error">*</span></label
                  >
                  <input
                    type="text"
                    name="email"
                    required=""
                    v-model="dataInfo.email"
                    class="form-control form-control-lg"
                    readonly
                    disabled
                  />
                   <c-text-error :txtError="txtError"></c-text-error>

                </fieldset>
                <fieldset class="form-group">
                  <label for="changePass"
                    >Họ và tên <span class="error">*</span></label
                  >
                  <input
                    type="text"
                    name="fullname"
                    v-model="dataInfo.fullname"
                    required=""
                    class="form-control form-control-lg"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <label for="confirmPass"
                    >Số điện thoại <span class="error">*</span></label
                  >
                  <input
                    type="text"
                    name="phone"
                    v-model="dataInfo.phone"
                    required=""
                    class="form-control form-control-lg"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <label for="confirmPass"
                    >Địa chỉ <span class="error">*</span></label
                  >
                  <input
                    type="text"
                    name="address"
                    v-model="dataInfo.address"
                    required=""
                    class="form-control form-control-lg"
                  />
                </fieldset>

                <button
                  class="button btn-edit-addr btn btn-primary btn-more"
                  @click.prevent="handleSubmit"
                >
                  <i class="hoverButton"></i>Cập nhập
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
import { mapState, mapActions } from "vuex";
import asideLeft from "../../components/auth/aside-left.vue";
import CTextError from '../../components/common/c-text-error.vue';
export default {
  components: { asideLeft, CTextError },
  middleware: "notauthenticated",
  created() {
    const dataSEO = {
      meta_title: "Thông tin tài khoản",
      meta_description: "",
      meta_images: "",
    };
    this.$parent.$emit("event-seo", dataSEO);
    this.handleLoadData()

  },
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
    }),
    getAvatar() {
      if (this.avatar.base64) {
        return this.avatar.base64;
      }
      if (this.currentUser && this.currentUser.avatar) {
        return this.currentUser.avatar;
      }
      return "assets/images/avatar1.jpg";
    },
  },
  data() {
    return {
      dataInfo: {   email: "",fullname: "", phone: "", address: "" },
      avatar: {
        file: null,
        base64: "",
      },
      txtError: "",
    };
  },
  methods: {
    ...mapActions({
      actUpdateProfile: "auth/actUpdateProfile",
    }),
    handleLoadData(){
      this.dataInfo.email = this.currentUser?this.currentUser.email:''
      this.dataInfo.fullname = this.currentUser?this.currentUser.fullname:''
      this.dataInfo.phone = this.currentUser?this.currentUser.phone:''
      this.dataInfo.address = this.currentUser?this.currentUser.address:''
    },
    validateImages(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$toast.error("Định dạng hình ảnh không hợp lệ").goAway(3000);
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$toast.error("Dung lượng hình ảnh phải nhỏ hơn 2MB").goAway(3000);
        return false;
      }
      return true;
    },
    handleCustomRequest(e) {
      if (e.target.files && e.target.files.length) {
        const fileAvatar = e.target.files[0];
        if (this.validateImages(fileAvatar) === false) {
          return;
        }
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            let previewSrc = reader.result;
            this.avatar.base64 = previewSrc;
            this.avatar.file = fileAvatar;
          },
          false
        );
        if (fileAvatar) {
          reader.readAsDataURL(fileAvatar);
        }
      }
    },
    handleSubmit() {
      const data = {
        file: this.avatar.file,
        fullname: this.dataInfo.fullname,
        phone: this.dataInfo.phone,
        address: this.dataInfo.address,
      };
      this.actUpdateProfile(data).then((res) => {
        if (res.ok) {
          this.avatar = {
            file: null,
            base64: "",
          };
          this.txtError = '';
					this.$toast.success(res.message).goAway(3000);
        } else {
					this.txtError = res.message;
        }
        this.loading = false;
      });
    },
  },
};
</script>
<style>
@import url("@/assets/css/auth/thong-tin-tai-khoan.css");
</style>
