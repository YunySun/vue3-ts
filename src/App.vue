<!--
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-22 21:36:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-06-30 22:33:53
-->
<template>
  <div class="app-wrapper">
    <el-button type="primary">按钮</el-button>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app',
})
</script>

<style lang="scss">
.app-wrapper {
  color: red;

  .app-test {
    background-color: purple;
  }
}

.app-container {
  background-color: green;
}
</style>