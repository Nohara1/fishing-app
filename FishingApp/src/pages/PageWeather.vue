<template>
  <div class="weather">
    <BaseTags :tags="tags" :idActive="idActive" @change-tag="activeClass"></BaseTags>
    <WeatherNow v-if="idActive === 0" :weatherData="weatherData" />
    <WeatherToday v-if="idActive === 1" :todayWeather="todayWeather" />
    <WeatherWeek v-if="idActive === 2" :weekForecast="weekForecast" />
  </div>
</template>
<script setup>
import WeatherToday from '@/components/weather/WeatherToday.vue'
import WeatherNow from '@/components/weather/WeatherNow.vue'
import WeatherWeek from '@/components/weather/WeatherWeek.vue'
import { useWeatherStore } from '@/stores/weather'
import {ref,computed} from 'vue'
const idActive = ref(0)
const store = useWeatherStore()
const tags =
[
  { name: 'Cейчас', id: 0 },
  { name: 'Сегодня', id: 1 },
  { name: 'Неделя', id: 2 },
]
function activeClass(id){
  idActive.value = id
}
const weekForecast = computed(() => {
  return store.weekForecast
})
const weatherData = computed(() =>{
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
})
const todayWeather = computed(() => {
  return store.todayWeather
})
</script>
<style lang="scss" scoped>
.weather-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
