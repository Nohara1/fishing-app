<template>
  <svg aria-hidden="true" class="icon" :width="width" :height="height">
    <use :href="'#icon-' + name"></use>
  </svg>
</template>
<script setup>
  defineProps({
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
  })
  defineOptions({
    name: 'BaseSvg',
  })
</script>
<style lang="scss" scoped></style>
