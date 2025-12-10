<template>
  <RouterLink :to="`/${button.link}`"
    ><button type="button" class="sidebar__navigation-item">
      <span class="sidebar__navigation-logo">{{ button.logo }}</span>
      <div class="sidebar__navigation-text">
        <h2 class="sidebar__navigation-title">{{ button.title }}</h2>
        <p class="sidebar__navigation-subtitle">{{ button.subtitle }}</p>
      </div>
    </button></RouterLink
  >
  <!-- <button type="button" class="sidebar__navigation-item">
    <span class="sidebar__navigation-logo">{{ button.logo }}</span>
    <div class="sidebar__navigation-text">
      <h2 class="sidebar__navigation-title">{{ button.title }}</h2>
      <p class="sidebar__navigation-subtitle">{{ button.subtitle }}</p>
    </div>
  </button> -->
</template>
<script>
export default {
  name: 'SideBarNavigationItem',
  props: {
    button: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.sidebar__navigation {
  &-item {
    display: flex;
    gap: 10px;
    width: 100%;
    padding: 16px;
    background-color: #1b3a4b;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 18px;
    min-height: 80px;
    align-items: center;
    transition: all 0.3s;
    &:hover {
      background-color: #ff914d;
      scale: 105% 105%;
    }
  }
  &-logo {
    width: 48px;
    height: auto;
    font-size: 24px;
  }
  &-text {
    text-align: left;
  }
  &-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
  }
  &-subtitle {
    font-weight: 400;
    font-size: 14px;
  }
}
</style>
