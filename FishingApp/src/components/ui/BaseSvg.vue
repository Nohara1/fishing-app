<template>
    <svg aria-hidden="true" class="icon" :width="width" :height="height">
      <use :href="'#icon-' + name"></use>
    </svg>
</template>
<script>
export default {
  name: 'BaseSvg',
  props: {
    name: {
      type: String,
      required: true,
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
