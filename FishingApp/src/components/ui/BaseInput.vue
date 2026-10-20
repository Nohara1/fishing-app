<template>
  <input class="input" v-model="model" />
</template>
<script setup>
const model = defineModel({ type: String, default: '' })
defineOptions({
  name: 'BaseInput',
})
</script>
<style scoped>
.input {
  width: 100%;
  border: 2px solid rgb(45, 74, 89);
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 12px;
  min-height: 48px;
  color: #fff;
  background-color: #2d4a594d;
}
</style>
