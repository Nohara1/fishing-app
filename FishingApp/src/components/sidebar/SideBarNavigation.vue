<template>
  <div class="sidebar__navigation">
    <nav class="sidebar__navigation-list">
      <SideBarNavigationItem v-for="button in buttons" :key="button.title" :button="button" />
    </nav>
  </div>
</template>
<script setup>
import SideBarNavigationItem from '@/components/sidebar/SideBarNavigationItem.vue'
defineOptions({
  name: 'SideBarNavigation',
})
defineProps({
  buttons: {
    type: Array,
    required: true,
  },
})
</script>
<style lang="scss" scoped>
.sidebar__navigation {
  &-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
