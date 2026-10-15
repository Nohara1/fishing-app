<template>
  <div class="weather">
    <BaseTags :tags="tags" :idActive="idActive" @change-tag="activeClass"></BaseTags>
    <WeatherNow v-if="idActive === 0" :weatherData="weatherData" />
    <WeatherToday v-if="idActive === 1" :todayWeather="todayWeather" />
    <WeatherWeek v-if="idActive === 2" :weekForecast="weekForecast" />
  </div>
</template>
<script>
import BaseTags from '@/components/ui/BaseTags.vue'
import WeatherNow from '@/components/weather/WeatherNow.vue'
import WeatherToday from '@/components/weather/WeatherToday.vue'
import WeatherWeek from '@/components/weather/WeatherWeek.vue'
import { useWeatherStore } from '@/stores/weather'
export default {
  components: {
    BaseTags,
    WeatherNow,
    WeatherToday,
    WeatherWeek,
  },
  data() {
    return {
      idActive: 0,
      tags: [
        { name: 'Cейчас', id: 0 },
        { name: 'Сегодня', id: 1 },
        { name: 'Неделя', id: 2 },
      ],
    }
  },
  methods: {
    activeClass(id) {
      this.idActive = id
    },
  },
  computed: {
    weekForecast() {
      return {
        lat: useWeatherStore().coordsLatitude,
        long: useWeatherStore().coordsLongitude,
      }
    },
    weatherData() {
      const store = useWeatherStore()
      return {
        location: store.location,
        temp: store.weather.temp,
        speed: store.weather.speed,
        pressure: store.pressureCalculation,
        cloud: store.weather.cloud,
        humidity: store.weather.humidity,
        clouds: store.weather.clouds,
        iconUrl: store.iconUrl,
        visibility: store.visibilityCalculation,
        moon: {
          age: store.moon.age,
          phase: store.moon.phase,
        },
      }
    },
    todayWeather() {
      return useWeatherStore().todayWeather
    },
  },
}
</script>
<style lang="scss" scoped>
.weather-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
