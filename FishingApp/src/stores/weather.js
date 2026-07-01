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
      pressure: null,
      cloud: null,
      humidity: null,
      clouds: null,
      visibility: null,
      iconCode: null,
      iconUrl: null,
    },
    location: null,
  }),
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
        this.weather.pressure = Math.round(response.data.main.pressure * 0.75)
        this.weather.speed = response.data.wind.speed
        this.location = response.data.name
        this.weather.cloud = response.data.weather[0].description
        this.weather.humidity = response.data.main.humidity
        this.weather.clouds = response.data.clouds.all
        this.weather.visibility = Math.round(response.data.visibility / 1000)
        this.weather.iconCode = response.data.weather[0].icon
        this.weather.iconUrl = `https://openweathermap.org/img/wn/${this.weather.iconCode}@2x.png`
      } catch (e) {
        alert('Не работает погода')
      }
    },
  },
})
