<template>
  <div>Hello Webpack!{{ count }}</div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      count: 0,
    };
  },
  mounted() {
    // const result = this.count.split('');
    setTimeout(() => {
      this.count++;
    });
  },
});
</script>

<style lang="scss">
#app {
  div {
    color: purple;
    display: inline-block;
    animation: rotating 6s linear infinite;
  }
}
@keyframes rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>