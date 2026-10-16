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
    width:{
      type: [Number,String],
      default: 30,
    },
    height:{
      type: [Number,String],
      default: 30,
    }
  },
}
</script>
<style lang="scss" scoped></style>
