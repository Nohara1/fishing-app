<template>
  <button :class="buttonClasses">
    <span v-if="icon" class="button__icon">{{ icon }}</span>
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    icon: {
      type: String,
    },
    variant: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      return ['button', this.variant && `button--${this.variant}`, { active: this.active }]
    },
  },
}
</script>

<style scoped lang="scss">
.button {
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: #3a6ea5;
  color: #f9f9f9;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  transition:
    background-color 0.7s,
    color 0.3s;
  &:hover {
    background-color: #3c87d8;
  }
  &:active {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.6;
  }
  &--content {
    background-color: transparent;
    width: 100%;
    &:hover {
      background-color: #ff914d;
    }
    &.active {
      background-color: #3a6da4;
    }
  }
  &--filter {
    border: 2px solid rgb(45, 74, 89);
    background-color: #2d4a5980;
    white-space: nowrap;
    max-width: 110px;
    font-size: 14px;
    font-weight: 500;
    &.active {
      background-color: #3a6da4;
      border-color: #3a6da4;
    }
    &:hover {
      background-color: #3a6f8a80;
    }
  }
  &--card {
    border: 2px solid rgb(45, 74, 89);
    background-color: #2d4a5980;
    width: 100%;
    &:hover {
      background-color: #3a6f8a80;
    }
  }
  &--tag {
    border: 2px solid rgb(45, 74, 89);
    background-color: #2d4a5980;
    max-width: 120px;
    &:hover {
      background-color: #3a6f8a80;
    }
    &.active {
      border: 2px solid rgb(58, 110, 165);
      background-color: rgb(58, 110, 165);
      &:hover {
        background-color: #3a6ea5e6;
      }
    }
  }
}
</style>
