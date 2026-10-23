<template>
  <aside class="sidebar">
    <SideBarHeader />
    <div class="sidebar__content">
      <SideBarNavigation :buttons="buttons" />
      <SideBarAdvice :advice="advice" />
    </div>
  </aside>
</template>
<script setup>
import SideBarHeader from '@/components/sidebar/SideBarHeader.vue'
import SideBarNavigation from '@/components/sidebar/SideBarNavigation.vue'
import SideBarAdvice from '@/components/sidebar/SideBarAdvice.vue'

defineOptions({
  name: 'SideBar',
})
const advice = [
  { subtitle: 'Используйте карту для поиска лучших мест рыбалки рядом с вами' },
  { subtitle: 'Раннее утро - лучшее время для рыбалки' },
  { subtitle: 'Выбирайте места с течением для активной рыбы' },
  { subtitle: 'Используйте карту для поиска лучших мест рыбалки рядом с вами' },
]
const buttons = [
  {
    name: 'map',
    width: 48,
    height: 48,
    title: 'Карта',
    subtitle: 'Лучшие места рыбалки',
    link: '',
  },
  {
    name: 'fish',
    width: 48,
    height: 48,
    title: 'Рыба',
    subtitle: 'Справочник видов рыб',
    link: 'fishes',
  },
  {
    name: 'weather',
    width: 48,
    height: 48,
    title: 'Погода',
    subtitle: 'Прогноз и советы',
    link: 'weather',
  },
  {
    name: 'bucket',
    width: 48,
    height: 48,
    title: 'Прикормка',
    subtitle: 'Рецепт приманок',
    link: 'bait',
  },
  {
    name: 'diary',
    width: 48,
    height: 48,
    title: 'Мой дневник',
    subtitle: 'Записи об уловах',
    link: 'diary',
  },
  {
    name: 'about',
    width: 48,
    height: 48,
    title: 'О приложении',
    subtitle: 'Инструкция и справка',
    link: 'about',
  },
]
</script>
<style lang="scss" scoped>
.sidebar {
  max-width: 320px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: sticky;
  left: 0;
  top: 0;
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 16px;
    border-right: 1px solid #4b5563;
    flex: 1;
  }
}
</style>
