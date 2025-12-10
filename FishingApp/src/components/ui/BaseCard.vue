<template>
  <article class="card">
    <div class="card__badges">
      <div class="card__logo">
        <img :src="card.logo" alt="щука" width="42" height="42" />
      </div>
    </div>
    <div class="card__image">
      <img :src="card.image" alt="fish-one" width="488" height="366" />
    </div>
    <div class="card__content">
      <div class="card__heading">
        <h3 class="card__name">{{ card.title }}</h3>
        <div class="card__tags">
          <p class="card__tag">{{ card.tag }}</p>
        </div>
      </div>
      <p class="card__latin-name">{{ card.latinName }}</p>
      <div class="card__content-info">
        <div class="card__time">{{ card.time }}</div>
        <div class="card__temperature">{{ card.temperature }}</div>
      </div>
      <BaseButton variant="card" icon="📖">Подробнее</BaseButton>
    </div>
  </article>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  components: {
    BaseButton,
  },
  name: 'BaseCard',
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.card {
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(75, 85, 99);
  position: relative;
  background-color: #1b3a4b;
  // flex: 1 1 calc(33.333% - 20px);
  // max-width: calc(33.333% - 20px);
  // width: 100%;
  height: 100%;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  &__tag {
    border: 1px solid #595f6d;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
  }
  &__heading {
    display: flex;
    justify-content: space-between;
  }
  &__latin {
    &-name {
      color: #b3b3b3;
      font-style: italic;
    }
  }
  &__badges {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }
  &__logo {
    background-color: #fff;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #b3b3b3;
  }
  &__image {
    border-radius: 18px 18px 0 0;
    width: 100%;
    color: inherit;
    display: block;
    overflow: hidden;
    position: relative;
    max-width: 100%;
    padding-bottom: 73.17%;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: auto;
      min-width: 100%;
      min-height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
      transform: translate(-50%, -50%) scale(1.005);
    }
  }
  &__content {
    padding: 24px;
    & > * {
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  }
  &__name {
    color: #fff;
    font-size: 20px;
    line-height: 1.4;
    font-weight: 600;
  }
  &__time {
    color: #b3b3b3;
    font-size: 16px;
  }
  &__temperature {
    color: #b3b3b3;
    font-size: 16px;
  }
}
</style>
