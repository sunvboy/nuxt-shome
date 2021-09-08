<template>
  <div v-if="productImage">
    <div class="product-img">
      <img :src="imgProduct" />
    </div>
    <div class="carousel-img">
      <VueSlickCarousel v-bind="settings" ref="carousel">
        <a
          href=""
          v-for="(v, k) in productImage"
          :key="k"
          @click.prevent="handeImage(v)"
          ><img :src="v"
        /></a>
      </VueSlickCarousel>
      <button class="prevButton" @click="showPrev">
        <i class="ion-chevron-left"></i>
      </button>
      <button class="nextButton" @click="showNext">
        <i class="ion-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  components: {
    VueSlickCarousel
  },
  props: {
    productImage: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      imgProduct: this.productImage[0],
      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: false,
        arrows: false,
        centerMargin: "20px"
      }
    };
  },
  methods: {
    handeImage(img) {
      this.imgProduct = img;
    },
    showNext() {
      this.$refs.carousel.next();
    },
    showPrev() {
      this.$refs.carousel.prev();
    }
  }
};
</script>

<style>
.slick-prev:before,
.slick-next:before {
  color: #000;
}
.slick-next {
  right: 0px;
}
.slick-prev {
  left: 0px;
  z-index: 99;
}
.product-img img {
  height: 300px;
  object-fit: contain;
  background: #fff;
  width: 100%;
}
.carousel-img img {
  height: 100px;
  object-fit: contain;
  background: #fff;
  width: 100%;
}
.prevButton {
  left: 0px;
}
.nextButton {
  right: 0px;
}
.carousel-img button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: 0px;
  background: transform;
}
</style>
