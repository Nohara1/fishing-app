<template>
  <input class="input" v-bind="$attrs" :value="modelValue" @input="updateInput" />
</template>
<script>
export default {
  name: 'BaseInput',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
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
