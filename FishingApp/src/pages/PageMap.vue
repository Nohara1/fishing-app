<template>
  <div class="map-page">
    <!-- <BaseHeader :header="header" /> -->
    <div class="map-page__content">
      <div class="map-page__sidebar">
        <div class="map-page__search">
          <BaseInput
            v-model="searchText"
            aria-label="Поиск водоема"
            placeholder="Найти водоём или рыбу..."
            type="text"
          />
        </div>
        <div class="map-page__weather">
          <BaseInfoCard class="info--weather">
            <template #heading>
              <div class="info__heading">
                <p class="info__heading-icon u-icon">{{ weather.icon }}</p>
                <h2 class="info__heading-title u-heading">{{ weather.title }}</h2>
              </div>
            </template>
            <div class="info__content">
              <div class="info__content-items">
                <div
                  v-for="content in weatherContents"
                  :key="content.key"
                  class="info__content-item"
                >
                  <div class="info__content-params">{{ content.key }}</div>
                  <div class="info__content-value">{{ content.value }}</div>
                </div>
              </div>
            </div>
          </BaseInfoCard>
        </div>
        <div class="map-page__reservoirs">
          <BaseInfoCard class="info--reservoirs">
            <template #heading>
              <div class="info__heading">
                <p class="info__heading-icon u-icon">{{ reservoirs.icon }}</p>
                <h2 class="info__heading-title u-heading">{{ reservoirs.title }}</h2>
              </div>
            </template>
            <div class="info__content">
              <div class="info__content-items">
                <div v-if="filteredReservoirs.length == 0">
                  <p class="info__content-found">Ничего не найдено</p>
                </div>
                <div
                  v-for="content in filteredReservoirs"
                  :key="content.id"
                  :class="['info__content-item', { active: idActive === content.id }]"
                  v-on:click="activeClass(content.id)"
                >
                  <div class="info__content-inner">
                    <div class="info__content-head">
                      <div class="info__content-name">{{ content.name }}</div>
                      <div class="info__content-score">4.5</div>
                    </div>
                    <div class="info__content-body">
                      <div class="info__content-value">Тип:{{ content.type }} </div>
                      <div class="info__content-distance">{{ content.distance }}км.</div>
                    </div>
                    <div class="info__content-bottom">
                      <!-- <div v-for="fish in content.fishes" :key="fish" class="info__content-fish">
                        🐟 {{ fish }}
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BaseInfoCard>
        </div>
      </div>
      <div class="map-page__map">
        <yandex-map :settings="mapSettings" width="100%" height="600px">
          <yandex-map-default-scheme-layer />
          <yandex-map-default-features-layer />
        </yandex-map>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useWeatherStore } from '@/stores/weather'
import {ref,computed} from 'vue'
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
} from 'vue-yandex-maps'
defineOptions({
  name: 'PageMap',
})
const store = useWeatherStore()
const idActive = ref(0)
const searchText = ref('')
const mapSettings = {
  location: {
    center: [27.57, 53.9],
    zoom: 7,
  },
  theme: 'dark',
}

const reservoirs = {
  icon: '📍',
  title: 'Водоёмы рядом',
}
const weather = {
  icon: '🌤️',
  title: 'Сейчас на рыбалке',
}
function activeClass(id){
    idActive.value = id
}
const weatherContents = computed(() => {
  return [
    {
      key: 'Воздух',
      value: store.weather.temp !== null ? `${store.weather.temp}°C` : '–',
    },
    { key: 'Вода', value: '15°C' },
    {
      key: 'Ветер',
      value: store.weather.speed !== null ? `${store.weather.speed} м/с` : '–',
    },
    {
      key: 'Давление',
      value: store.pressureCalculation !== null ? store.pressureCalculation : '–',
    },
    { key: 'Луна', value: store.moon.phase !== null ? store.moon.phase : '–' },
  ]
})
const filteredReservoirs = computed(() => {
  const search = searchText.value.toLowerCase()

  if (search == '') {
    return store.nearbyReservoirs.slice(0, 5)
  }

  return store.nearbyReservoirs.filter((content) =>
    content.name.toLowerCase().includes(search),
  )
})
</script>
<style lang="scss" scoped>
.map-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  }
  &__sidebar {
    flex: 1 1 25%;
    max-width: 25%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__map {
    flex: 1 1 calc(75% - 32px);
    max-width: calc(75% - 32px);
  }
}
</style>
