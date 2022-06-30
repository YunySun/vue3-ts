<!--
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-22 21:36:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-06-30 22:25:15
-->
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

<style scoped lang="scss">
.test {
  color: lightgreen;

  .home-cc {
    background-color: gold;
  }
}

.home-cc {
  background-color: gold;
}

.home-wpp {
  background-color: aqua;
}
</style>
