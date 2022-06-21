<template>
  <div class="wrapper">
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="response">Data loaded:
      <pre>{{ response }}}</pre>
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import { useAxios } from '@/uses/useAxios';

export default {
  name: 'app',
  setup() {
    const { response, error } = useAxios('listmodules', {
      pageconfig: 'index',
    });

    return {
      error,
      response,
    };
  },
};
</script>
