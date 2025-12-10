<template>
  <header class="header">
    <div class="header__content">
      <div class="header__icon">{{ header.icon }}</div>
      <div class="header__text">
        <div class="header__text-title">{{ header.title }}</div>
        <div class="header__text-subtitle">{{ header.subtitle }}</div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'BaseHeader',
  props: {
    header: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 22px;
  background-color: #1b3a4b;
  max-height: 81px;
  border-bottom: 1px solid #4b5563;
  &__content {
    display: flex;
    gap: 12px;
  }
  &__icon {
    font-size: 24px;
  }
  &__text {
    display: flex;
    flex-direction: column;
    &-title {
      font-size: 20px;
      color: #fff;
    }
    &-subtitle {
      font-size: 14px;
      color: #b3b3b3;
      font-weight: 400;
    }
  }
}
</style>
