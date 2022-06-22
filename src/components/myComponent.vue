<template>
<div class="my-component-wpp">
  <p class="foo bar" @click="$emit('change-name')">Hi! {{ name }}</p>
  <p class="foo bar" @click="$emit('update:modelValue', 12)">v-model: {{ modelValue }}</p>
  v-model input <input type="text" v-model.lazy="value" />
  <p>
    <input type="text" :value="modelValue" @input="emitValue">
  </p>
  <slot :text="name"></slot>
</div>
</template>

<script>
import {
  ref, onUpdated, computed,
} from 'vue';

export default {
  name: 'myComponent',
  props: ['title', 'modelValue', 'modelModifiers'],
  emits: ['change-name', 'update:modelValue'],
  // emits: ['change-name'],
  // 和组件配合样式
  setup(props, ctx) {
    const name = ref(props.title);
    const a = ref(1);

    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        ctx.emit('update:modelValue', value);
      },
    });

    onUpdated(() => {
      name.value = props.title;
    });

    function emitValue(e) {
      let { value } = e.target;
      if (props.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      ctx.emit('update:modelValue', value);
    }

    return {
      a,
      name,
      value,
      emitValue,
      message,
      messageAction,
    };
  },
};
</script>
