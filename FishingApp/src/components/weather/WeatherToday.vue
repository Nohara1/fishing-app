<template>
  <div class="weather-container">
    <div class="forecast">
      <div class="forecast__inner">
        <BaseList :lists="todayWeather" :heading="listHeading">
          <template #list="{ list }">
            <div class="forecast__item">
              <div class="forecast__item-content">
                <p class="forecast__item-icon">{{ list.icon }}</p>
                <p class="forecast__item-time">{{ list.time }}</p>
                <p class="forecast__item-temp">{{ list.temp }}</p>
              </div>
              <div class="forecast__item-metrics">
                <div class="forecast__item-humidity">{{ list.rain }}</div>
                <div class="forecast__item-speed">{{ list.speed }}</div>
              </div>
            </div>
          </template>
        </BaseList>
      </div>
    </div>
    <div class="recommendation">
      <div class="recommendation__inner">
        <div class="recommendation__header">
          <h2 class="recommendation__title u-heading">Советы на сегодня</h2>
        </div>
        <BaseInnerItem :innerItems="innerItemsRecommendations" variant="secondary">
          <template #innerItem="{ item }">
            <div class="recommendation-card">
              <div class="recommendation-card__heading">
                <p class="recommendation-card__icon">{{ item.icon }}</p>
                <p class="recommendation-card__title">{{ item.title }}</p>
              </div>
              <p class="recommendation-card__text">{{ item.text }}</p>
            </div>
          </template>
        </BaseInnerItem>
        <BaseInnerItem :innerItems="innerItemsAttention" variant="orange">
          <template #innerItem="{ item }">
            <div class="attention-card">
              <p class="attention-card__icon">{{ item.icon }}</p>
              <div class="attention-card__content">
                <p class="attention-card__title">{{ item.title }}</p>
                <p class="attention-card__text">{{ item.text }}</p>
              </div>
            </div>
          </template>
        </BaseInnerItem>
      </div>
    </div>
  </div>
</template>
<script>
import BaseInnerItem from '../ui/BaseInnerItem.vue'
import BaseList from '../ui/BaseList.vue'

export default {
  name: 'WeatheToday',
  components: {
    BaseList,
    BaseInnerItem,
  },
  props: {
    todayWeather: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      innerItemsAttention: [
        {
          icon: '⚠️',
          title: 'Обратите внимание!',
          text: 'После 15:00 возможен небольшой дождь. Это может улучшить клёв, но подготовьте дождевик.',
          id: 0,
        },
      ],
      innerItemsRecommendations: [
        {
          icon: '🌅',
          title: 'Утром (5:30-8:00)',
          text: 'Идеальное время для щуки. Используйте воблеры и блесны у камышей.',
          id: 0,
        },
        {
          icon: '🌆',
          title: 'Вечером (18:00-21:30)',
          text: 'Пик активности! Отличное время для любой хищной рыбы.',
          id: 1,
        },
      ],
      listHeading: 'Прогноз на сегодня',
      // listContent: [
      //   { icon: '☀️', title: 'Сейчас', result: '18°C', humidity: '5%', speed: '3 м/с', id: 0 },
      //   { icon: '☀️', title: '15:00', result: '18°C', humidity: '5%', speed: '3 м/с', id: 1 },
      //   { icon: '☀️', title: '19:00', result: '18°C', humidity: '5%', speed: '3 м/с', id: 2 },
      //   { icon: '☀️', title: '22:00', result: '18°C', humidity: '5%', speed: '3 м/с', id: 3 },
      //   { icon: '☀️', title: '01:00', result: '18°C', humidity: '5%', speed: '3 м/с', id: 3 },
      //   { icon: '☀️', title: '04:00', result: '18°C', humidity: '5%', speed: '3 м/с', id: 3 },
      // ],
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.forecast {
  &__item {
    border-radius: 18px;
    background-color: #273e4b;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 18px;
    &-icon {
      font-size: 30px;
      line-height: 1.2;
    }
    &-metrics {
      display: flex;
      gap: 16px;
      margin-left: auto;
    }
    &-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
    }
    &-time,
    &-temp {
      font-weight: 600;
      font-size: 18px;
    }
  }
}
.recommendation {
  &__inner {
    display: flex;
    flex-direction: column;
    padding: 32px;
    width: 100%;
    border: 2px solid #284e36;
    background-color: #1b312a;
    border-radius: 18px;
    gap: 24px;
  }
  &-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    &__heading {
      display: flex;
      gap: 16px;
      align-items: center;
    }
    &__icon {
      font-size: 22px;
      line-height: 1;
    }
    &__title {
      font-weight: 700;
    }
    &__text {
      font-size: 14px;
      color: #b3b3b3;
    }
  }
  &__header {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  &__title {
    font-size: 20px;
    font-weight: 500;
  }
}
.attention {
  &-card {
    display: flex;
    gap: 8px;
    align-items: center;
    &__icon {
      font-size: 30px;
      line-height: 1;
    }
    &__title {
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    &__text {
      font-size: 14px;
      color: #b3b3b3;
    }
  }
}
</style>
