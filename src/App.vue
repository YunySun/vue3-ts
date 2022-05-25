<template>
  <div>Hello Webpack!</div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss">

#app{
    div{
        color: purple;
        display: inline-block;
        animation: rotating 6s linear infinite;
    }
}
@keyframes rotating{
    from{
        transform: rotate(0);
    }
    to{
        transform: rotate(360deg);
    }
}

</style>