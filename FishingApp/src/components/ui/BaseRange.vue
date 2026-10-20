<template>
  <div class="range">
    <label class="range__label" :for="label.id"
      >{{ label.name }} ({{ label.min }} - {{ label.max }}): {{ model }}{{ label.si }}
    </label>
    <input
      v-model.number="model"
      type="range"
      :min="label.min"
      :max="label.max"
      :step="label.step"
      class="range__input"
      :id="label.id"
    />
  </div>
</template>

<script setup>
const model = defineModel({ type: Number, default: 0 })
defineProps({
  label: {
    type: Object,
    required: true,
  },
})
defineOptions({
  name: 'BaseRange',
})
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
