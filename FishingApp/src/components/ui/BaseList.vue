<template>
  <div :class="listClasses">
    <div class="list__inner">
      <h2 v-if="heading" class="list__heading u-heading">
        <p v-if="icon" class="list__icon u-icon">{{ icon }}</p>
        {{ heading }}
      </h2>
      <component :is="as" class="list__items">
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
        </li>
      </component>
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
    variant: {
      type: String,
    },
    as: {
      type: String,
      default: 'ul',
    },
  },
  computed: {
    listClasses() {
      return ['list', this.variant && `list--${this.variant}`]
    },
  },
}
</script>
<style lang="scss" scoped>
ol {
  margin: 0;
  padding-left: 1.8rem;
  %list_item::marker {
    color: #3a6ea5;
    font-weight: 400;
    font-size: 14px;
  }
}
.list {
  &__inner {
    border: 2px solid #4e5866;
    border-radius: 18px;
    padding: 24px;
    background-color: #1b3a4b;
    gap: 24px;
    display: flex;
    flex-direction: column;
    %list_unstyled & {
      border: none;
      padding: 0;
    }
  }
  &__heading {
    font-size: 20px;
    font-weight: 500;
  }
  &__items {
    display: flex;
    flex-direction: column;
    gap: 16px;
    %list_unstyled & {
      gap: 8px;
    }
  }
  &__item {
    border-radius: 18px;
    background-color: #273e4b;
    @extend %list_item !optional;
    %list_unstyled & {
      border-radius: 0;
      background-color: transparent;
    }
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
  &--unstyled {
    @extend %list_unstyled !optional;
  }
}
</style>
