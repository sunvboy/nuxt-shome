<template>
  <ul :class="getClassRoot">
    <li v-for="v in listMenu" :key="v.id">
      <nuxtLink v-if="!v.link.startsWith('http')" :to="`/${v.link}`">{{ v.title }}</nuxtLink>
      <a v-else :href="v.link" target="_blank">{{ v.title }}</a>

      <menu-header
        :isRoot = "false"
        v-if="v.children"
        :listMenu="v.children"
      ></menu-header>
      
    </li>
  </ul>
</template>

<script>
export default {
  name: "menu-header",
  props: {
    isRoot: {
      type: Boolean,
      default: false,
    },
    listMenu: {
      type: Array,
      default: [],
    },
  },
  computed: {
    getClassRoot(){
        return {
            'header-nav__lists': this.isRoot === true
        }
    }
  },
};
</script>

<style></style>
