<template>
  <div class="weather-container">
    <div class="location">
      <div class="location__inner">
        <p class="location__title">📍 {{ weatherLocation }}</p>
        <div class="location__header">
          <img
            class="location__image"
            :src="weatherData.iconUrl"
            alt="wether-icon"
            width="100"
            height="100"
          />
          <div class="location__content">
            <p class="location__temp">{{ weatherTemp }}</p>
            <p class="location__desc">{{ weatherCloud }}</p>
          </div>
        </div>
        <div class="location__body">
          <div class="location__metric location__metric--water">
            <p class="location__metric-value">-</p>
            <p class="location__metric-name">Вода</p>
          </div>
          <div class="location__metric">
            <p class="location__metric-value">{{ weatherSpeed }}</p>
            <p class="location__metric-name">Ветер</p>
          </div>
        </div>
      </div>
    </div>
    <div class="conditions">
      <div class="conditions__inner">
        <div class="conditions__result">
          <p class="conditions__result-icon u-icon">🎣</p>
          <div class="conditions__result-value">
            <span>{{ bite.total }}</span
            >/100
          </div>
        </div>
        <div class="conditions__header">
          <p class="conditions__title">Условия для рыбалки:{{ bite.condition }}</p>
          <p class="conditions__subtitle">Идеальные условия для ловли щуки и окуня!</p>
        </div>
        <BaseInnerItem :innerItems="innerItemsConditions" variant="secondary"> </BaseInnerItem>
      </div>
    </div>
    <div class="indicators">
      <BaseInnerItem :innerItems="innerItemsIndicators" variant="primary"> </BaseInnerItem>
    </div>
    <div class="analysis">
      <div class="analysis__inner">
        <BaseList :lists="listContent" :heading="listHeading">
          <template #list="{ list }">
            <div class="analysis__item">
              <p class="analysis__item-icon">{{ list.icon }}</p>
              <div class="analysis__item-content">
                <p class="analysis__item-title">{{ list.title }}</p>
                <p class="analysis__item-text" v-if="list.text">{{ list.text }}</p>
              </div>
              <div class="analysis__item-result">{{ list.result }}</div>
            </div>
          </template>
        </BaseList>
      </div>
    </div>
  </div>
</template>
<script setup>
import { calcBiteScore } from '@/utils/biteScore.js'
import { computed } from 'vue'

defineOptions({
  name: 'WeatherNow',
})
const props = defineProps({
  weatherData: {
    type: Object,
    required: true,
  },
})
const listHeading = 'Анализ Условий'
const innerItemsConditions = [
  { icon: '🌅', title: '05:30 - 08:00', text: 'Высокая активность', id: 0 },
  { icon: '🌅', title: '18:00 - 21:30', text: 'Очень высокая активность', id: 1 },
]
const bite = computed(() => {
  return calcBiteScore(props.weatherData)
})
const weatherTemp = computed(() => {
  return props.weatherData.temp !== null ? `${props.weatherData.temp}°C` : '–'
})
const weatherLocation = computed(() => {
  return props.weatherData.location !== null ? `${props.weatherData.location}` : '–'
})
const weatherSpeed = computed(() => {
  return props.weatherData.speed !== null ? `${props.weatherData.speed} м/с` : '–'
})
const weatherCloud = computed(() => {
  return props.weatherData.cloud !== null ? `${props.weatherData.cloud}` : '–'
})
const moonPhase = computed(() => {
  const phase = props.weatherData.moon.phase
  return phase !== null && phase !== undefined ? `${phase}` : '–'
})
const weatherPressure = computed(() => {
  return props.weatherData.pressure !== null ? `${props.weatherData.pressure}` : '–'
})
const weatherHumidity = computed(() => {
  return props.weatherData.humidity !== null ? `${props.weatherData.humidity}%` : '–'
})
const weatherVisibility = computed(() => {
  return props.weatherData.visibility !== null ? `${props.weatherData.visibility} км` : '–'
})
const innerItemsIndicators = computed(() => {
  return [
    { icon: '🌅', title: weatherHumidity.value, text: 'Влажность', id: 0 },
    { icon: '🌅', title: weatherPressure.value, text: 'мм рт.ст.', id: 1 },
    { icon: '🌅', title: weatherVisibility.value, text: 'Видимость', id: 2 },
    { icon: '🌅', title: moonPhase.value, text: 'Луна', id: 3 },
  ]
})
const listContent = computed(() => {
  return [
    { icon: '📊', title: 'Давление', result: `${bite.value.parts.pressure}%`, id: 0 },
    { icon: '💨', title: 'Ветер', result: `${bite.value.parts.speed}%`, id: 1 },
    { icon: '🌖', title: 'Луна', result: `${bite.value.parts.moon}%`, id: 2 },
    { icon: '🌡️', title: 'Температура', result: `${bite.value.parts.temperature}%`, id: 3 },
    { icon: '⛅', title: 'Облачность', result: `${bite.value.parts.clouds}%`, id: 4 },
    { icon: '🌡️', title: 'Влажность', result: `${bite.value.parts.humidity}%`, id: 5 },
  ]
})
</script>
<style lang="scss" scoped>
.location {
  &__inner {
    width: 100%;
    padding: 32px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 2px solid #4e5866;
    background-color: #182029;
    border-radius: 18px;
    gap: 12px;
  }
  &__header {
    display: flex;
    gap: 16px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  &__temp {
    font-size: 60px;
    color: #3a6ea5;
    font-weight: 700;
  }
  &__metric {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: center;
    &--water {
      %location-value {
        color: #ff914d;
      }
    }
    &-value {
      font-size: 24px;
      font-weight: 700;
      @extend %location-value !optional;
    }
    &-name {
      font-size: 14px;
    }
  }
  &__body {
    display: flex;
    & > * {
      padding: 0 32px;
      border-right: 2px solid #4e5866;
      &:last-child {
        border: none;
      }
    }
  }
}
.conditions {
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
  &__result {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 8px;
    &-icon {
      font-size: 48px;
    }
    &-value {
      font-size: 18px;
      span {
        font-size: 30px;
        font-weight: 700;
        color: #3a6ea5;
      }
    }
  }
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  &__title {
    font-size: 24px;
    font-weight: 700;
  }
  &__subtitle {
    font-size: 20px;
  }
}
.analysis {
  &__item {
    border-radius: 18px;
    background-color: #273e4b;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 18px;
    &-result {
      margin-left: auto;
    }
    &-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    &-title {
      font-weight: 600;
      font-size: 16px;
    }
    &-text {
      font-size: 14px;
    }
  }
}
</style>
