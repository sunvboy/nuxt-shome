<template>
  <div>
    <div class="form-control cityid">
      <label for="region" class="input-label">Tỉnh/Thành phố:</label>
      <select name="cityid" class="field__input" v-model="cityid" @change="handleLocation('vn_district','districtid', 'Chọn Quận/Huyện','provinceid')">
        <option value="" selected>Chọn Tỉnh/Thành Phố</option>
        <option v-for="(v, k) in getCityID" :key="k" :value="v.provinceid">{{v.name }}</option>
      </select>
    </div>
    <div class="form-control">
      <label for="district" class="input-label">Quận huyện:</label>
      <div class="districtid" :class="[getDistrictID ? '' : 'disabled']">
        <select :disabled="!getDistrictID" name="districtid" class="field__input" v-model="districtid" @change=" handleLocation('vn_ward', 'wardid', 'Chọn Phường/Xã', 'districtid')">
          <option v-for="(v, k) in getDistrictID" :key="k" :value="v.districtid">{{ v.name }}</option>
        </select>
        <div v-if="isShowDistrict">Chọn Quận/Huyện</div>
      </div>
    </div>
    <div class="form-control ">
      <label for="ward" class="input-label">Phường xã:</label>
      <div class="wardid" :class="[getWardID ? '' : 'disabled']">
        <select :disabled="!getWardID" name="wardid" class="field__input" v-model="wardid" @change="handleHideTitle">
          <option v-for="(v, k) in getWardID" :key="k" :value="v.wardid">{{v.name}}</option>
        </select>
        <div v-if="isShowWard">Chọn Phường/Xã</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  async fetch() {
    const params = {parentid: 0}
    const result = await this.$axios.$get(`/address`,{ params })
    if (result.status === 200) {
        this.getCityID = result.data
    }
  },
  data() {
    return {
      getCityID: null,
      getDistrictID: null,
      getWardID: null,
      isShowDistrict: true,
      isShowWard: true,
      cityid: '',
        districtid: '',
        wardid:''
    };
  },
  methods: {
    ...mapActions({
      actgetLocation: "cart/actgetLocation",
      showLoading: "showLoading"
    }),
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
        this.isShowDistrict = false;
        this.isShowWard = true;
        this.actgetData(this.districtid, table, select, text, parentField);
      } else {
        this.actgetData(this.cityid, table, select, text, parentField);
        this.getWardID = null;
        this.isShowDistrict = true;
        this.isShowWard = true;
      }
      this.showLoading(false);
      const dataEmit = {
          cityid: this.cityid,
         
      }
      this.$emit('location-sunvboy',dataEmit)
    },
    handleHideTitle() {
      this.isShowWard = false;
    }
  }
};
</script>

<style scoped>

.districtid,.wardid{

    position: relative;
}
.districtid > div,.wardid > div{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    z-index: 1;
    user-select: none;
    pointer-events: none;
    color: #999;
}
.disabled .field__input{

    cursor: not-allowed;
}
.districtid.disabled > div,.wardid.disabled > div{
    z-index: -1;
}
select.field__input{
    cursor: pointer;
}
</style>
