<template>
  <div class="info">
    <div class="info__inner">
      <slot name="heading"></slot>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseInfoCard',
}
</script>
<style lang="scss" scoped>
.info {
  &__inner {
    padding: 24px;
    background-color: #1b3a4b;
    border-radius: 18px;
    border: 2px solid #4b5563;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  &__content {
    :deep() &-found {
      font-size: 16px;
      color: #fff;
    }
    &-inner {
      @extend %info__content-inner !optional;
    }
  }
  :deep() &__heading {
    display: flex;
    font-size: 20px;
    gap: 16px;
    align-items: center;
    font-weight: 500;
    color: #fff;
  }
  &--reservoirs {
    & :deep(.info__content-items) {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    & :deep(.info__content-item) {
      &.active {
        %info__content-inner {
          border-color: #3a6ea5;
        }
      }
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        & %info__content-inner {
          border-color: #ff914d;
          background-color: #ff914d80;
        }
        transform: scale(1.05);
      }
    }
    & :deep(.info__content-inner) {
      display: flex;
      flex-direction: column;
      gap: 8px;
      border: 2px solid #4b5563;
      padding: 16px;
      border-radius: 18px;
    }
    & :deep(.info__content-head) {
      display: flex;
      justify-content: space-between;
    }
    & :deep(.info__content-body),
    & :deep(.info__content-bottom) {
      display: flex;
      gap: 8px;
    }
    & :deep(.info__content-name) {
      color: #fff;
      font-size: 20px;
      font-weight: 500;
    }
    & :deep(.info__content-body) {
      color: #b3b3b3;
      font-size: 16px;
      font-weight: 500;
    }
    & :deep(.info__content-fish) {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      padding: 4px 12px;
      border: 1px solid #4b5563;
      border-radius: 12px;
      line-height: 1.43;
    }
    & :deep(.info__content-score) {
      padding: 4px 8px;
      background-color: #733e0a33;
      border-radius: 14px;
      height: 100%;
      color: #fff;
    }
  }
  &--weather {
    & :deep(.info__content-items) {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    & :deep(.info__content-item) {
      display: flex;
      justify-content: space-between;
      flex: 1 1 calc(50% - 12px);
      max-width: calc(50% - 12px);
      padding: 12px;
      border-radius: 14px;
      background-color: #32424b;
      &:last-child {
        flex: 1 1 100%;
        max-width: 100%;
      }
    }
    & :deep(.info__content-params) {
      color: #c0bfb1;
      font-size: 16px;
    }
    & :deep(.info__content-value) {
      color: #fff;
      font-weight: 600;
    }
  }
}
</style>
