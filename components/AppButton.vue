<template>
    <button v-if="!href" :class="classNames"><slot/>
        <svg v-if="isLoading" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="currentColor" stroke-width="10" r="35"
                    stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(120.057 50 50)">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
                    values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
        </svg>
    </button>

    <nuxt-link v-else :to="href" :class="classNames"><slot/></nuxt-link>

</template>

<script>
export default {
    props:{
        href:{
            type:String,
            default: ''
        },
        type:{
            type:String,
            default: 'default'
        },
        isLoading:{
            type:Boolean,
            default: false
        },
        isSizeLarge: {
        type: Boolean,
        default: false
        }
    },
    computed:{
        classNames(){
            return {
                'btn' : true,
                'btn-default': this.type === 'default',
                'btn-category': this.type === 'category',
                'btn-primary': this.type === 'primary',
                'btn-size-large': this.isSizeLarge,
            }

        }
    }

}
</script>

<style>
@import url(@/assets/css/button.css);
</style>
