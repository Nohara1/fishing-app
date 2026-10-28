<template>
  <div class="weather-container">
    <div class="forecast-week">
      <div class="forecast-week__inner">
        <BaseList :lists="weekForecast" :heading="listHeading">
          <template #list="{ list }">
            <div class="forecast-week__item">
              <p class="forecast-week__item-day">{{ list.day }}</p>
              <p class="forecast-week__item-icon u-icon">{{ list.icon }}</p>
              <p class="forecast-week__item-temp">
                {{ list.temp }}°<span>/{{ list.nightTemp }}°</span>
              </p>
              <div class="forecast-week__item-metrics">
                <p class="forecast-week__item-chancerain">{{ list.chancerain }}%</p>
                <p class="forecast-week__item-result">{{ list.sunrise }}</p>
              </div>
            </div>
          </template>
        </BaseList>
      </div>
    </div>
    <div class="planning">
      <div class="planning__inner">
        <div class="planning__header">
          <h2 class="planning__title u-heading">Планирование на неделю</h2>
        </div>
        <BaseInnerItem :innerItems="innerItemsPlanning">
          <template #innerItem="{ item }">
            <div class="planning-card">
              <p class="planning-card__icon u-icon">{{ item.icon }}</p>
              <p class="planning-card__title">{{ item.title }}</p>
              <p class="planning-card__text">{{ item.text }}</p>
            </div>
          </template>
        </BaseInnerItem>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  weekForecast: {
    type: Array,
    required: true,
  },
})
defineOptions({
  name: 'WeatherWeek',
})
const listHeading = 'Прогноз на неделю'
const innerItemsPlanning = [
  {
    icon: '⭐',
    title: 'Лучшие дни',
    text: 'Сегодня, Суббота',
    color: 'green',
    id: 0,
  },
  {
    icon: '⚠️',
    title: 'Осторожно',
    text: 'Воскресенье - дождь',
    color: 'orange',
    id: 1,
  },
  {
    icon: '📈',
    title: 'Тенденция',
    text: 'Улучшение к концу недели',
    color: 'blue',
    id: 2,
  },
]
</script>
<style lang="scss" scoped>
.forecast-week {
  &__item {
    border-radius: 18px;
    background-color: #273e4b;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 18px;
    &-metrics {
      display: flex;
      gap: 20px;
      margin-left: auto;
    }
    &-temp {
      font-size: 22px;
      span {
        font-size: 16px;
        color: #b3b3b3;
      }
    }
    &-icon {
      font-size: 30px;
    }
  }
}
.planning {
  &__inner {
    border: 2px solid #4e5866;
    border-radius: 18px;
    padding: 24px;
    background-color: #1b3a4b;
    gap: 24px;
    display: flex;
    flex-direction: column;
  }
  &-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    &__title {
      color: #f9f9f9;
      font-weight: 600;
    }
    &__text {
      font-size: 14px;
    }
  }
}
</style>
