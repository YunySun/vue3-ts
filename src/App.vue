<template>
  <div class="app-wrapper">
    <el-button type="primary">测试按钮</el-button>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app',
})
</script>
