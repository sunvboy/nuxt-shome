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
                <strong><span>Sổ địa chỉ</span></strong>
              </li>
            </ul>
          </div>
        </div>
        <div class="spacing"></div>
        <div class="col-md-3 col-12">
          <aside-left></aside-left>
        </div>
        <div class="col-md-9 col-12">
          <h1 class="title-head margin-top-0">Sổ địa chỉ</h1>
          <div class="page-address">
            <div class="new">
              <nuxt-link to="/auth/address/create">
                <i class="ion-plus-circled"></i><span>Thêm địa chỉ mới</span>
              </nuxt-link>
            </div>
            <template v-if="posts">
              <div class="item" v-for="item in posts" :key="item.id">
              <div class="info">
                <div class="name">
                  {{item.fullname}}<span v-if="item.active == 1"><i class="ion-checkmark-circled"></i><span>Địa chỉ mặc định</span></span>
                </div>
                <div class="address">
                  <span>Địa chỉ: </span><span v-html="`${item.address}`"></span><br>
                  <span v-html="`${item.address_ward} - ${item.address_distric} - ${item.address_city}`"></span>
                </div>
                <div class="phone"><span>Điện thoại: </span>{{item.phone}}</div>
              </div>
              <div class="action" style="text-align: center">
                <nuxt-link class="edit" :to="{ path: '/auth/address/update', query: { id: item.id }}">Chỉnh sửa</nuxt-link>
                <button class="delete" v-if="item.active != 1" @click="handleDelete(item.id)">Xóa</button>
              </div>
            </div>
            </template>
            <!-- Btn Loadmore -->
            <div class="text-center" v-if="hasMorePosts">
              <app-button  @click.native="handleLoadMore" :isLoading="isLoading" type="primary" :isSizeLarge="true">Load more</app-button >
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
import asideLeft from "../../../components/auth/aside-left.vue";
export default {
  components: { asideLeft, AppButton },
  middleware: "notauthenticated",
  created() {
    const dataSEO = {
      meta_title: "Số địa chỉ(Address book)",
      meta_description: "",
      meta_images: "",
    };
    this.$parent.$emit("event-seo", dataSEO);
  },
  mounted () {
    if(this.$route.params.message){
      this.$toast.success(this.$route.params.message).goAway(3000);
    }
  },
  data() {
    return {
      isLoading: false,
    };
  },
  async asyncData({ store }) {
    await store.dispatch("auth/actViewAddress");
  },
   computed: {
    ...mapState({
      posts: (state) => state.auth.address.posts,
      page: (state) => state.auth.address.page,
      totalPage: (state) =>state.auth.address.totalPage,
      totalRow: (state) => state.auth.address.totalRow,
    }),
    hasMorePosts() {
      return this.page < this.totalPage;
    },
    createdCheck() {
      return true;
    },
  },
  methods: {
     ...mapActions({
      actViewAddress: "auth/actViewAddress",
      actDeleteAddress: "auth/actDeleteAddress",
     }),
     handleLoadMore() {
      if (this.isLoading || !this.handleLoadMore) {
        return;
      }
      this.isLoading = true;
      this.actViewAddress({
        page: this.page + 1,
      }).then(() => {
        this.isLoading = false;
      });
    },
    handleDelete(id){
      if(window.confirm("Are you sure you want to delete")){
        this.actDeleteAddress(id).then((res) => {
            if(res.ok) {
              this.$toast.success(res.message).goAway(3000);
            }else{
              this.$toast.error(res.message).goAway(3000);
            }
        })
      }

    }
  },
};
</script>
<style>
@import url("@/assets/css/auth/address/index.css");
</style>