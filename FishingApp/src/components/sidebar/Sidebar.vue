<template>
  <aside class="sidebar">
    <SideBarHeader />
    <div class="sidebar__content">
      <SideBarNavigation :buttons="buttons" />
      <SideBarAdvice :advice="advice" />
    </div>
  </aside>
</template>
<script>
import SideBarHeader from '@/components/sidebar/SideBarHeader.vue'
import SideBarNavigation from '@/components/sidebar/SideBarNavigation.vue'
import SideBarAdvice from '@/components/sidebar/SideBarAdvice.vue'

export default {
  name: 'SideBar',
  components: {
    SideBarHeader,
    SideBarNavigation,
    SideBarAdvice,
  },
  data() {
    return {
      advice: [
        { subtitle: 'Используйте карту для поиска лучших мест рыбалки рядом с вами' },
        { subtitle: 'Раннее утро - лучшее время для рыбалки' },
        { subtitle: 'Выбирайте места с течением для активной рыбы' },
        { subtitle: 'Используйте карту для поиска лучших мест рыбалки рядом с вами' },
      ],
      buttons: [
        { logo: '🗺️', title: 'Карта', subtitle: 'Лучшие места рыбалки', link: '' },
        { logo: '🐟', title: 'Рыба', subtitle: 'Справочник видов рыб', link: 'fishes' },
        { logo: '🌤️', title: 'Погода', subtitle: 'Прогноз и советы', link: 'weather' },
        { logo: '🪝', title: 'Прикормка', subtitle: 'Рецепт приманок', link: 'bait' },
        { logo: '📖', title: 'Мой дневник', subtitle: 'Записи об уловах', link: 'diary' },
        { logo: 'ℹ️', title: 'О приложении', subtitle: 'Инструкция и справка', link: 'about' },
      ],
    }
  },
}
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
