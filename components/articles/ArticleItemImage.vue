<template>
   <div class="article-item__thumbnail">
        <nuxtLink :to="slug">
          <img :src="$config.baseURL+''+image" :alt="title" />
        </nuxtLink>
      </div>
</template>

<script>
export default {
  props:{
    image: {type: String,default: ""},
    title: {type: String,default: ""},
    slug: {type: String,default: ""}
  }
}
</script>

<style>

</style>