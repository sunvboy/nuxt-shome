<template>
  <div class="related-post" v-if="listData.length > 0">
    <h2 class="related-post__head">Bài viết liên quan</h2>
   
    <article class="related-post__card" v-for="v in listData" :key="v.id">
      <nuxtLink :to="v.canonical" class="related-post__title">{{v.title}}</nuxtLink>
      <div class="related-post__info">
        <a class="related-post__author" href="#">{{v.user_created}}</a>
        <p class="related-post__date">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            class="css-uk6cul"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
            ></path>
          </svg>
          {{dateTime.relative}}
        </p>
      </div>
    </article>

  </div>
</template>

<script>
export default {
  props: {
    userid_created: {
      type: Number,
      default: 0
    },id: {
      type: Number,
      default: 0
    },
  },
  async fetch() {
    try {
      const res = await this.$store.dispatch('article/actFetchRelatedPosts', {
        authid: this.userid_created,
        id: this.id,

      })
      if (res.ok) {
        this.listData = res.data;
      }
    } catch(e) {

    }
  },
  data() {
    return {
      listData: []
    }
  },
  computed:{
    dateTime() {
      let created = this.listData.created;
      let createdDayjs = this.$dayjs(created);

      return {
        format: createdDayjs.format('DD/MM/YYYY'),
        relative: createdDayjs.fromNow(),
      }
    }
  }

};
</script>

<style>
@import url("~/assets/css/related-posts.css");
</style>