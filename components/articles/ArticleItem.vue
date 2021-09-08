<template>
  <article :class="className" v-if="item">
    <article-item-image :image="item.image" :title="item.title" :slug="'/bai-viet/'+item.slug"></article-item-image>
    <div class="article-item__content">
      <article-item-catalogue v-if="isCatalogue && item.listCatalogue" :listCatalogue="item.listCatalogue"></article-item-catalogue>
      <article-item-stats v-if="isStats" :viewed="item.viewed"></article-item-stats>
      <article-item-title :title="item.title" :slug="'/bai-viet/'+item.slug"></article-item-title>
      <article-item-description v-if="isDescription" :description="item.description"></article-item-description>
      <article-item-info :user_created="item.user_created" :user_avatar="item.user_avatar"  :created="item.created"></article-item-info>
    </div>
  </article>
</template>

<script>
import ArticleItemCatalogue from "./ArticleItemCatalogue.vue";
import ArticleItemDescription from "./ArticleItemDescription.vue";
import ArticleItemImage from "./ArticleItemImage.vue";
import ArticleItemInfo from "./ArticleItemInfo.vue";
import ArticleItemStats from "./ArticleItemStats.vue";
import ArticleItemTitle from "./ArticleItemTitle.vue";
export default {
  components: {
    ArticleItemInfo,
    ArticleItemTitle,
    ArticleItemCatalogue,
    ArticleItemImage,
    ArticleItemStats,
    ArticleItemDescription
  },
  props: {
    isStyleCard: {
      type: Boolean,
      default: false
    },
    isStyleRow: {
      type: Boolean,
      default: false
    },
    isCatalogue: {
      type: Boolean,
      default: false
    },
    isStats: {
      type: Boolean,
      default: false
    },
    isDescription: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default:null
    }
  },
  computed: {
    className() {
      return {
        "article-item": true,
        "style-card": this.isStyleCard,
        "style-row": this.isStyleRow
      };
    }
  }
};
</script>

<style>
@import url(@/assets/css/article-item.css);
</style>
