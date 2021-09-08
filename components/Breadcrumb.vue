<template>
  <div v-if="info">
    <div class="title_full">
      <h2>{{info.title}}</h2>
    </div>
    <div class="clearfix"></div>

    <div class="bread-crumb">
      <ul class="breadcrumb">
        <li class="home">
          <nuxt-link to="/"><span>Trang chủ</span></nuxt-link>
          <span class="mr_lr">&nbsp;/&nbsp;</span>
        </li>
        <li>
          <nuxt-link :to="info.canonical"><span>{{info.title}}</span></nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    },
  },
};
</script>
