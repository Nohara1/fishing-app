<template>
  <div class="list">
    <div class="list__inner">
      <h2 v-if="heading" class="list__heading u-heading">
        <p v-if="icon" class="list__icon u-icon">{{ icon }}</p>
        {{ heading }}
      </h2>
      <ul class="list__items">
        <li v-for="list in lists" :key="list.id" class="list__item">
          <slot name="list" :list="list">
            <div class="list__left">
              <span class="list__icon">{{ list.icon }}</span>
              <span class="list__name">{{ list.title }}</span>
            </div>
            <div class="list__right">
              <span class="list__result">{{ list.result }}</span>
            </div>
          </slot>
          <!-- <div class="list__item-inner">
            <p class="list__item-icon">{{ list.icon }}</p>
            <div class="list__item-content">
              <p class="list__item-title">{{ list.title }}</p>
              <p class="list__item-text" v-if="list.text">{{ list.text }}</p>
            </div>
            <div class="list__item-result">{{ list.result }}</div>
          </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseList',
  props: {
    heading: String,
    icon: String,
    lists: Array,
  },
}
</script>
<style lang="scss" scoped>
.list {
  &__inner {
    border: 2px solid #4e5866;
    border-radius: 18px;
    padding: 24px;
    background-color: #1b3a4b;
    gap: 24px;
    display: flex;
    flex-direction: column;
  }
  &__heading {
    font-size: 20px;
    font-weight: 500;
  }
  &__items {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__item {
    border-radius: 18px;
    background-color: #273e4b;
    &-inner {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 18px;
    }
    &-result {
      margin-left: auto;
    }
    &-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    &-title {
      font-weight: 600;
      font-size: 16px;
    }
    &-text {
      font-size: 14px;
    }
  }
}
</style>
