<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

<script lang='ts'>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);

    function increment() {
      count.value += 1;
    }

    // 生命周期钩子
    onMounted(() => {
      console.log(`The initial count is ${count.value}`);
    });

    return {
      count,
      increment,
    };
  },
  // data() {
  //   return {
  //     count: 0,
  //   };
  // },
  // methods: {
  //   increase() {
  //     this.count += 1;
  //   },
  // },
  // mounted() {
  //   console.log(`The initial count is ${this.count}`);
  // },
};
</script>

<style lang="scss">
// #app {
//   button {
//     color: purple;
//     display: inline-block;
//     animation: rotating 6s linear infinite;
//   }
// }
// @keyframes rotating {
//   from {
//     transform: rotate(0);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }
</style>
