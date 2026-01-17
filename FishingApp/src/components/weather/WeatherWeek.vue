<template>
  <div class="weather-container">
    <div class="forecast-week">
      <div class="forecast-week__inner">
        <BaseList :lists="weekWeather" :heading="listHeading">
          <template #list="{ list }">
            <div class="forecast-week__item">
              <p class="forecast-week__item-day">{{ list.day }}</p>
              <p class="forecast-week__item-icon">{{ getWeatherIcon(list.icon) }}</p>
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
<script>
import BaseInnerItem from '../ui/BaseInnerItem.vue'
import BaseList from '../ui/BaseList.vue'
import axios from 'axios'

export default {
  name: 'WeatherWeek',
  components: {
    BaseList,
    BaseInnerItem,
  },
  props: {
    weekForecast: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listHeading: 'Прогноз на неделю',
      weatherWeek: null,
      forecastWearther: null,
      innerItemsPlanning: [
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
      ],
    }
  },
  methods: {
    async fetchWeatherWeek() {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: this.weekForecast.lat,
            longitude: this.weekForecast.long,
            daily:
              'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max,daylight_duration,sunrise',
            timezone: 'auto',
            forecast_days: 7,
          },
        })
        this.weatherWeek = response.data
        this.weatherWeek.list = response.data.daily
        console.log(this.weatherWeek.list)
      } catch {
        alert('Проблема c Погодой на Неделю')
      }
    },
    getWeatherIcon(icon) {
      if (icon === 0) return '☀️'
      if ([1, 2].includes(icon)) return '🌤️'
      if (icon === 3) return '☁️'
      if ([45, 48].includes(icon)) return '🌫️'
      if ([51, 53, 55, 56, 57].includes(icon)) return '🌦️'
      if ([61, 63, 65, 66, 67, 80, 81, 82].includes(icon)) return '🌧️'
      if ([71, 73, 75, 77, 85, 86].includes(icon)) return '❄️'
      if ([95, 96, 99].includes(icon)) return '⛈️'
      return '❔'
    },
  },
  computed: {
    weekWeather() {
      if (!this.weatherWeek) return []
      const data = this.weatherWeek.daily.time.length
      let arr = []
      // console.log(data)

      for (let i = 0; i < data; i++) {
        arr.push({
          day: new Date(this.weatherWeek.daily.time[i]).toLocaleString('ru-RU', {
            month: 'long',
            day: 'numeric',
          }),
          daylight: this.weatherWeek.daily.daylight_duration[i],
          temp: this.weatherWeek.daily.temperature_2m_max[i],
          sunrise: this.weatherWeek.daily.sunrise[i].slice(11, 16),
          chancerain: this.weatherWeek.daily.precipitation_probability_max[i],
          nightTemp: this.weatherWeek.daily.temperature_2m_min[i],
          icon: this.weatherWeek.daily.weathercode[i],
        })
      }
      console.log(arr)
      return arr
    },
  },
  mounted() {
    this.fetchWeatherWeek()
  },
}
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
