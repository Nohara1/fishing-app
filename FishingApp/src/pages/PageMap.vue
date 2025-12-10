<template>
  <div class="map-page">
    <!-- <BaseHeader :header="header" /> -->
    <div class="map-page__content">
      <div class="map-page__sidebar">
        <div class="map-page__search">
          <BaseInput v-model="searchText" />
        </div>
        <div class="map-page__weather">
          <BaseInfoCard class="info--weather">
            <template #heading>
              <div class="info__heading">
                <div class="info__heading-icon">{{ weather.icon }}</div>
                <div class="info__heading-title">{{ weather.title }}</div>
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
                <div class="info__heading-icon">{{ reservoirs.icon }}</div>
                <div class="info__heading-title">{{ reservoirs.title }}</div>
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
                      <div class="info__content-score">{{ content.score }}</div>
                    </div>
                    <div class="info__content-body">
                      <div class="info__content-value">{{ content.value }}</div>
                      <div class="info__content-distance">{{ content.distance }}</div>
                    </div>
                    <div class="info__content-bottom">
                      <div v-for="fish in content.fishes" :key="fish" class="info__content-fish">
                        🐟 {{ fish }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BaseInfoCard>
        </div>
      </div>
      <div class="map-page__map">
        <yandex-map :settings="mapSettings" width="100%" height="600px" />
      </div>
    </div>
  </div>
</template>
<script>
// import BaseHeader from '@/components/ui/BaseHeader.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

export default {
  name: 'PageMap',
  components: {
    // BaseHeader,
    BaseInput,
  },
  props: {
    temp: Number,
    pressure: Number,
    speed: Number,
    phase: String,
  },
  data() {
    return {
      idActive: 0,
      // header: {
      //   icon: '🗺️',
      //   title: 'Карта водоемов',
      //   subtitle: 'Лучшие места рыбалки',
      // },
      searchText: '',
      mapSettings: {
        location: { lat: 53.9, lng: 27.57, zoom: 7 },
      },
      reservoirs: {
        icon: '📍',
        title: 'Водоёмы рядом',
      },
      weather: {
        icon: '🌤️',
        title: 'Сейчас на рыбалке',
      },
      reservoirsContents: [
        {
          id: 1,
          name: 'Озеро Селигер',
          value: 'Озеро',
          distance: '45 км',
          fishes: ['щука', 'судак', 'лещ'],
          score: '4.5',
        },
        {
          id: 2,
          name: 'Река Волга у Астрахани',
          value: 'Река',
          distance: '120 км',
          fishes: ['щука', 'судак', 'лещ'],
          score: '4.5',
        },
        {
          id: 3,
          name: 'Рыбинское водохранилище',
          value: 'Водохранилище',
          distance: '45 км',
          fishes: ['щука', 'судак', 'лещ'],
          score: '4.5',
        },
        {
          id: 4,
          name: 'Рыбинское водохранилище',
          value: 'Водохранилище',
          distance: '45 км',
          fishes: ['щука', 'судак', 'лещ'],
          score: '4.5',
        },
        {
          id: 5,
          name: 'Рыбинское водохранилище',
          value: 'Водохранилище',
          distance: '45 км',
          fishes: ['щука', 'судак', 'лещ'],
          score: '4.5',
        },
        {
          id: 6,
          name: 'Рыбинское водохранилище',
          value: 'Водохранилище',
          distance: '45 км',
          fishes: ['щука', 'судак', 'лещ'],
          score: '4.5',
        },
      ],
    }
  },
  methods: {
    activeClass(id) {
      this.idActive = id
    },
  },
  computed: {
    weatherContents() {
      return [
        { key: 'Воздух', value: this.temp !== undefined ? `${this.temp}°C` : '–' },
        { key: 'Вода', value: '15°C' },
        { key: 'Ветер', value: this.speed !== undefined ? `${this.speed} м/с` : '–' },
        { key: 'Давление', value: this.pressure !== undefined ? this.pressure : '–' },
        { key: 'Луна', value: this.phase !== undefined ? this.phase : '–' },
      ]
    },
    filteredReservoirs() {
      const search = this.searchText.toLowerCase()

      if (search == '') {
        return this.reservoirsContents.slice(0, 3)
      }

      return this.reservoirsContents.filter((content) =>
        content.name.toLowerCase().includes(search),
      )
    },
    // moon() {
    //   return [this.phase]
    // },
  },
}
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
