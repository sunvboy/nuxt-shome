<template>
  <div id="sort-by" @mouseenter="mouseOver" @mouseleave="isShowSelect = false">
    <label class="left hidden-xs">Sắp xếp:</label>
    <ul>
      <li>
        <span class="val">{{nameSort}}</span>
        <ul class="ul_2" v-if="isShowSelect">
          <li >
            <a href="javascript:;" @click.prevent="handleSortby('id|desc')">Mặc định</a>
          </li>
          <li>
            <a href="javascript:;" @click.prevent="handleSortby('title|asc')">A → Z</a>
          </li>
          <li>
            <a href="javascript:;" @click.prevent="handleSortby('title|desc')">Z → A</a>
          </li>
          <li>
            <a href="javascript:;" @click.prevent="handleSortby('price|asc')" >Giá tăng dần</a >
          </li>
          <li>
            <a href="javascript:;" @click.prevent="handleSortby('price|desc')">Giá giảm dần</a >
          </li>
          <li>
            <a href="javascript:;" @click.prevent="handleSortby('created|desc')">Hàng mới nhất</a>
          </li>
          <li>
            <a href="javascript:;" @click.prevent="handleSortby('created|asc')">Hàng cũ nhất</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameSort: 'Mặc định',
      isShowSelect: false,
    }
  },
  methods: {
    handleSortby(sort) {
      switch(sort) {
        case 'id|desc':
          this.nameSort = "Mặc định"
          break;
        case 'title|asc':
           this.nameSort = "A → Z"
          break;
        case 'title|desc':
           this.nameSort = "Z → A"
          break;
        case 'price|desc':
           this.nameSort = "Giá tăng dần"
          break;
        case 'price|asc':
           this.nameSort = "Giá giảm dần"
          break;
        case 'created|desc':
           this.nameSort = "Hàng mới nhất"
          break;
        case 'created|asc':
           this.nameSort = "Hàng cũ nhất"
          break;
        default:
          this.nameSort = "Mặc định"
      }
      this.isShowSelect = !this.isShowSelect
     
      this.$emit('handleListPostsEmitSort',sort)
    },
    mouseOver(){
      this.isShowSelect = !this.isShowSelect
    }
  },
  
};
</script>

<style></style>
