<template>
  <div >
    <aside class="aside-item" v-for="(item, index) in attribute_catalogue" :key="index">
      <div class="aside-title">
        <h2 class="title-head margin-top-0">
          <span>{{ index }}</span>
        </h2>
      </div>
      <div class="aside-content">
        <ul>
          <li class="filter-item" v-for="(v, k) in item" :key="k">
            <span   v-if="v !== item.keyword_cata">
              <label :for="`filter-duoi-${k}`">
                <input
                  class="inputFilter"
                  @change.prevent="handleChange($event)"
                  v-model="attr"
                  type="checkbox"
                  :id="`filter-duoi-${k}`"
                  :value="`${item.keyword_cata};${k}`"
                />
                <span>{{ v }}</span>
              </label>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: {
    attribute_catalogue: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      attr: []
    };
  },
  methods: {
    ...mapActions({
      actFetchListProductByCatalogue: "product_catalogue/actFetchListProductByCatalogue"
    }),
    handleChange() {
      const attrArray = this.attr;
      let text = '';
      const inputFilter = document.getElementsByClassName('inputFilter', 'input');
      inputFilter.forEach((item) => {
        if(item.checked === true ){
          text += item.value+';'
        }
      })
      attrArray.forEach((item) => {
        if(text.search(item) < 0){
          text += item+';'
        }
      })
      this.$emit('handleListPostsEmit',text)
    }
    
  },
  mounted () {

      const inputFilter = document.getElementsByClassName('inputFilter', 'input');
      inputFilter.forEach((item) => {
        if(item.value == this.$route.query.attr){
          document.getElementById(item.id).checked = true;
        }
      })
    
     
  },
   watch: {
    $route(to, from) {
        const inputFilter = document.getElementsByClassName('inputFilter', 'input');
        inputFilter.forEach((item) => {
          document.getElementById(item.id).checked = false;
          if(item.value == this.$route.query.attr){
            document.getElementById(item.id).checked = true;
          }
        })
    }
  },
};
</script>

<style></style>
