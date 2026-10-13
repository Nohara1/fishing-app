<template>
  <div class="sidebar__header">
    <div class="sidebar__logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"
        ></path>
        <path d="M18 12v.5"></path>
        <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"></path>
        <path
          d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"
        ></path>
        <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"></path>
        <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"></path>
      </svg>
    </div>
    <div class="sidebar__name">
      <h1 class="sidebar__title">{{ heading }}</h1>
      <span class="sidebar__subtitle">{{ subheading }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SideBarHeader',
  props: {
    heading: {
      type: String,
      default: 'FishDay',
    },
    subheading: {
      type: String,
      default: 'Помощник рыбака',
    },
  },
}
</script>
<style lang="scss" scoped>
.sidebar {
  &__header {
    display: flex;
    align-items: center;
    padding: 16px 24px;
    gap: 12px;
    border-right: 1px solid #4b5563;
    border-bottom: 1px solid #4b5563;
  }
  &__logo {
    background-color: #3a6ea5;
    border-radius: 18px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  &__title {
    font-weight: 600;
    color: #fff;
    font-size: 20px;
  }
  &__subtitle {
    font-weight: 400;
    color: #b3b3b3;
    font-size: 14px;
  }
}
</style>
