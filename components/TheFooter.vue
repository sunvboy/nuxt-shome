<template>
   <footer id="footer" class="bg-white">
      <div class="container">
        <div class="footer">
          <div class="row">

            <!-- Footer Column -->
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="footer-logo">
                <img :src="fcSystem.homepage_logo" :alt="fcSystem.homepage_company">
              </div>
              <p>© 2021, All Rights Reserved.</p>
              <p>Created by <a href="https://www.facebook.com/quyen.57/" target="_blank">Quyen</a></p>
            </div>

            <!-- Footer Column -->
            <menu-footer></menu-footer>

            <!-- Footer Column -->
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="footer-title">
                <p>Liên hệ</p>
              </div>
              <ul class="footer-content__list">
                <li>{{fcSystem.contact_address}}</li>
                <li>{{fcSystem.contact_hotline}}</li>
              </ul>
            </div>

            <!-- Footer Column -->
            <div class="col-12 col-sm-6 col-md-4 col-lg-4">
              <div class="footer-title">
                <p>Fanpage</p>
              </div>
              <div class="footer-facebook">
                <div class="fb-page" :data-href="fcSystem.social_facebook" data-tabs=""
                  data-width="" data-height="" data-small-header="false" data-adapt-container-width="true"
                  data-hide-cover="false" data-show-facepile="true">
                  <blockquote :cite="fcSystem.social_facebook"
                    class="fb-xfbml-parse-ignore">
                    <a :href="fcSystem.social_facebook"></a>
                  </blockquote>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
</template>
<script>
import MenuFooter from './common/MenuFooter.vue'
export default {
  components: { MenuFooter },
  props: {
    fcSystem: {
      fcSystem: Object,
      default: null
    },
  },
}
</script>


<style>
    @import url("@/assets/css/footer.css");
</style>