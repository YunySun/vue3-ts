<template>
  <div class="wrapper">
    <div class="container">
      <input ref="inputRef" />
      <ul>
        <li v-for="(item, index) in list" ref="itemRefs" :key="index">{{ item }}</li>
      </ul>
      <input type="text" :ref="(el) => { inputFuncRef = el }" />
      <my-component ref="myComponentRef" :title="title" @change-name="title = 'Jane'" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import MyComponent from '@/components/myComponent.vue';

export default {
  setup() {
    const inputRef = ref(null);
    const itemRefs = ref([]);
    const list = ref(['zhao', 'qian', 'sun']);
    const inputFuncRef = ref(null);
    const myComponentRef = ref(null);
    const title = ref('Mick');

    onMounted(() => {
      inputRef.value.focus();
      console.log('itemRefs: ', itemRefs.value);
      console.log('inputFuncRef: ', inputFuncRef.value);
      console.log('myComponentRef: ', myComponentRef.value);
    });
    return {
      inputRef,
      list,
      itemRefs,
      inputFuncRef,
      myComponentRef,
      title,
    };
  },
  components: { MyComponent },
};
</script>
