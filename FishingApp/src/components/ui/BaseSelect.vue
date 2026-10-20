<template>
  <label :for="label.id">{{ label.name }}</label>
  <select class="select" v-model="model" :id="label.id" v-bind="$attrs">
    <option disabled value="">Выберите один из вариантов</option>
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>
<script setup>
const model = defineModel({ type: String, default: '' })
defineOptions({
  name: 'BaseSelect',
})
defineProps({
  label: {
    type: Object,
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
})
</script>
<style lang="scss" scoped>
.select {
  background-color: #1b3a4b;
  border-radius: 12px;
  width: 100%;
  min-height: 36px;
  font-size: 14px;
  padding: 8px 12px;
  color: #b3b3b3;
}
</style>
