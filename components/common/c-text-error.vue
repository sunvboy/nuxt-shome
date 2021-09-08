<template>
  <div class="_9ay7" v-if="txtError">{{ txtError }}</div>
</template>

<script>
export default {
    props: {
        txtError: {
            type: String,
            default: ''
        },
    },
}
</script>

<style>
._9ay7 {
  color: #f02849;
  font-size: 13px;
  line-height: 16px;
  text-align: left;
  margin: 10px 0px;
}
</style>