<template>
  <ul class="article-item__stats">
    <li>
      <i class="icons ion-ios-eye"></i>
      <span class="text">{{viewed}} views</span>
    </li>
  </ul>
</template>

<script>
export default {
  props:{
    viewed: {type: String,default: ""}
  }
};
</script>

<style></style>
