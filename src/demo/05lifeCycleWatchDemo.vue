<template>
  <div class="wrapper">
    <div class="container" @click="count+=1">count is : {{ count }}</div>
    <div class="container" @click="x+=1">x is : {{ x }}</div>
    <div class="container" @click="y+=1">y is : {{ y }}</div>
    <div class="container" @click="obj.count+=1">y is : {{ obj }}</div>
  </div>
</template>

<script>
import {
  onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref, watch, reactive,
} from 'vue';

export default {
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  setup() {
    const count = ref(0);
    const x = ref(0);
    const y = ref(0);
    const obj = reactive({ count: 0 });
    console.log('setup');
    onBeforeMount(() => {
      console.log('beforeMount');
    });
    onMounted(() => {
      console.log('mounted');
    });
    onBeforeUpdate(() => {
      console.log('beforeUpdate');
    });
    onUpdated(() => {
      console.log('updated');
    });
    watch(count, (value) => {
      console.log('watch: ', value);
    });
    // 监听getter函数
    watch(() => x.value + y.value, (sum) => {
      console.log('sum of x + y is: ', sum);
    });
    // 监听多个来源组成的数组
    watch([x, () => y.value], ([newX, newY]) => {
      console.log('x is: ', newX, 'y is: ', newY);
    });

    // 无法监听响应式对象的property
    watch(obj.count, (objCount) => {
      console.log(`count is: ${objCount}`);
    });

    // 可以通过getter函数 { deep: true }强制转成深层侦听器
    watch(() => obj.count, (objCount, oldObjCount) => {
      console.log(`getter函数 count is: ${objCount}`);
      console.log(`getter函数 oldObjCount is: ${oldObjCount}`);
    });

    // 深层监听器
    watch(obj, (newObj, oldObj) => {
      console.log('newObj is: ', newObj);
      console.log('oldObj is: ', oldObj);
    });

    /**
     * watch 是懒执行的 仅在侦听源变化的时候 才会执行回调 但是某些场景 希望创建监听器的时候
     * 就执行一边回调
     * watchEffect 会立即执行一次回调函数
     */

    return {
      count,
      x,
      y,
      obj,
    };
  },
};
</script>
