<template>
  <div class="range">
    <label class="range__label" :for="label.id"
      >{{ label.name }} ({{ label.min }} - {{ label.max }}): {{ modelValue }}{{ label.si }}
    </label>
    <input
      :value="modelValue"
      @input="onInput"
      type="range"
      :min="label.min"
      :max="label.max"
      :step="label.step"
      class="range__input"
      :id="label.id"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseRange',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
</script>

<style scoped lang="scss">
.range {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &__input {
    appearance: none;
    height: 12px;
    border-radius: 10px;
    background-color: #3a6ea580;
  }
}
</style>
