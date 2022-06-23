<template>
  <div class="wrapper">
    <p>Has published books: </p>
    <span>{{ publishedBooksMessage }}</span>
  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue'

export default {
  setup() {
    const author = reactive({
      name: 'John Smith',
      books: ['Vue 2 - Advanced Guide', 'Vue 3 - Basic Guide', 'Vue 4 - The Mystery'],
    })

    // 模板直接操作author.books.length 有些许复杂 可以通过计算属性来描述依赖响应式状态的复杂逻辑
    const publishedBooksMessage = computed(() => (author.books.length > 0 ? 'Yes' : 'No'))
    // 计算属性值会基于其响应式依赖被缓存 计算属性只有再响应式依赖更新的时候才会重新计算 只要author.books不改变;
    // 无论多少次访问publishedBooksMessage都会立即返回先前的计算结果;

    // 可写计算属性
    const firstName = ref('John')
    const lastName = ref('Smith')
    const fullName = computed({
      // getter
      get() {
        return `${firstName.value} ${lastName.value}`
      },
      // setter
      set(newValue) {
        ;[firstName.value, lastName.value] = newValue.split(' ')
      },
    })

    console.log(fullName.value)
    fullName.value = 'Michael Jackson'
    console.log(firstName.value, lastName.value)

    return {
      publishedBooksMessage,
    }
  },
}
</script>
