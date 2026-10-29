import { defineStore } from 'pinia'
import axios from 'axios'
import {getDistance} from '@/utils/distance.js'

const WATER = {
  cenote: "Cенот",
  lagoon : "Лагуна",
  lake: "Озеро",
  oxbow : "Старица",
  rapids : "Быстро текущий, часто бурный, участок водотока",
  river : "Акватория реки",
  stream : "Площадь ручья",
  stream_pool : "Плёс реки",
  basin : "Искусственный водоем",
  canal : "Акватория канала",
  ditch : "Водная зона",
  fish_pass : "Рыбопропускные сооружения",
  harbour : "Гавань",
  lock : "Граница шлюза",
  moat : "Глубокий широкий оборонительный ров",
  pond : "Пруд",
  reflecting_pool : "Зеркальный пруд",
  reservoir : "Водохранилище",
  wastewater : "отстойник станции очистки",
}

function getWeatherIcon(icon) {
  if (icon === 0) return '☀️'
  if ([1, 2].includes(icon)) return '🌤️'
  if (icon === 3) return '☁️'
  if ([45, 48].includes(icon)) return '🌫️'
  if ([51, 53, 55, 56, 57].includes(icon)) return '🌦️'
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(icon)) return '🌧️'
  if ([71, 73, 75, 77, 85, 86].includes(icon)) return '❄️'
  if ([95, 96, 99].includes(icon)) return '⛈️'
  return '❔'
}

const keyWeather = import.meta.env.VITE_WEATHER_KEY
const keyWeatherNow = import.meta.env.VITE_WEATHER_NOW_KEY
const keyMoon = import.meta.env.VITE_MOON_KEY

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    reservoirs: [],
    weatherNow: null,
    coordsLatitude: null,
    coordsLongitude: null,
    weatherWeek: null,
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
    weekForecast: (state) => {
      if (!state.weatherWeek) return []
      const daily = state.weatherWeek.daily
      const daysCount = daily.time.length
      const arr = []

      for (let i = 0; i < daysCount; i++) {
        arr.push({
          day: new Date(daily.time[i]).toLocaleString('ru-RU', {
            month: 'long',
            day: 'numeric',
          }),
          daylight: daily.daylight_duration[i],
          temp: daily.temperature_2m_max[i],
          sunrise: daily.sunrise[i].slice(11, 16),
          chancerain: daily.precipitation_probability_max[i],
          nightTemp: daily.temperature_2m_min[i],
          icon: getWeatherIcon(daily.weathercode[i]),
        })
      }
      return arr
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
    nearbyReservoirs(state){
      return state.reservoirs.map((el) => (
          {id: el.id, name: el.name, distance: getDistance(state.coordsLatitude,state.coordsLongitude,el.lat,el.lon),type: WATER[el.type] ?? 'вода'}
        )
      ).sort((a,b) => a.distance - b.distance)
    }
  },
  actions: {
    init() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setCoords(position.coords.latitude, position.coords.longitude)
        this.fetchWeatherNow()
        this.fetchMoon()
        this.fetchWeather()
        this.fetchWeatherWeek()
        this.fetchReservoirs()
      })
    },
    setCoords(lat, lon) {
      this.coordsLatitude = lat
      this.coordsLongitude = lon
    },
    async fetchReservoirs(){
      const query = `
        [out:json][timeout:25];
        wr["natural"="water"]["name"](around:20000,${this.coordsLatitude},${this.coordsLongitude});
        out center;
      `
      try{
        const response = await axios.get('https://overpass-api.de/api/interpreter', {
          params:{
            data: query,
          }
        })
        this.reservoirs = response.data.elements.map((el) => ({id: el.id, name: el.tags['name:ru'] ?? el.tags.name , lat: el.center.lat, lon: el.center.lon, type: el.tags.water}))
        console.log(this.reservoirs)
      }catch {
        alert('Проблема C отображением водоемов')
        console.log('ошибка водоемов')
      }
    },
    async fetchWeatherWeek() {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: this.coordsLatitude,
            longitude: this.coordsLongitude,
            daily:
              'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max,daylight_duration,sunrise',
            timezone: 'auto',
            forecast_days: 7,
          },
        })
        this.weatherWeek = response.data
      } catch {
        alert('Проблема c Погодой на Неделю')
      }
    },
    async fetchWeatherNow() {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
          params: {
            lat: this.coordsLatitude,
            lon: this.coordsLongitude,
            units: 'metric',
            appid: keyWeatherNow,
          },
        })
        this.weatherNow = response.data
      } catch {
        alert('Не работает погода по часам')
      }
    },
    async fetchMoon() {
      try {
        const response = await axios.get('https://api.apiverve.com/v1/moonphases', {
          headers: {
            'X-API-Key': keyMoon,
          },
        })
        this.moon = response.data
        this.moon.phase = response.data.data.phase
        this.moon.age = response.data.data.lunarAgePercent
      } catch {
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
            appid: keyWeather,
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
      } catch {
        alert('Не работает погода')
      }
    },
  },
})
