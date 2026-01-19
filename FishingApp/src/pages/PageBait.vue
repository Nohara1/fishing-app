<template>
  <div сlass="bait">
    <div class="bait__items">
      <div class="bait__item">
        <form name="bait">
          <div class="form__items">
            <div class="form__item">
              <BaseSelect :options="fishOptions" />
            </div>
            <div class="form__item"></div>
            <div class="form__item"></div>
            <div class="form__item"></div>
            <div class="form__item"></div>
            <div class="form__item"></div>
            <div class="form__item"></div>
            <div class="form__item"></div>
            <div class="form__item"></div>
          </div>
        </form>
      </div>
      <div class="bait__item">123</div>
    </div>
  </div>
</template>
<script>
import BaseSelect from '@/components/ui/BaseSelect.vue'
// import BaseInput from '@/components/ui/BaseInput.vue'
export default {
  components: {
    BaseSelect,
  },
  data() {
    return {
      fishOptions: ['Карп', 'Окунь', 'Щука', 'Судак', 'Лещ', 'Плотва'],
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
</style>
