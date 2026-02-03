<template>
  <div class="bait">
    <div class="bait__items">
      <div class="bait__item">
        <form name="bait" class="form">
          <div class="form__items">
            <div class="form__item">
              <h2 class="form__heading">Условия рыбалки</h2>
            </div>
            <div class="form__item form__item-half">
              <BaseSelect :options="fishOptions" v-model="selectedFish" :label="fishLabel" />
            </div>
            <div class="form__item form__item-half">
              <BaseSelect :options="vodoemOptions" v-model="selectedVodoem" :label="vodoemLabel" />
            </div>
            <div class="form__item form__item-half">
              <BaseSelect :options="waterOptions" v-model="selectedWater" :label="waterLabel" />
            </div>
            <div class="form__item form__item-half">
              <BaseSelect :options="techkaOptions" v-model="selectedTechka" :label="techkaLabel" />
            </div>
            <div class="form__item">
              <BaseRange v-model.number="rangeDeep" :label="deepLabel" />
            </div>
            <div class="form__item">
              <BaseRange v-model.number="rangeTempWater" :label="tempwaterLabel" />
            </div>
            <div class="form__item form__item-half">
              <BaseSelect :options="seasonOptions" v-model="selectedSeason" :label="seasonLabel" />
            </div>
            <div class="form__item form__item-half">
              <BaseSelect :options="timeOptions" v-model="selectedTime" :label="timeLabel" />
            </div>
            <div class="form__item">
              <BaseSelect :options="methodOptions" v-model="selectedmMethod" :label="methodLabel" />
            </div>
            {{ selectedFish }},{{ selectedVodoem }},{{ selectedWater }},{{ selectedTechka }},{{
              rangeDeep
            }},{{ rangeTempWater }},{{ selectedSeason }},{{ selectedTime }},{{ selectedmMethod }}
          </div>
        </form>
      </div>
      <div class="bait__item">123</div>
    </div>
  </div>
</template>
<script>
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseRange from '@/components/ui/BaseRange.vue'
export default {
  components: {
    BaseSelect,
    BaseRange,
  },
  data() {
    return {
      selectedFish: '',
      selectedVodoem: '',
      selectedWater: '',
      selectedTechka: '',
      selectedSeason: '',
      selectedTime: '',
      selectedmMethod: '',
      rangeDeep: 0.5,
      rangeTempWater: 0,
      deepLabel: {
        id: 'deep',
        name: 'Глубина ловли',
        min: '0.5',
        max: '20',
        step: '0.5',
        si: 'м',
      },
      tempwaterLabel: {
        id: 'temp',
        name: 'Температура воды',
        min: '0',
        max: '30',
        step: '1',
        si: '°C',
      },
      fishLabel: {
        id: 'fish',
        name: 'Целевая рыба',
      },
      vodoemLabel: {
        id: 'vodoem',
        name: 'Тип водоема',
      },
      waterLabel: {
        id: 'water',
        name: 'Прозрачность воды',
      },
      techkaLabel: {
        id: 'techka',
        name: 'Течение',
      },
      timeLabel: {
        id: 'time',
        name: 'Время суток',
      },
      seasonLabel: {
        id: 'season',
        name: 'Сезон',
      },
      methodLabel: {
        id: 'method',
        name: 'Метод ловли',
      },
      fishOptions: [
        { name: 'Карп', id: '1' },
        { name: 'Щука', id: '2' },
        { name: 'Судак', id: '3' },
        { name: 'Окунь', id: '4' },
        { name: 'Лещ', id: '5' },
        { name: 'Плотва', id: '6' },
      ],
      vodoemOptions: [
        { name: 'Река', id: '1' },
        { name: 'Озеро', id: '2' },
        { name: 'Пруд', id: '3' },
        { name: 'Водохранилище', id: '4' },
      ],
      waterOptions: [
        { name: 'Очень прозрачная', id: '1' },
        { name: 'Прозрачная', id: '2' },
        { name: 'Слегка мутная', id: '3' },
        { name: 'Мутная', id: '4' },
      ],
      techkaOptions: [
        { name: 'Отсутствует', id: '1' },
        { name: 'Слабое', id: '2' },
        { name: 'Среднее', id: '3' },
        { name: 'Сильное', id: '4' },
      ],
      seasonOptions: [
        { name: 'Лето', id: '1' },
        { name: 'Осень', id: '2' },
        { name: 'Зима', id: '3' },
        { name: 'Весна', id: '4' },
      ],
      timeOptions: [
        { name: 'Утро', id: '1' },
        { name: 'День', id: '2' },
        { name: 'Вечер', id: '3' },
        { name: 'Ночь', id: '4' },
      ],
      methodOptions: [
        { name: 'Поплавочная', id: '1' },
        { name: 'Фидер', id: '2' },
        { name: 'Универсальная', id: '3' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.bait {
  &__items {
    display: flex;
    gap: 24px;
  }
  &__item {
    flex: 1 1 50%;
    max-width: 50%;
  }
}
.form {
  background-color: #1b3a4b;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid #4b5563;
  &__heading {
    font-size: 24px;
  }
  &__items {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  &__item {
    flex: 1 1 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    &-half {
      flex: 1 1 calc(50% - 12px);
      max-width: calc(50% - 12px);
    }
  }
}
</style>
