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
            <p class="location__metric-value">15°C</p>
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
            <span>{{ totalScore }}</span
            >/100
          </div>
        </div>
        <div class="conditions__header">
          <p class="conditions__title">Условия для рыбалки:{{ conditions }}</p>
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
<script>
import BaseInnerItem from '../ui/BaseInnerItem.vue'
import BaseList from '../ui/BaseList.vue'

export default {
  name: 'WeatheNow',
  components: {
    BaseInnerItem,
    BaseList,
  },
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      weights: {
        temperature: 0.3,
        pressure: 0.25,
        speed: 0.2,
        clouds: 0.15,
        humidity: 0.05,
        moon: 0.05,
      },
      quantityVariables: 16.7,
      speed: [
        { name: 'Отличные', value: 2, mark: 100 },
        { name: 'Хорошо', value: 4, mark: 75 },
        { name: 'Средне', value: 7, mark: 50 },
        { name: 'Плохо', value: 10, mark: 25 },
      ],
      pressure: [
        { name: 'Отличные', value: 740, mark: 100 },
        { name: 'Хорошо', value: 750, mark: 75 },
        { name: 'Средне', value: 770, mark: 50 },
        { name: 'Плохо', value: Infinity, mark: 25 },
      ],
      temperature: [
        { name: 'Плохо', value: 5, mark: 25 },
        { name: 'Средне', value: 12, mark: 50 },
        { name: 'Хорошо', value: 18, mark: 75 },
        { name: 'Отличные', value: 25, mark: 100 },
        { name: 'Плохо', value: Infinity, mark: 20 },
      ],
      humidity: [
        { name: 'Отличные', value: 70, mark: 100 },
        { name: 'Хорошо', value: 85, mark: 75 },
        { name: 'Средне', value: 95, mark: 50 },
        { name: 'Плохо', value: Infinity, mark: 25 },
      ],
      clouds: [
        { name: 'Отличные', value: 50, mark: 100 },
        { name: 'Хорошо', value: 80, mark: 75 },
        { name: 'Средне', value: 100, mark: 50 },
        { name: 'Плохо', value: Infinity, mark: 25 },
      ],
      moon: [
        { name: 'Отличные', value: 0.25, mark: 100 },
        { name: 'Хорошо', value: 0.75, mark: 66 },
        { name: 'Средне', value: Infinity, mark: 33 },
      ],
      listHeading: 'Анализ Условий',
      innerItemsConditions: [
        { icon: '🌅', title: '05:30 - 08:00', text: 'Высокая активность', id: 0 },
        { icon: '🌅', title: '18:00 - 21:30', text: 'Очень высокая активность', id: 1 },
      ],
    }
  },
  methods: {
    getScore(conditions, value, weights) {
      if (value == null) return 0
      for (let i = 0; i < conditions.length; i++) {
        if (value <= conditions[i].value) {
          return conditions[i].mark * weights
        }
      }
      return 0
    },
  },
  watch: {},
  computed: {
    getScoreSpeed() {
      return this.getScore(this.speed, this.weatherData.speed, this.weights.speed)
    },
    getScorePressure() {
      return this.getScore(this.pressure, this.weatherData.pressure, this.weights.pressure)
    },
    getScoreTemperature() {
      return this.getScore(this.temperature, this.weatherData.temp, this.weights.temperature)
    },
    getScoreHumidity() {
      return this.getScore(this.humidity, this.weatherData.humidity, this.weights.humidity)
    },
    getScoreClouds() {
      return this.getScore(this.clouds, this.weatherData.clouds, this.weights.clouds)
    },
    getScoreMoon() {
      return Math.round(this.getScore(this.moon, this.weatherData.moon, this.weights.moon))
    },
    totalScore() {
      return Math.round(
        this.getScoreSpeed +
          this.getScorePressure +
          this.getScoreTemperature +
          this.getScoreHumidity +
          this.getScoreClouds +
          this.getScoreMoon,
      )
    },
    conditions() {
      if (this.totalScore >= 85) return 'Отличные'
      if (this.totalScore >= 70) return 'Хорошие'
      if (this.totalScore >= 50) return 'Средние'
      if (this.totalScore >= 30) return 'Плохие'
      return 'Очень плохие'
    },
    weatherTemp() {
      return this.weatherData.temp !== undefined ? `${this.weatherData.temp}°C` : '–'
    },
    weatherLocation() {
      return this.weatherData.location !== undefined ? `${this.weatherData.location}` : '–'
    },
    weatherSpeed() {
      return this.weatherData.speed !== undefined ? `${this.weatherData.speed} м/с` : '–'
    },
    weatherCloud() {
      return this.weatherData.cloud !== undefined ? `${this.weatherData.cloud}` : '–'
    },
    moonPhase() {
      return this.weatherData.phase !== undefined ? `${this.weatherData.phase}` : '–'
    },
    weatherPressure() {
      return this.weatherData.pressure !== undefined ? `${this.weatherData.pressure}` : '–'
    },

    weatherHumidity() {
      return this.weatherData.humidity !== undefined ? `${this.weatherData.humidity}%` : '–'
    },
    weatherVisibility() {
      return this.weatherData.visibility !== undefined ? `${this.weatherData.visibility} км` : '–'
    },
    innerItemsIndicators() {
      return [
        { icon: '🌅', title: this.weatherHumidity, text: 'Влажность', id: 0 },
        { icon: '🌅', title: this.weatherPressure, text: 'мм рт.ст.', id: 1 },
        { icon: '🌅', title: this.weatherVisibility, text: 'Видимость', id: 2 },
        { icon: '🌅', title: this.moonPhase, text: 'Луна', id: 3 },
      ]
    },
    listContent() {
      return [
        { icon: '📊', title: 'Давление', result: `${this.getScorePressure}%`, id: 0 },
        { icon: '💨', title: 'Ветер', result: `${this.getScoreSpeed}%`, id: 1 },
        { icon: '🌖', title: 'Луна', result: `${this.getScoreMoon}%`, id: 2 },
        { icon: '🌡️', title: 'Температура', result: `${this.getScoreTemperature}%`, id: 3 },
        { icon: '⛅', title: 'Облачность', result: `${this.getScoreClouds}%`, id: 3 },
        { icon: '🌡️', title: 'Влажность', result: `${this.getScoreHumidity}%`, id: 3 },
      ]
    },
  },
}
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
