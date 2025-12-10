<template>
  <div class="weather">
    <BaseTags :tags="tags" :idActive="idActive" @change-tag="activeClass"></BaseTags>
    <WeatherNow v-if="idActive === 0" :weatherData="weatherData" />
    <WeatherToday v-if="idActive === 1" :todayWeather="todayWeather" />
  </div>
</template>
<script>
import BaseTags from '@/components/ui/BaseTags.vue'
import WeatherNow from '@/components/weather/weatherNow.vue'
import WeatherToday from '@/components/weather/WeatherToday.vue'
export default {
  components: {
    BaseTags,
    WeatherNow,
    WeatherToday,
  },
  props: {
    weatherData: Object,
    todayWeather: Array,
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
}
</script>
<style lang="scss" scoped></style>
