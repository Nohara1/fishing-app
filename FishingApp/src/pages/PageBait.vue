<template>
  <div class="bait">
    <div class="bait__items">
      <div class="bait__item">
        <form name="bait" class="form">
          <div class="form__items">
            <div class="form__item">
              <h2 class="form__heading">Условия рыбалки</h2>
            </div>
            <div class="form__item form__item-half" v-for="field in formFields" :key="field.key">
              <BaseSelect
                :options="field.options"
                :label="field.label"
                v-model="formData[field.key]"
              />
            </div>
            <div class="form__item">
              <BaseRange v-model.number="formData.rangeDeep" :label="deepLabel" />
            </div>
            <div class="form__item">
              <BaseRange v-model.number="formData.rangeTempWater" :label="tempwaterLabel" />
            </div>
            <div class="form__item form__item-half">
              <BaseSelect :options="seasonOptions" v-model="formData.Season" :label="seasonLabel" />
            </div>
            <div class="form__item form__item-half">
              <BaseSelect :options="timeOptions" v-model="formData.Time" :label="timeLabel" />
            </div>
            <div class="form__item">
              <BaseSelect :options="methodOptions" v-model="formData.Method" :label="methodLabel" />
            </div>
            <div class="form__item">
              <div class="form__buttons-wrapper">
                <BaseButton>Создать рецепт</BaseButton>
                <BaseButton @click.prevent="formReload" variant="svg">
                  <template #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw h-4 w-4" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                    </template>
                </BaseButton>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="bait__item">
          <div class="bait__result">
            <div class="bait__result-inner">
              <div class="bait__result-title"></div>
                <div class="bait__result-body">
                  <div class="bait__result-structure">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div class="bait__result-cooked">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div class="bait__result-options">
                    123
                  </div>
                  <div class="bait__result-buttons">
                    <BaseButton>Создать рецепт</BaseButton>
                  </div>
                </div>
                <div class="bait__result-empty">123</div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseRange from '@/components/ui/BaseRange.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
export default {
  components: {
    BaseSelect,
    BaseRange,
    BaseButton,
  },
  data() {
    return {
      formData: this.getDefaultFormData(),
      formFields: [
        {
          key: 'Fish',
          label: { id: 'fish', name: 'Целевая рыба' },
          options: [
            { name: 'Карп', id: '1' },
            { name: 'Щука', id: '2' },
            { name: 'Судак', id: '3' },
            { name: 'Окунь', id: '4' },
            { name: 'Лещ', id: '5' },
            { name: 'Плотва', id: '6' },
          ],
        },
        {
          key: 'Vodoem',
          label: { id: 'vodoem', name: 'Тип водоема' },
          options: [
            { name: 'Река', id: '1' },
            { name: 'Озеро', id: '2' },
            { name: 'Пруд', id: '3' },
            { name: 'Водохранилище', id: '4' },
          ],
        },
        {
          key: 'Water',
          label: { id: 'water', name: 'Прозрачность воды' },
          options: [
            { name: 'Очень прозрачная', id: '1' },
            { name: 'Прозрачная', id: '2' },
            { name: 'Слегка мутная', id: '3' },
            { name: 'Мутная', id: '4' },
          ],
        },
        {
          key: 'Techka',
          label: { id: 'techka', name: 'Течение' },
          options: [
            { name: 'Отсутствует', id: '1' },
            { name: 'Слабое', id: '2' },
            { name: 'Среднее', id: '3' },
            { name: 'Сильное', id: '4' },
          ],
        },
      ],
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
  methods: {
    getDefaultFormData() {
      return {
        Fish: '',
        Vodoem: '',
        Water: '',
        Techka: '',
        rangeDeep: 0.5,
        rangeTempWater: 0,
        Season: '',
        Time: '',
        Method: '',
      }
    },
    formReload() {
      this.formData = this.getDefaultFormData()
    },
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
  &__buttons{
    &-wrapper{
      display: flex;
      gap: 12px;
      & > *:first-child{
        flex: 1;
      }
    }
  }
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
