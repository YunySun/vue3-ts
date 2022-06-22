<template>
  <div class="wrapper">
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="response">Data loaded:
      <pre>{{ response }}}</pre>
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script lang="ts">
import { useRequest } from '@/uses/useRequest'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'useRequestPage',
  setup() {
    const { response, error } = useRequest('listmodules', {
      pageconfig: 'index',
    })

    return {
      error,
      response,
    }
  },
})
</script>
