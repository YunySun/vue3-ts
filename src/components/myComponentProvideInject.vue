<template>
  <div class="my-component-wpp">
    <p class="foo bar" @click="$emit('change-name')">Hi! {{ name }}</p>
    <p class="foo bar" @click="$emit('update:modelValue', 12)">v-model: {{ modelValue }}</p>
    v-model input <input type="text" v-model.lazy="value" />
    <p>
      <input type="text" :value="modelValue" @input="emitValue">
    </p>
    <slot :text="name"></slot>
    <div @click="changeMessage('newMessage')">
      message： {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onUpdated, computed, inject } from 'vue'

export default {
  name: 'myComponent',
  props: ['title', 'modelValue', 'modelModifiers'],
  emits: ['change-name', 'update:modelValue'],
  // emits: ['change-name'],
  // 和组件配合样式
  setup(props, ctx) {
    const name = ref(props.title)
    const a = ref(1)
    // const message = inject('message');
    // console.log(message);
    // provide inject
    const { message, changeMessage } = inject('messageAction')

    const value = computed({
      get() {
        return props.modelValue
      },
      set(val) {
        ctx.emit('update:modelValue', val)
      },
    })

    onUpdated(() => {
      name.value = props.title
    })

    function emitValue(e: Event) {
      let val = (e.target as HTMLInputElement).value
      if (props.modelModifiers.capitalize) {
        val = val.charAt(0).toUpperCase() + val.slice(1)
      }
      ctx.emit('update:modelValue', val)
    }

    return {
      a,
      name,
      value,
      emitValue,
      message,
      changeMessage,
    }
  },
}
</script>
