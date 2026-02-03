<template>
  <div сlass="bait">
    <div class="bait__items">
      <div class="bait__item">
        <form name="bait" class="form">
            <div class="form__items">
              <div class="form__item ">
                <h2 class="form__heading">Условия рыбалки</h2>
              </div>
              <div class="form__item form__item-half">
                <BaseSelect :options="fishOptions" v-model="selected" :label="fishLabel"/>
              </div>
              <div class="form__item form__item-half">
                <BaseSelect :options="fishOptions" :label="vodoemLabel"/>
              </div>
              <div class="form__item form__item-half">
                <BaseSelect :options="fishOptions" :label="waterLabel"/>
              </div>
              <div class="form__item form__item-half">
                <BaseSelect :options="fishOptions" :label="techkaLabel"/>
              </div>
              <div class="form__item">
                <BaseRange/>
              </div>
              <!-- <div class="form__item"></div>
              <div class="form__item"></div>
              <div class="form__item"></div>
              <div class="form__item"></div>
              <div class="form__item"></div>
              <div class="form__item"></div>
              <div class="form__item"></div> -->
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
// import BaseInput from '@/components/ui/BaseInput.vue'
export default {
  components: {
    BaseSelect,
    BaseRange
  },
  data() {
    return {
      selected: '',
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
      techkaLabel:{
        id: 'techka',
        name: 'Течение',
      },
      fishOptions: [
        {name:'Карп', id: '1'},
        {name:'Карп1', id: '2'},
        {name:'Карп2', id: '3'},
        {name:'Карп3', id: '4'},
        {name:'Карп4', id: '5'},
        {name:'Карп5', id: '6'}
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
.form{
  background-color: #1b3a4b;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid #4b5563;
  &__heading{
    font-size: 24px;
  }
  &__items{
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  &__item{
    flex: 1 1 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    &-half{
      flex: 1 1 calc(50% - 12px);
      max-width: calc(50% - 12px);
    }
  }

}
</style>
