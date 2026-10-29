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
            <!-- <div class="form__item">
              <BaseRange v-model="formData.rangeDeep" :label="deepLabel" />
            </div> -->
            <div class="form__item">
              <BaseRange v-model="formData.rangeTempWater" :label="tempwaterLabel" />
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
                <BaseButton type="button" @click.prevent="createRecipe">Создать рецепт</BaseButton>
                <BaseButton type="button" @click.prevent="formReload" variant="svg">
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
        <div class="bait__result" v-if="resultBait">
          <div class="bait__result-inner">
            <div class="bait__result-title">Рецепт прикормки</div>
            <div class="bait__result-name">{{ resultBait.name }}</div>
            <div class="bait__result-body">
              <div class="bait__structure">
                <div class="bait__structure-list">
                  <p class="bait__structure-title">Состав:</p>
                  <BaseList :lists="resultBait.ingredients" variant="unstyled">
                    <template #list="{ list }">
                      <div class="bait__structure-item">
                        <p class="bait__structure-name">{{ list.name }}</p>
                        <span class="bait__structure-amount">{{ list.amount }}</span>
                      </div>
                    </template>
                  </BaseList>
                </div>
              </div>
              <div class="bait__cooked">
                <div class="bait__cooked-list">
                  <p class="bait__cooked-title">Приготовление:</p>
                  <BaseList :lists="resultBait.cooked" variant="unstyled" as="ol">
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
                      <div class="bait__options-value">
                        {{ resultBait.options.consistency }}
                      </div>
                    </div>
                  </div>
                  <div class="bait__options-item">
                    <div class="bait__options-inner">
                      <div class="bait__options-key">Связка</div>
                      <div class="bait__options-value">{{ resultBait.options.bind }}</div>
                    </div>
                  </div>
                  <div class="bait__options-item">
                    <div class="bait__options-inner">
                      <div class="bait__options-key">Аромат</div>
                      <div class="bait__options-value">{{ resultBait.options.aroma }}</div>
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
<script setup>
import baits from '@/data/baits.json'
import baitForm from '@/data/baitForm.json'
import {ref,computed} from 'vue'

const activeRecipeId = ref(null)
const formData =  ref(getDefaultFormData())
const {formFields,tempwaterLabel,timeLabel,seasonLabel,methodLabel,seasonOptions,timeOptions,methodOptions} = baitForm
const bestBaitId = computed (() => {
  let bestId = null
  let bestScore = -1

  baits.forEach((bait) => {
    const score = getScore(bait)
    if (score >= bestScore) {
      bestScore = score
      bestId = bait.id
    }
  })
  if (bestScore === 0) return null
  return bestId
}) // выбираем лучшую прикормку что подошла по критериям
const resultBait = computed(() => {
  return baits.find((bait) => bait.id === activeRecipeId.value) || null
} // функция возвращает первый элемент(в нашем случчаи обьект с прикормкой) с нужным id лиюо если ниче не нащел то null
)

function getDefaultFormData() {
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
}
function createRecipe(){
  activeRecipeId.value = bestBaitId.value //присваиваю пустой активрецептид луший ид который есть
}
function formReload() {
  formData.value = getDefaultFormData() //обнуляет форму
  activeRecipeId.value = null // обнуляем результат
}
function getScore(bait) {
  const keys = ['Fish', 'Vodoem', 'Water', 'Techka', 'Season', 'Time', 'Method']
  let score = 0

  keys.forEach((key) => {
    const value = formData.value[key]
    if (!value) return
    if (bait.criteria[key]?.includes(value)) score += 1
  })

  const temp = formData.value.rangeTempWater
  if (temp >= bait.criteria.rangeTempWater?.min && temp <= bait.criteria.rangeTempWater?.max) {
    score += 1
  }
  return score
} //получаю оценку при выборе инпутов , т.е. сколько значений выбранных инпутов сопадет со значениями в критериях прикормки
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
    &-amount {
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
      text-align: center;
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
