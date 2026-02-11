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
                <BaseButton @click.prevent="createRecipe()">Создать рецепт</BaseButton>
                <BaseButton @click.prevent="formReload" variant="svg">
                  <template #icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-rotate-ccw h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                      <path d="M3 3v5h5"></path>
                    </svg>
                  </template>
                </BaseButton>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="bait__item">
        <div class="bait__result" v-if="activeRecipeId.length !== 0">
          <div class="bait__result-inner">
            <div class="bait__result-title">Рецепт прикормки</div>
            <div class="bait__result-body">
              <div class="bait__structure">
                <div class="bait__structure-list">
                  <p class="bait__structure-title">Состав:</p>
                  <BaseList :lists="listStructure" variant="unstyled">
                    <template #list="{ list }">
                      <div class="bait__structure-item">
                        <p class="bait__structure-name">{{ list.name }}</p>
                        <span class="bait__structure-procent">{{ list.procent }}</span>
                      </div>
                    </template>
                  </BaseList>
                </div>
              </div>
              <div class="bait__cooked">
                <div class="bait__cooked-list">
                  <p class="bait__cooked-title">Приготовление:</p>
                  <BaseList :lists="listCooked" variant="unstyled" as="ol">
                    <template #list="{ list }">
                      <div class="bait__cooked-item">
                        <p class="bait__cooked-step">{{ list.step }}</p>
                      </div>
                    </template>
                  </BaseList>
                </div>
              </div>
              <div class="bait__options">
                <div class="bait__options-items">
                  <div class="bait__options-item">
                    <div class="bait__options-inner">
                      <div class="bait__options-key">Консистенция</div>
                      <div class="bait__options-value">Средняя</div>
                    </div>
                  </div>
                  <div class="bait__options-item">
                    <div class="bait__options-inner">
                      <div class="bait__options-key">Связка</div>
                      <div class="bait__options-value">Хорошая</div>
                    </div>
                  </div>
                  <div class="bait__options-item">
                    <div class="bait__options-inner">
                      <div class="bait__options-key">Аромат</div>
                      <div class="bait__options-value">Сладкий</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bait__buttons">
                <BaseButton variant="card">Сохранить пресет</BaseButton>
              </div>
            </div>
          </div>
        </div>
        <div class="bait__empty" v-else>
          <div class="bait__empty-inner">
            <div class="bait__empty-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-utensils h-12 w-12 mx-auto mb-4 text-muted-foreground"
                aria-hidden="true"
              >
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                <path d="M7 2v20"></path>
                <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
              </svg>
            </div>
            <div class="bait__empty-title">Создайте рецепт прикормки</div>
            <div class="bait__empty-text">
              Заполните условия ловли слева и нажмите "Создать рецепт"
            </div>
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
import BaseList from '@/components/ui/BaseList.vue'
export default {
  components: {
    BaseSelect,
    BaseRange,
    BaseButton,
    BaseList,
  },
  data() {
    return {
      baits: [
        {
          id: 1,
          name: 'Универсальная сладкая (стоячая вода)',
          criteria: {
            Fish: ['1', '5', '6'],
            Vodoem: ['2', '3'],
            Water: ['1', '2', '3', '4'],
            Techka: ['1'],
            Season: ['1', '2'],
            Time: ['1', '2', '3'],
            Method: ['1', '2'],
          },
          ingredients: [
            { id: 1, name: 'Панировочные сухари', amount: '40%' },
            { id: 2, name: 'Кукурузная крупа (сухая)', amount: '25%' },
            { id: 3, name: 'Жмых подсолнечный', amount: '15%' },
            { id: 4, name: 'Манная крупа', amount: '10%' },
            { id: 5, name: 'Ваниль (ванилин/арома)', amount: 'по вкусу' },
          ],
          cooked: [
            { id: 1, step: 'Смешай все сухие компоненты до однородности.' },
            { id: 2, step: 'Понемногу добавляй воду, постоянно перемешивая.' },
            { id: 3, step: 'Дай смеси постоять 10–15 минут, чтобы компоненты набухли.' },
            { id: 4, step: 'Доведи увлажнение до лепки шаров, но чтобы они легко распадались.' },
            { id: 5, step: 'Добавь ванильную ароматику в самом конце и ещё раз перемешай.' },
          ],
          options: {
            consistency: 'Средняя',
            bind: 'Средняя',
            aroma: 'Сладкий (ваниль)',
          },
        },

        {
          id: 2,
          name: 'Для леща (тёплая вода, сладкие запахи)',
          criteria: {
            Fish: ['5'],
            Vodoem: ['1', '2', '4'],
            Water: ['2', '3', '4'],
            Techka: ['1', '2'],
            Season: ['1', '2'],
            Time: ['1', '2', '3'],
            Method: ['2'],
          },
          ingredients: [
            { id: 1, name: 'Панировочные сухари', amount: '35%' },
            { id: 2, name: 'Отруби пшеничные', amount: '20%' },
            { id: 3, name: 'Жмых подсолнечный', amount: '15%' },
            { id: 4, name: 'Лён молотый/льняная мука', amount: '10%' },
            { id: 5, name: 'Сладкая ароматика (ваниль/карамель)', amount: 'по вкусу' },
          ],
          cooked: [
            { id: 1, step: 'Смешай сухари, отруби и жмых.' },
            { id: 2, step: 'Добавь молотый лён и перемешай.' },
            { id: 3, step: 'Увлажняй в 2–3 подхода, чтобы не перелить воду.' },
            { id: 4, step: 'Выдержи 15 минут, затем снова перемешай.' },
            {
              id: 5,
              step: 'Добавь сладкую ароматику, проверь механику: комок лепится и “работает” в воде.',
            },
          ],
          options: {
            consistency: 'Рыхлая-средняя',
            bind: 'Слабая-средняя',
            aroma: 'Сладкий (ваниль/карамель)',
          },
        },

        {
          id: 3,
          name: 'Для карпа (пластичная, хорошо лепится)',
          criteria: {
            Fish: ['1'],
            Vodoem: ['2', '3', '4'],
            Water: ['1', '2', '3'],
            Techka: ['1', '2'],
            Season: ['1'],
            Time: ['2', '3'],
            Method: ['1', '2'],
          },
          ingredients: [
            { id: 1, name: 'Панировочные сухари', amount: '30%' },
            { id: 2, name: 'Пшено (распаренное/варёное)', amount: '25%' },
            { id: 3, name: 'Кукуруза дроблёная/крупа', amount: '20%' },
            { id: 4, name: 'Манка', amount: '15%' },
            { id: 5, name: 'Ароматика (ваниль/анис/карамель)', amount: 'по вкусу' },
          ],
          cooked: [
            { id: 1, step: 'Подготовь пшено: распарь/отвари до мягкости и остуди.' },
            { id: 2, step: 'Смешай сухари, дроблёную кукурузу и манку.' },
            { id: 3, step: 'Добавь пшено и перемешай до пластичной массы.' },
            { id: 4, step: 'При необходимости подлей немного воды, чтобы смесь хорошо лепилась.' },
            { id: 5, step: 'Добавь ароматику, сформируй шары нужного размера.' },
          ],
          options: {
            consistency: 'Пластичная',
            bind: 'Хорошая',
            aroma: 'Сладкий (ваниль/анис/карамель)',
          },
        },
      ],
      activeRecipeId: '',
      listStructure: [
        { name: 'Кукурузная крупа', procent: '40%' },
        { name: 'Панировочные сухари', procent: '30%' },
        { name: 'Жмых подсолнечный', procent: '15%' },
        { name: 'Манная крупа', procent: '10%' },
        { name: 'Ванильный ароматизатор', procent: '5мл' },
      ],
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
    createRecipe() {
      this.activeRecipeId = this.bestBaitId //присваиваю пустой активрецептид луший ид который есть
    },
    formReload() {
      this.formData = this.getDefaultFormData() //обнуляет форму
    },
    getScore(bait) {
      const keys = ['Fish', 'Vodoem', 'Water', 'Techka', 'Season', 'Time', 'Method']
      let score = 0

      keys.forEach((key) => {
        const value = this.formData[key]
        if (!value) return
        if (bait.criteria[key]?.includes(value)) score += 1
      })
      return score
    }, //получаю оценку при выборе инпутов , т.е. сколько значений выбронных инпутов сопадет со знаениями в критериях прикормки
  },
  computed: {
    bestBaitId() {
      let bestId = null
      let bestScore = -1

      this.baits.forEach((bait) => {
        const score = this.getScore(bait)
        if (score > bestScore) {
          bestScore = score
          bestId = bait.id
        }
      })
      console.log(bestScore)
      console.log(bestId)
      return bestId
    }, // выбираем лучшую прикормку что подошла по критериям
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
  &__result {
    background-color: #1b3a4b;
    padding: 24px;
    border-radius: 18px;
    border: 1px solid #4b5563;
    &-inner {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    &-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
  &__cooked {
    &-list {
      padding-bottom: 16px;
      border-bottom: 1px solid #525a68;
    }
    &-title {
      margin-bottom: 8px;
    }
    &-step {
      font-size: 14px;
      line-height: 1.4;
    }
  }
  &__structure {
    &-list {
      padding-bottom: 16px;
      border-bottom: 1px solid #525a68;
    }
    &-title {
      margin-bottom: 8px;
    }
    &-item {
      background-color: #8d654c;
      border-radius: 4px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      padding: 8px;
      font-size: 14px;
      line-height: 1.4;
    }
    &-procent {
      border: 1px solid #4b5563;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      line-height: 1;
      display: flex;
      align-items: center;
    }
  }
  &__options {
    &-items {
      display: flex;
      justify-content: space-between;
    }
    &-item {
      flex: 1 1 33.333%;
      max-width: 33.333%;
    }
    &-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    &-key {
      color: #b3b3b3;
      font-size: 14px;
      line-height: 1.4;
    }
    &-value {
      font-weight: 500;
      font-size: 16px;
      line-height: 1.5;
    }
  }
  &__empty {
    background-color: #1b3a4b;
    border-radius: 18px;
    border: 1px solid #4b5563;
    &-inner {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }
    &-icon svg {
      width: 48px;
      height: 48px;
    }
    &-title {
      font-size: 16px;
      font-weight: 500;
    }
    &-text {
      color: #b3b3b3;
      font-size: 14px;
    }
  }
}
.form {
  background-color: #1b3a4b;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid #4b5563;
  &__buttons {
    &-wrapper {
      display: flex;
      gap: 12px;
      & > *:first-child {
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
