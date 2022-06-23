<!--
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-21 09:34:34
 * @LastEditors: 李昶
 * @LastEditTime: 2022-06-23 23:45:24
-->
<template>
  <div class="wrapper">
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="response">Data loaded:
      <!-- <pre>{{ response }}</pre> -->
      <div class="bookstore-wpp">
        <ul>
          <li v-for="(item, index) in response">
            <pre>{{ item }}</pre>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script lang="ts">
import { useRequest } from '@/uses/useRequest'
import { defineComponent } from 'vue'

// :key="`bkw_${index}`"

export default defineComponent({
  name: 'useRequestPage',
  setup() {
    const { response, error } = useRequest({ pageconfig: 'index' })

    return {
      error,
      response,
    }
  },
})
</script>
