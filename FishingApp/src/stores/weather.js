import { defineStore } from 'pinia'
import axios from 'axios'
export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherNow: null,
    coordsLatitude: null,
    coordsLongitude: null,
    moon: {
      age: null,
      phase: null,
    },
    weather: {
      temp: null,
      speed: null,
      cloud: null,
      humidity: null,
      clouds: null,
      visibility: null,
      iconCode: null,
      pressure: null,
    },
    location: null,
  }),
  getters: {
    iconUrl: (state) => {
      if (!state.weather.iconCode) return null
      return `https://openweathermap.org/img/wn/${state.weather.iconCode}@2x.png`
    },
    visibilityCalculation: (state) => {
      if (state.weather.visibility === null) return null
      return Math.round(state.weather.visibility / 1000)
    },
    pressureCalculation: (state) => {
      if (!state.weather.pressure) return null
      return Math.round(state.weather.pressure * 0.75)
    },
    todayWeather: (state) => {
      if (!state.weatherNow) return []
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const today = `${year}-${month}-${day}`

      const slots = state.weatherNow.list.filter((item) => item.dt_txt.startsWith(today))

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
  actions: {
    setCoords(lat, lon) {
      this.coordsLatitude = lat
      this.coordsLongitude = lon
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
      } catch (e) {
        alert('Не работает погода по часам')
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
      } catch (e) {
        alert('Не загрузилась луна')
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
        this.weather.temp = response.data.main.temp
        this.weather.speed = response.data.wind.speed
        this.location = response.data.name
        this.weather.cloud = response.data.weather[0].description
        this.weather.humidity = response.data.main.humidity
        this.weather.pressure = response.data.main.pressure
        this.weather.clouds = response.data.clouds.all
        this.weather.visibility = response.data.visibility
        this.weather.iconCode = response.data.weather[0].icon
      } catch (e) {
        alert('Не работает погода')
      }
    },
  },
})
