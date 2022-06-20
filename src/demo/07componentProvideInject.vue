<template>
  <div class="wrapper">
    {{ count }}
    <my-component title="mike" v-model.capitalize="count" v-slot="slotProps">{{ slotProps.text }}</my-component>
  </div>
</template>

<script>
import { ref, provide, defineAsyncComponent } from 'vue';
// 异步引入组件
const MyComponent = defineAsyncComponent(() => import('@/components/myComponentProvideInject.vue'));
// import MyComponent from '@/components/myComponentProvideInject.vue';

export default {
  setup() {
    const count = ref(1);
    const message = ref('hello');
    // provide('message', 'hello');

    function changeMessage(val) {
      message.value = val;
    }

    provide('messageAction', {
      message,
      changeMessage,
    });

    return {
      count,
    };
  },
  components: { MyComponent },
};
</script>
