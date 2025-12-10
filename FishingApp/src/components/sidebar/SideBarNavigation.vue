<template>
  <div class="sidebar__navigation">
    <nav class="sidebar__navigation-list">
      <SideBarNavigationItem v-for="button in buttons" :key="button.title" :button="button" />
    </nav>
    <!-- <BaseButton variant="filter">Подробнее</BaseButton>
    <BaseButton variant="tag">Вся рыба</BaseButton>
    <BaseButton variant="tag" active="true" icon="🌱">Весна</BaseButton>
    <BaseButton variant="tag" icon="☀️">Лето</BaseButton>
    <BaseButton variant="tag" icon="🍂">Осень</BaseButton> -->
    <!-- <BaseInput v-model="searchText" /> -->
  </div>
</template>
<script>
import SideBarNavigationItem from '@/components/sidebar/SideBarNavigationItem.vue'

export default {
  name: 'SideBarNavigation',
  components: {
    SideBarNavigationItem,
  },
  props: {
    buttons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchText: '',
    }
  },
}
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
