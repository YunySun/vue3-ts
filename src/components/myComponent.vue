<template>
  <p class="foo bar" @click="$emit('change-name')">Hi! {{ name }}</p>
</template>

<script>
import { ref, onUpdated } from 'vue';

export default {
  name: 'myComponent',
  props: ['title'],
  // emits: ['change-name'],
  // 和组件配合样式
  setup(props) {
    const name = ref(props.title);
    const a = ref(1);

    onUpdated(() => {
      name.value = props.title;
    });

    return {
      a,
      name,
    };
  },
};
</script>
