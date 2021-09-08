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
              <li class="home">
                <nuxt-link to="/auth/address"
                  ><span>Sổ địa chỉ</span></nuxt-link
                >
                <span class="mr_lr">&nbsp;/&nbsp;</span>
              </li>
              <li>
                <strong><span>Cập nhập sổ địa chỉ</span></strong>
              </li>
            </ul>
          </div>
        </div>
        <div class="spacing"></div>
        <div class="col-md-3 col-12">
          <aside-left></aside-left>
        </div>
        <div class="col-md-9 col-12">
          <h1 class="title-head margin-top-0">Cập nhập sổ địa chỉ</h1>
          <div class="page-address">
            <div class="inner">
              <form>
                <c-text-error :txtError="txtError"></c-text-error>
                <div class="form-control">
                  <label for="fullName" class="input-label">Họ và tên:</label>
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Nhập họ và tên"
                      maxlength="50"
                      class="girQwT"
                      value=""
                      v-model="data.fullname"
                    />
                  </div>
                </div>
                <div class="form-control">
                  <label for="telephone" class="input-label"
                    >Số điện thoại:</label
                  >
                  <div>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Nhập số điện thoại"
                      class="girQwT"
                      value=""
                      v-model="data.phone"
                    />
                  </div>
                </div>
                <div class="form-control cityid">
                  <label for="region" class="input-label"
                    >Tỉnh/Thành phố:</label
                  >
                  <select
                    name="cityid"
                    class="field__input"
                    v-model="data.cityid"
                    @change="
                      handleLocation(
                        'vn_district',
                        'districtid',
                        'Chọn Quận/Huyện',
                        'provinceid'
                      )
                    "
                  >
                    <option value="" selected>Chọn Tỉnh/Thành Phố</option>
                    <option
                      v-for="(v, k) in getCityID"
                      :key="k"
                      :value="v.provinceid"
                    >
                      {{ v.name }}
                    </option>
                  </select>
                </div>
                <div class="form-control">
                  <label for="district" class="input-label">Quận huyện:</label>
                  <div
                    class="districtid"
                    :class="[getDistrictID ? '' : 'disabled']"
                  >
                    <select
                      :disabled="!getDistrictID"
                      name="districtid"
                      class="field__input"
                      v-model="data.districtid"
                      @change="
                        handleLocation(
                          'vn_ward',
                          'wardid',
                          'Chọn Phường/Xã',
                          'districtid'
                        )
                      "
                    >
                      <option
                        v-for="(v, k) in getDistrictID"
                        :key="k"
                        :value="v.districtid"
                      >
                        {{ v.name }}
                      </option>
                    </select>
                    <div v-if="isShowDistrict">Chọn Quận/Huyện</div>
                  </div>
                </div>
                <div class="form-control">
                  <label for="ward" class="input-label">Phường xã:</label>
                  <div class="wardid" :class="[getWardID ? '' : 'disabled']">
                    <select
                      :disabled="!getWardID"
                      name="wardid"
                      class="field__input"
                      v-model="data.wardid"
                      @change="handleHideTitle"
                    >
                      <option
                        v-for="(v, k) in getWardID"
                        :key="k"
                        :value="v.wardid"
                      >
                        {{ v.name }}
                      </option>
                    </select>
                    <div v-if="isShowWard">Chọn Phường/Xã</div>
                  </div>
                </div>
                <div class="form-control">
                  <label for="address" class="input-label">Địa chỉ:</label>
                  <div>
                    <textarea
                      name="address"
                      rows="5"
                      placeholder="Nhập địa chỉ"
                      v-model="data.address"
                    ></textarea>
                  </div>
                </div>
                <div class="form-control">
                  <label for="type" class="input-label">Loại địa chỉ:</label>
                  <label class="cLable">
                    <input
                      type="radio"
                      name="type"
                      value="Nhà riêng / Chung cư"
                      v-model="data.type"
                    /><span class="radio-fake"></span
                    ><span class="label">Nhà riêng / Chung cư</span>
                  </label>
                  <label class="cLable">
                    <input
                      type="radio"
                      name="type"
                      value="Cơ quan / Công ty"
                      v-model="data.type"
                    /><span class="radio-fake"></span
                    ><span class="label">Cơ quan / Công ty</span>
                  </label>
                </div>
                <div class="form-control" v-if="detailAddress.active == 0">
                  <label class="input-label">&nbsp;</label
                  ><label class="cLable2"
                    ><input
                      type="checkbox"
                      name="active"
                      v-model="data.active"
                    /><span class="checkbox-fake"></span
                    ><span class="label">Đặt làm địa chỉ mặc định</span></label
                  >
                </div>
                <div class="form-control">
                  <label class="input-label">&nbsp;</label
                  ><button class="btn-submit" @click.prevent="handleSubmit">
                    Cập nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="spacing"></div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import asideLeft from "../../../components/auth/aside-left.vue";
import CTextError from "../../../components/common/c-text-error.vue";
export default {
  components: { asideLeft, CTextError },
  async asyncData({ store, redirect, route }) {
    let id = route.query.id ? route.query.id : "";
    var promiseAddress = store.dispatch("auth/actDetailAddress", { id: id });
    var promisegetCity = store.dispatch("cart/actgetLocation", { parentid: 0 });
    let [result, resultgetCityID] = await Promise.all([
      promiseAddress,
      promisegetCity
    ]);
    if (result.ok && resultgetCityID.ok) {
      return {
        detailAddress: result.data,
        getCityID: resultgetCityID.data
      };
    } else {
      redirect("/auth/address");
    }
  },
  data() {
    return {
      detailAddress: null,
      data: {
        id: "",
        fullname: "",
        phone: "",
        address: "",
        type: "",
        active: false,
        cityid: "",
        districtid: "",
        wardid: ""
      },
      getCityID: null,
      getDistrictID: null,
      getWardID: null,
      isShowDistrict: false,
      isShowWard: false,
      txtError: ""
    };
  },
  created() {
    const dataSEO = {
      meta_title: "Cập nhập địa chỉ",
      meta_description: "",
      meta_images: ""
    };
    this.$parent.$emit("event-seo", dataSEO);
    this.actgetData(
      this.detailAddress.cityid,
      "vn_district",
      "districtid",
      "Chọn Quận/Huyện",
      "provinceid"
    );
    this.actgetData(
      this.detailAddress.districtid,
      "vn_ward",
      "wardid",
      "Chọn Phường/Xã",
      "districtid"
    );
    this.handleLoadData();
  },
  methods: {
    ...mapActions({
      actgetLocation: "cart/actgetLocation",
      actUpdateAddress: "auth/actUpdateAddress",
      showLoading: "showLoading"
    }),
    handleLoadData() {
      this.data.id = this.detailAddress.id;
      this.data.fullname = this.detailAddress.fullname;
      this.data.phone = this.detailAddress.phone;
      this.data.address = this.detailAddress.address;
      this.data.type = this.detailAddress.type;
      this.data.active = this.detailAddress.active == 1 ? true : false;
      this.data.cityid = this.detailAddress.cityid;
      this.data.districtid = this.detailAddress.districtid;
      this.data.wardid = this.detailAddress.wardid;
    },
    actgetData(parentid, table, select, text, parentField) {
      const data = {
        parentid: parentid,
        table: table,
        select: select,
        text: text,
        parentField: parentField
      };
      this.actgetLocation(data).then(res => {
        if (table == "vn_ward") {
          this.getWardID = res.data;
        } else {
          this.getDistrictID = res.data;
        }
      });
    },
    handleLocation(table, select, text, parentField) {
      this.showLoading(true);
      if (table == "vn_ward") {
        this.data.wardid = "";
        this.isShowDistrict = false;
        this.isShowWard = true;
        this.actgetData(this.data.districtid, table, select, text, parentField);
      } else {
        this.actgetData(this.data.cityid, table, select, text, parentField);
        this.data.districtid = "";
        this.data.wardid = "";
        this.getWardID = null;
        this.isShowDistrict = true;
        this.isShowWard = true;
      }
      this.showLoading(false);
    },
    handleHideTitle() {
      this.isShowWard = false;
    },
    handleSubmit() {
      this.showLoading(true);
      this.actUpdateAddress(this.data).then(res => {
        this.showLoading(false);
        if (!res.ok) {
          this.txtError = res.message;
        } else {
          this.txtError = "";
          this.$router.push({
            name: "auth-address",
            params: { message: res.message }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
@import url("@/assets/css/auth/address/form.css");
</style>
