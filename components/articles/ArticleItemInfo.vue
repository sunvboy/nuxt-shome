<template>
  <div class="article-item__info">
    <div class="article-item__author-image">
      <nuxtLink :aria-label="user_created" to="">
        <img v-if="user_avatar != ''" :src="$config.baseURL+''+user_avatar" :alt="user_created" />
        <img v-else src="/assets/images/john-doe.png" :alt="user_created" />

      </nuxtLink>
    </div>
    <div class="article-item__info-right">
      <div class="article-item__author-name">
        <a href="#"><strong>{{user_created}}</strong></a>
      </div>
      <div class="article-item__datetime">
        <div class="date">{{$dayjs(created).format('DD/MM/YYYY')}}</div>
        <div class="time">
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
          
          {{$dayjs(created).fromNow()}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props:{
    created:{type: String, default: new Date()},
    user_created:{type: String, default: ''},
    user_avatar:{type: String, default: ''},

  }
};
</script>

<style></style>
