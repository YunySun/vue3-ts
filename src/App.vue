<!--
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-22 21:36:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-07-04 23:56:03
-->
<template>
  <div class="app-wrapper">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-sub-menu :index="route.name" v-for="(route) in routesRef" :key="route.name">
        <template #title>
          <el-icon>
            <component :is="'location'" />
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { routes } from './router'

export default defineComponent({
  name: 'app',
  setup() {
    const routesRef = ref(routes)
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }

    return { handleOpen, handleClose, routesRef }
  },
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