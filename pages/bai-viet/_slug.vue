<template>
  <main class="post-detail">
    <div class="spacing"></div>

    <!-- Post Detail Head -->
    <div class="post-detail__head">
      <div class="container">
        <h1 class="post-detail__title">
          {{detailArticle.title}}
        </h1>
        <ul class="post-detail__info">
          <li class="item author">
            By <a href="#"><strong>{{detailArticle.user_created}}</strong></a>
          </li>
          <li class="item date">{{$dayjs(detailArticle.created).format('DD/MM/YYYY')}}.{{$dayjs(detailArticle.created).fromNow()}}</li>
          <li class="item views" v-if="detailArticle.viewed > 0">{{detailArticle.viewed}} <i class="icons ion-ios-eye"></i></li>
          <li class="item comments" v-if="detailArticle.count_comment > 0">
            {{detailArticle.count_comment}} <i class="icons ion-ios-chatbubble"></i>
          </li>
        </ul>
      </div>
    </div>
    <!-- End Post Detail Head -->

    <div class="spacing"></div>

    <!-- Post Detail Wrapper Content -->
    <div class="post-detail__fluid">
      <div class="container">
        <div class="post-detail__wrapper">
          <!-- Post Detail Content -->
          <div class="post-detail__content">
            <!-- <div class="thumbnail">
              <img :src="detailArticle.image" :alt="detailArticle.title" />
            </div> -->

            <div class="content-padding">
              <!-- Post Detail rich text editor -->
              <div class="rte" v-html="detailArticle.description">
                
              </div>
              <!-- End Post Detail rich text editor -->

              <!-- Post Detail Tags -->
              <div class="post-detail__tags" v-if="detailArticle.listCatalogue">
                <h2>Danh mục bài viết</h2>
                <article-item-catalogue  :listCatalogue="detailArticle.listCatalogue"></article-item-catalogue>

              </div>
              <!-- End Post Detail Tags -->

              <!-- Post Detail Comments -->
              <comments :id="Number(detailArticle.id)" module="article"></comments>
              <!-- End Post Detail Comments -->
            </div>
          </div>
          <!-- End Post Detail Content -->

          <!-- Post Detail Sidebar -->
         
          <div class="post-detail__side">
           

            <sidebar-post-author :image="detailArticle.user_avatar" :name="detailArticle.user_created" :description="detailArticle.user_description"></sidebar-post-author>
            <div class="spacing"></div>
            <sidebar-post :userid_created="Number(detailArticle.userid_created)" :id="Number(detailArticle.id)"></sidebar-post>
          </div>
          <!-- End Post Detail Sidebar -->
        </div>
      </div>
          <div class="spacing"></div>

    </div>
    <!-- End Post Detail Wrapper Content -->
  </main>
</template>

<script>
import {mapState} from 'vuex'
import ArticleItemCatalogue from '../../components/articles/ArticleItemCatalogue.vue';
import Comments from "../../components/comment/Comments.vue";
import SidebarPost from "../../components/articles/SidebarPost.vue";
import SidebarPostAuthor from '../../components/articles/SidebarPostAuthor.vue';
export default {
  components: { Comments, SidebarPost, SidebarPostAuthor, ArticleItemCatalogue },
  validate({ params }) {
    if (!params.slug || params.slug.trim() == "") {
      return false;
    }
    return true;
  },
  async asyncData({ store, params, redirect }) {
    const result = await store.dispatch("article/actFetchDetailArticle", {
      slug: params.slug,
    });
    if (!result.ok) {
        redirect("/");
    } 
  },
  computed: {
    ...mapState({
        detailArticle: state => state.article.detailArticle
    }) 
  },
  data() {
    return {
    }
  }, 
  created () {
    const dataSEO= {
        meta_title: this.detailArticle.meta_title?this.detailArticle.meta_title:this.detailArticle.title,
        meta_description: this.detailArticle.meta_description?this.detailArticle.meta_description.replace(/<[^>]*>?/gm, '').substring(0,320).trim():this.detailArticle.description.replace(/<[^>]*>?/gm, '').substring(0,320).trim(),
        meta_images: this.detailArticle.image?this.detailArticle.image:'',
    }
    this.$parent.$emit("event-seo",dataSEO);
  },
};
</script>

<style>
@import url("~/assets/css/post-detail.css");
table td{
  padding: 5px;
}
</style>