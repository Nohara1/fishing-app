<template>
  {{ weekWeather }}
  <div class="weather-conteiner">
    <div class="forecast-week">
      <div class="forecast-week__inner">
        <BaseList :lists="forecastWearther" :heading="listHeading">
          <template #list="{ list }">
            <div class="forecast-week__item">
              <p class="forecast-week__item-day">{{ list.day }}</p>
              <p class="forecast-week__item-icon">{{ list.icon }}</p>
              <p class="forecast-weel__item-temp">{{ list.temp }}</p>
              <div class="forecast-week__item-metrics">
                <p class="forecast-week__item-humidity">
                  {{ list.humidity }}
                </p>
                <p class="forecast-week__item-result">{{ list.result }}</p>
              </div>
            </div>
          </template>
        </BaseList>
      </div>
    </div>
  </div>
</template>
<script>
import BaseList from '../ui/BaseList.vue'
import axios from 'axios'

export default {
  name: 'WeatherWeek',
  components: {
    BaseList,
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
  },
  computed: {
    weekWeather() {
      if (!this.weatherWeek) return []
      const data = this.weatherWeek.daily.time.length
      let arr = []
      console.log(data)

      for (let i = 0; i < data; i++) {
        arr.push({
          time: this.weatherWeek.daily.time[i],
          daylight: this.weatherWeek.daily.daylight_duration[i],
          temp: this.weatherWeek.daily.temperature_2m_max[i],
          sunrise: this.weatherWeek.daily.sunrise[i],
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
<style lang="scss" scoped></style>
