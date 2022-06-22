<template>
  <div class="home-wpp">
    <router-link to="/provide">07关于Provide和Inject</router-link>
    <router-link to="/useRequest">08使用Axios请求</router-link>
    <router-link to="/state">关于状态管理Pinia</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'homePageView',
})
</script>
