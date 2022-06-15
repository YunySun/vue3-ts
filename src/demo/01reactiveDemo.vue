<template>
  <div>
    <button @click="increment">Count is: {{ state.count }}</button>
    <button @click="mutateDeeply">
      obj nested.count is: {{ obj.nested.count }}, arr is: {{ obj.arr }}
    </button>
  </div>
</template>

<script>
import { reactive, nextTick } from 'vue';
/**
 * reactive 局限性
 * 1 只能对对象类型有效 对string number boolean类型无效
 * 2 解构或者赋值本地变量后 就会失去响应性 不能随意替换响应对象 会导致对初始的响应连接丢失
 */
export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    let n = state.count;
    n += 1;
    let { count } = state;
    count += 1;

    const obj = reactive({
      nested: { count: 0 },
      arr: ['foo', 'bar'],
    });

    function mutateDeeply() {
      obj.nested.count += 1;
      obj.arr.push('baz');
    }

    function increment() {
      console.log(n, count, state.count);
      state.count += 1;
      nextTick(() => {
        // 访问更新后的DOM
      });
    }

    // 暴露state到模板
    return {
      state,
      increment,
      obj,
      mutateDeeply,
    };
  },
};
</script>

<style lang="scss">
</style>
