<template>
  <div class="wrapper-content">
    <div id="fb-root"></div>
    <the-header :fcSystem="fcSystem"></the-header>
    <Nuxt @event-seo="handleSeo"/>
    <the-footer :fcSystem="fcSystem"></the-footer>
    <cart-popup :productCart="productCart"></cart-popup>
    <quick-view></quick-view>
    <c-loading v-if="isLoading" class="show"></c-loading>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import CartPopup from '../components/cart/cart-popup.vue'
import CLoading from '../components/common/c-loading.vue'
import QuickView from '../components/product/quick-view.vue'
import TheFooter from '../components/TheFooter.vue'
import TheHeader from '../components/TheHeader.vue'
export default {
  components: { TheHeader, TheFooter, CartPopup, QuickView, CLoading },
   data() {
    return {
      structuredData: {
        "@context": "http://schema.org",
        "@type": "Recipe",
        "name": "ANCARAT",
        "url": "https://ancarat.com/",
        "logo": "https://ancarat.com/upload/images/logo/logo(1).png",
        "foundingDate": "2001",
        "founders": [
            {
                "@type": "Person",
                "name": "ANCARAT"
            },
            {
                "@type": "Person",
                "name": "TÂM PHÁT"
            }
        ],
        "address": [
            {
                "@type": "PostalAddress",
                "streetAddress": "Hệ thống cửa hàng Ancarat - vàng phong thủy: Showroom 1: 160 Nguyễn Trãi, P. 3, Q. 5, TP. HCM Showroom 2: 27-29 Lê Quang Định, Q. Bình Thạnh, TP. HCM Showroom 3: 236 Lò Đúc, P. Đống Mác, Q. Hai Bà Trưng, Hà Nội  Showroom chuyên về vòng thiết kế - đá phong thủy - bạc 925:  Ancarat Silver, 243 Đề Thám, P. Phạm Ngũ Lão, Q. 1, TP. HCM",
                "addressLocality": "Hà Nội City",
                "addressRegion": "Northeast",
                "postalCode": "100000",
                "addressCountry": "VNM"
            }
        ],
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "19006889",
                "contactType": "customer service"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/ancaratjewelry",
            "https://www.instagram.com/ancarat_jewelry",
            "https://www.youtube.com/channel/UC964CWuZr2pdQppJny2yADQ"
        ]
      },
      dataSEO: {},
      productCart: {}
    }
  },
  head({$config}) {
    return {
      title: this.dataSEO.meta_title?this.dataSEO.meta_title:this.fcSystem.seo_meta_title,
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${$config.baseURL}.${this.fcSystem.homepage_favicon}` },
      ],
      meta: [
        {
          property: "og:locale",
          content: 'vi_VN',
        },{
          hid: "description",
          name: "description",
          charset: "UTF-8",
          content: this.dataSEO.meta_description?this.dataSEO.meta_description.replace(/<[^>]*>?/gm, '').substring(0,320):this.fcSystem.seo_meta_description.replace(/<[^>]*>?/gm, '').substring(0,320),
        },{
          name: "og:type",
          property: "og:type",
          content: 'website',
        },{
          name: "og:title",
          property: "og:title",
          content: this.dataSEO.meta_title?this.dataSEO.meta_title:this.fcSystem.seo_meta_title,
        },{
          name: "og:image",
          content: this.dataSEO.meta_images?`${$config.baseURL}${this.dataSEO.meta_images}`:`${$config.baseURL}${this.fcSystem.seo_meta_images}`,
        },{
          name: "og:description",
          content: this.dataSEO.meta_description?this.dataSEO.meta_description.replace(/<[^>]*>?/gm, '').substring(0,320):this.fcSystem.seo_meta_description.replace(/<[^>]*>?/gm, '').substring(0,320),
        },{
          name: "twitter:card",
          content: 'summary',
        },{
          name: "twitter:title",
          content: this.dataSEO.meta_title?this.dataSEO.meta_title:this.fcSystem.seo_meta_title,
        },{
          name: "twitter:description",
          content: this.dataSEO.meta_description?this.dataSEO.meta_description.replace(/<[^>]*>?/gm, '').substring(0,320):this.fcSystem.seo_meta_description.replace(/<[^>]*>?/gm, '').substring(0,320),
        },{
          name: "twitter:image",
          content: this.dataSEO.meta_images?`${$config.baseURL}${this.dataSEO.meta_images}`:`${$config.baseURL}${this.fcSystem.seo_meta_images}`,
        }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }]
    }
  },
  beforeMount() {
    let initListCart = JSON.parse(window.localStorage.getItem('cart'));
    // let token = window.localStorage.getItem('access_token');
    if(initListCart && initListCart.listCart){
        initListCart = initListCart.listCart || [];
    }else{
        initListCart = [];
    }
    this.$store.commit('cart/myMutation', initListCart)
    // this.$store.dispatch('auth/actFetchCurrentUser', token)

  },
  computed: {
    ...mapState({
      fcSystem: state => state.fcSystem,
      isLoading: state => state.isLoading
    })
  },
  methods: {
    handleSeo(dataSEO) {
     this.dataSEO = dataSEO;
    },
    handlePopupCart(itemProduct){
      this.productCart = itemProduct
    }
  },

}
</script>

<style>
    @import url("@/assets/css/main.css");
</style>