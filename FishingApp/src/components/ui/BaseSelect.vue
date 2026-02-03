<template>
  <label :for="label.id">{{ label.name }}</label>
  <select class="select" :value="modelValue" @change="onChange" :id="label.id">
    <option disabled value="">Выберите один из вариантов</option>
    <option v-for="option in options" :key="option.id" :value="option.name">{{ option.name }}</option>
  </select>
</template>
<script>
export default {
  name: 'BaseSelect',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: Object,
    options: Array,
  },
  methods: {
    onChange(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
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
