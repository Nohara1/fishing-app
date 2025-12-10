<template>
  <div class="inner-items" v-if="innerItems">
    <div :class="innerItemClass" v-for="innerItem in innerItems" :key="innerItem.id">
      <slot name="innerItem" :item="innerItem">
        <div class="inner-item__inner">
          <div class="inner-item__icon">{{ innerItem.icon }}</div>
          <p class="inner-item__title">{{ innerItem.title }}</p>
          <p class="inner-item__text">{{ innerItem.text }}</p>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseInnerItem',
  props: {
    innerItems: Array,
    variant: String,
  },
  computed: {
    innerItemClass() {
      return ['inner-item', this.variant && `inner-item--${this.variant}`]
    },
  },
}
</script>
<style lang="scss" scoped>
.inner-items {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
.inner-item {
  width: 100%;
  border: 2px solid #4e5866;
  padding: 24px;
  border-radius: 18px;
  background-color: #1b3a4b;
  &__inner {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  &__icon {
    font-size: 30px;
    line-height: 1;
  }
  &__title {
    font-weight: 700;
    font-size: 20px;
  }
  &__text {
    font-size: 14px;
    color: #b3b3b3;
  }
  &--orange {
    background-color: #32424b;
    border: 2px solid #504d4b;
  }
  &--secondary {
    border: none;
    background-color: #112020;
  }
  &--primary {
    font-size: 24px;
    font-weight: 700;
  }
}
</style>
