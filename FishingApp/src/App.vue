<template>
  <div class="app">
    <Sidebar />
    <div class="page">
      <BaseHeader v-if="currentHeader" :header="currentHeader" />
      <div class="container">
        <router-view v-slot="{ Component, route }">
          <component :is="Component" v-bind="routeProps(route.name)" />
        </router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from './components/sidebar/Sidebar.vue'
import BaseHeader from './components/ui/BaseHeader.vue'
import { useWeatherStore } from './stores/weather'

export default {
  components: {
    Sidebar,
    BaseHeader,
    // PageMap,
  },
  data() {
    return {
      headers: {
        PageMap: { icon: '🗺️', title: 'Карта водоёмов', subtitle: 'Лучшие места рыбалки' },
        PageFishes: { icon: '🐟', title: 'Рыба', subtitle: 'Справочник видов рыб' },
        PageWeather: { icon: '🌤️', title: 'Погода', subtitle: 'Прогноз и советы' },
        PageBait: { icon: '🐟', title: 'Прикормка', subtitle: 'Рецепты прикормок' },
      },
    }
  },
  computed: {
    currentHeader() {
      return this.headers[this.$route.name]
    },
    todayWeather() {
      const weatherStore = useWeatherStore()
      if (!weatherStore.weatherNow) return []

      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const today = `${year}-${month}-${day}`

      const slots = weatherStore.weatherNow.list.filter((item) => item.dt_txt.startsWith(today))

      return slots.map((item) => ({
        id: item.dt,
        time: item.dt_txt.slice(11, 16),
        temp: item.main.temp + '°C',
        iconCode: item.weather?.[0]?.icon,
        iconUrl: item.weather?.[0]?.icon
          ? `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
          : null,
        speed: item.wind.speed + 'м/c',
        rain: Math.round((item.pop || 0) * 100) + '%',
      }))
    },
  },
  methods: {
    routeProps(name) {
      const weatherStore = useWeatherStore()
      if (name === 'PageWeather') {
        return {
          weatherData: {
            location: weatherStore.location,
            temp: weatherStore.weather.temp,
            speed: weatherStore.weather.speed,
            pressure: weatherStore.weather.pressure,
            cloud: weatherStore.weather.cloud,
            humidity: weatherStore.weather.humidity,
            clouds: weatherStore.weather.clouds,
            iconUrl: weatherStore.weather.iconUrl,
            visibility: weatherStore.weather.visibility,
          },
          weekForecast: {
            lat: weatherStore.coordsLatitude,
            long: weatherStore.coordsLongitude,
          },
          todayWeather: this.todayWeather,
        }
      }
    },
    coordsReceiving() {
      navigator.geolocation.getCurrentPosition((position) => {
        const weatherStore = useWeatherStore()
        weatherStore.setCoords(position.coords.latitude, position.coords.longitude)
        weatherStore.fetchWeatherNow()
        weatherStore.fetchMoon()
        weatherStore.fetchWeather()

      })
    },
  },
  mounted() {
    this.coordsReceiving()
  },
}
</script>
<style lang="scss">
@font-face {
  font-family: 'LiberationMono';
  src: url('@/assets/fonts/LiberationMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'LiberationMono';
  src: url('@/assets/fonts/LiberationMono.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
.app {
  display: flex;
  flex-direction: row;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style-type: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
  font-size: inherit;
}
body {
  background-color: #1b3a4b;
  height: 100vh;
  color: #fff;
  font-family: 'LiberationMono';
}
a {
  text-decoration: none;
}
.page {
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #0f1c24;
}
.container {
  padding: 32px;
  width: 100%;
  height: 100%;
}
</style>
<style></style>
