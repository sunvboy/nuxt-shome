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
                <strong><span>Sản phẩm yêu thích</span></strong>
              </li>
            </ul>
          </div>
        </div>
        <div class="spacing"></div>
        <div class="col-md-3 col-12">
          <aside-left></aside-left>
        </div>
        <div class="col-md-9 col-12">
          <h1 class="title-head margin-top-0">Sản phẩm yêu thích</h1>
          <div class="page-wishlist kagiDG">
            <div class="inner">
                <ul class="list">
                    <li class="item" v-for="item in posts" :key="item.id">
                        <button class="btn-delete" @click="handleDelete(item.id)">×</button>
                        <div class="thumbnail">
                            <nuxt-link :to="`/san-pham/${item.canonical}`">
                                <div class="Picture__StyledPicture-sc-10icj7e-0 jDowEZ  loaded">
                                    <img class="image" :src="item.image" :alt="item.title">
                                </div>
                            </nuxt-link>
                            </div>
                        <div class="body"><nuxt-link class="name" :to="`/san-pham/${item.canonical}`">{{item.title}}</nuxt-link>

                            <div class="description" v-html="item.description.replace(/<[^>]*>?/gm, '').substring(0,320)"></div>
                        </div>
                        <div class="footer">
                            <product-price :price="Number(item.price)" :price_sale="Number(item.price_sale)" :price_contact="Number(item.price_contact)"></product-price>
                        </div>
                    </li>
                    
                </ul>
                <!-- Btn Loadmore -->
                <div class="text-center" v-if="hasMorePosts" style="margin-top:20px">
                    <app-button  @click.native="handleLoadMore" :isLoading="isLoading" type="primary" :isSizeLarge="true">Load more</app-button>
                </div>
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
import ProductPrice from '../../../components/product/ProductPrice.vue';
export default {
  components: { asideLeft, ProductPrice, AppButton },
  middleware: "notauthenticated",
  created() {
    const dataSEO = {
      meta_title: "Sản phẩm yêu thích",
      meta_description: "",
      meta_images: ""
    };
    this.$parent.$emit("event-seo", dataSEO);
  },
  data() {
      return {
        isLoading: false,
      }
  },
  computed: {
    ...mapState({
      posts: (state) => state.auth.wishlist.posts,
      page: (state) => state.auth.wishlist.page,
      totalPage: (state) =>state.auth.wishlist.totalPage,
      totalRow: (state) => state.auth.wishlist.totalRow,
    }),
    hasMorePosts() {
      return this.page < this.totalPage;
    },
    createdCheck() {
      return true;
    },
  },
  async asyncData({ store}) {
    await store.dispatch("auth/actViewWishList",{parentid: 0});
  },
  methods: {
    ...mapActions({
      actViewAddress: "auth/actViewWishList",
      actDeleteWishList: "auth/actDeleteWishList",
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
        this.actDeleteWishList(id).then((res) => {
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
<style scoped>
@import url("@/assets/css/auth/wishlist/index.css");

</style>