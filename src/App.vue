<template>
  <div>
    <button @click="increment">Count is: {{ count }}</button>
    <span>{{ foo + 1 }}</span>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    console.log(count);
    console.log(count.value);

    count.value += 1;
    console.log(count.value);

    const objectRef = ref({ count: 0 });

    // 这是响应式的替换
    objectRef.value = { count: 1 };

    const obj = {
      foo: ref(1),
      bar: ref(2),
    };

    function callSomeFunction(foo) {
      const newFoo = foo;
      newFoo.value = 4;
      console.log(obj.foo);
    }

    callSomeFunction(obj.foo);

    function increment() {
      count.value += 1;
    }

    return {
      count,
      increment,
      ...obj,
    };
  },
};
</script>

<style lang="scss">
</style>
