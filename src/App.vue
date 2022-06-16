<template>
  <div class="wrapper">
    <div class="container" :class="{active: isActive, 'text-danger': err}">ref</div>
    <div class="container" :class="classObject">reactive</div>
    <div class="container" :class="classObject2">computed</div>
    <div class="container" :class="[isActive ? activeClass : '', errorClass]">Arr Class</div>
    <my-component class="container"
      :class="{active: isActive, 'text-danger': err}"
      :style="{ fontSize: (fontSize + 'px')}"
    />
    <div class="container" :style="styleObject" >reactive Style</div>
    <div class="container" :style="[baseStyles, overridingStyles]" >Arr Style</div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import MyComponent from '@/components/MyComponent';

export default {
  components: { MyComponent },
  setup() {
    const isActive = ref(true);
    const err = ref(null);
    const classObject = reactive({
      active: true,
      'text-danger': false,
    });

    const classObject2 = computed(() => ({
      active: isActive.value && !err.value,
      'text-danger': err.value && err.value.type === 'fatal',
    }));

    // 绑定数组
    const activeClass = ref('active');
    const errorClass = ref('text-danger');

    // 绑定内联样式
    const activeColor = ref('lightblue');
    const fontSize = ref(30);

    const styleObject = reactive({
      fontSize: '24px',
      color: 'pink',
    });

    const baseStyles = reactive({ fontSize: '16px', color: 'red' });
    const overridingStyles = reactive({ backgroundColor: 'lightgreen' });

    return {
      isActive,
      err,
      classObject,
      classObject2,
      activeClass,
      errorClass,
      activeColor,
      fontSize,
      styleObject,
      baseStyles,
      overridingStyles,
    };
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  .container {
    width: 100px;
    height: 100px;
    background-color: lightcoral;
    &.active {
      background-color: lightblue;
    }

    &.text-danger {
      color: red;
    }
  }
}
</style>
