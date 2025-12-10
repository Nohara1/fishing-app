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
    <p>123</p>
    <!-- <BaseCard v-for="card in cards" :key="card.title" :card="card" /> -->

    <!-- <PageMap
      :temp="weather.temp"
      :speed="weather.speed"
      :pressure="weather.pressure"
      :phase="moon.phase"
    /> -->
  </div>
</template>
<script>
import Sidebar from './components/sidebar/Sidebar.vue'
import axios from 'axios'
import BaseHeader from './components/ui/BaseHeader.vue'

export default {
  components: {
    Sidebar,
    BaseHeader,
    // PageMap,
  },
  data() {
    return {
      today: null,
      name: null,
      weather: {
        temp: null,
        speed: null,
        pressure: null,
        cloud: null,
        humidity: null,
        clouds: null,
      },
      weatherNow: null,
      location: null,
      moon: {
        age: null,
        phase: null,
      },
      headers: {
        PageMap: { icon: '🗺️', title: 'Карта водоёмов', subtitle: 'Лучшие места рыбалки' },
        PageFishes: { icon: '🐟', title: 'Рыба', subtitle: 'Справочник видов рыб' },
        PageWeather: { icon: '🌤️', title: 'Погода', subtitle: 'Прогноз и советы' },
      },
      coordsLatitude: null,
      coordsLongitude: null,
      // cards: [
      //   {
      //     logo: '/image/icon/shcuka.png',
      //     image: '/image/fish-card-image/fish-one.webp',
      //     title: 'Щука',
      //     time: 'Утром и вечером',
      //     temperature: '8-18°C',
      //   },
      //   {
      //     logo: '/image/icon/shcuka.png',
      //     image: '/image/fish-card-image/fish-two.webp',
      //     title: 'Судак',
      //     time: 'На рассвете и в сумерках',
      //     temperature: '12-22°C',
      //   },
      //   {
      //     logo: '/image/icon/shcuka.png',
      //     image: '/image/fish-card-image/fish-three.webp',
      //     title: 'Карп',
      //     time: 'Утром и вечером',
      //     temperature: '18-25°C',
      //   },
      // ],
    }
  },
  computed: {
    currentHeader() {
      return this.headers[this.$route.name]
    },
    todayWeather() {
      if (!this.weatherNow) return []
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const today = `${year}-${month}-${day}`
      const slots = this.weatherNow.list.filter((item) => item.dt_txt.startsWith(today))
      return slots.map((item) => ({
        id: item.dt,
        time: item.dt_txt.slice(11, 16),
        icon: '☀️',
        temp: item.main.temp + '°C',
        speed: item.wind.speed + 'м/c',
        rain: Math.round((item.pop || 0) * 100) + '%',
      }))
    },
  },
  methods: {
    routeProps(name) {
      if (name === 'PageMap') {
        return {
          temp: this.weather.temp,
          speed: this.weather.speed,
          pressure: this.weather.pressure,
          phase: this.moon.phase,
        }
      }
      if (name === 'PageWeather') {
        return {
          weatherData: {
            location: this.location,
            temp: this.weather.temp,
            speed: this.weather.speed,
            pressure: this.weather.pressure,
            phase: this.moon.phase,
            cloud: this.weather.cloud,
            humidity: this.weather.humidity,
            clouds: this.weather.clouds,
            moon: this.moon.age,
            visibility: this.weather.visibility,
          },
          todayWeather: this.todayWeather,
        }
      }
    },
    coordsReceiving() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coordsLatitude = position.coords.latitude
        this.coordsLongitude = position.coords.longitude
        this.fetchWeatherNow()
        this.fetchWeather()
        this.fetchMoon()
      })
    },
    async fetchWeatherNow() {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
          params: {
            lat: this.coordsLatitude,
            lon: this.coordsLongitude,
            units: 'metric',
            appid: '52eb5f938dd0ad14b1bb71d325e76d9b',
          },
        })
        this.weatherNow = response.data
        this.weatherNow.list = response.data.list
        console.log(this.todayWeather)
      } catch (e) {
        alert('Не работает погода по часам')
      }
    },
    async fetchWeather() {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: this.coordsLatitude,
            lon: this.coordsLongitude,
            units: 'metric',
            appid: 'd184a227e22099fe9a84dabc31d03f28',
          },
        })
        this.weather = response.data
        this.weather.temp = response.data.main.temp
        this.weather.pressure = Math.round(response.data.main.pressure * 0.75)
        this.weather.speed = response.data.wind.speed
        this.location = response.data.name
        this.weather.cloud = response.data.weather[0].description
        this.weather.humidity = response.data.main.humidity
        this.weather.clouds = response.data.clouds.all
        this.weather.visibility = Math.round(response.data.visibility / 1000)

        // console.log(this.weather)
      } catch (e) {
        alert('Не работает погода')
      }
    },
    async fetchMoon() {
      try {
        const response = await axios.get('https://api.apiverve.com/v1/moonphases', {
          headers: {
            'X-API-Key': '14372de4-9d67-4c23-890b-bcb6847e8b97',
          },
        })
        this.moon = response.data
        this.moon.phase = response.data.data.phase
        this.moon.age = response.data.data.lunarAgePercent
        // console.log(this.moon)
      } catch (e) {
        alert('Не загрузилась луна')
      }
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
