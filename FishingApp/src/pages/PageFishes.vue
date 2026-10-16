<template>
  <div class="fishes">
    <div class="fishes__search">
      <BaseInput
        v-model="searchText"
        type="text"
        placeholder="Найти рыбу по названию..."
        aria-label="Поиск рыбы"
      />
      <BaseButton
        v-for="filter in filters"
        :key="filter.id"
        variant="filter"
        :class="{ active: idActive === filter.id }"
        :icon="filter.icon"
        @click="activeClass(filter.id)"
        >{{ filter.text }}</BaseButton
      >
    </div>
    <div class="fishes__cards">
      <BaseCard v-for="card in filteredCards" :key="card.title" :card="card" />
    </div>
    <div v-if="filteredCards.length == 0" class="fishes__none">
      <div class="fishes__none-icon">
        <svg fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M270.746,117.149c-20.516-20.514-47.79-31.812-76.802-31.811c-12.854,0-23.273,10.42-23.273,23.273 c0.002,12.854,10.42,23.273,23.274,23.273c16.578,0,32.163,6.454,43.886,18.178c11.723,11.723,18.178,27.308,18.178,43.885 c-0.002,12.853,10.418,23.274,23.271,23.274c0.002,0,0.002,0,0.002,0c12.851,0,23.271-10.418,23.273-23.271 C302.556,164.939,291.26,137.663,270.746,117.149z"
          />
          <path
            d="M505.183,472.272L346.497,313.586c25.921-32.979,41.398-74.536,41.398-119.639C387.894,87.005,300.89,0,193.946,0 c-0.003,0,0,0-0.003,0C142.14,0,93.434,20.175,56.806,56.804C20.173,93.437,0,142.141,0,193.947 C0,300.89,87.004,387.894,193.946,387.894c45.103,0,86.661-15.476,119.639-41.396L472.27,505.184 c4.544,4.544,10.501,6.816,16.457,6.816c5.956,0,11.913-2.271,16.455-6.817C514.273,496.096,514.273,481.359,505.183,472.272z M193.946,341.349c-81.276,0-147.4-66.124-147.4-147.402c0-39.373,15.332-76.389,43.172-104.229 c27.84-27.842,64.855-43.172,104.228-43.172c81.279,0,147.403,66.124,147.403,147.402S275.225,341.349,193.946,341.349z"
          />
        </svg>
      </div>
      <p class="fishes__none-title">Рыба не найдена</p>
      <p class="fishes__none-text">Попробуйте изменить условия поиска</p>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      idActive: 0,
      searchText: '',
      filters: [
        { icon: '', text: 'Вся рыба', id: 0 },
        { icon: '🌱', text: 'Весна', id: 1 },
        { icon: '🍂', text: 'Осень', id: 2 },
        { icon: '☀️', text: 'Лето', id: 3 },
        { icon: '🌱', text: 'Зима', id: 4 },
      ],
      cards: [
        {
          logo: '/fishing-app/image/icon/shcuka.png',
          image: '/fishing-app/image/fish-card-image/fish-one.webp',
          tag: 'Весна',
          latinName: 'Esox lucius',
          title: 'Щука',
          time: 'Утром и вечером',
          temperature: '8-18°C',
        },
        {
          logo: '/fishing-app/image/icon/shcuka.png',
          image: '/fishing-app/image/fish-card-image/fish-two.webp',
          tag: 'Осень',
          latinName: 'Esox lucius',
          title: 'Судак',
          time: 'На рассвете и в сумерках',
          temperature: '12-22°C',
        },
        {
          logo: '/fishing-app/image/icon/shcuka.png',
          image: '/fishing-app/image/fish-card-image/fish-three.webp',
          tag: 'Зима',
          latinName: 'Esox lucius',
          title: 'Карп',
          time: 'Утром и вечером',
          temperature: '18-25°C',
        },
        {
          logo: '/fishing-app/image/icon/shcuka.png',
          image: '/fishing-app/image/fish-card-image/fish-three.webp',
          tag: 'Лето',
          latinName: 'Esox lucius',
          title: 'Карп',
          time: 'Утром и вечером',
          temperature: '18-25°C',
        },
        {
          logo: '/fishing-app/image/icon/shcuka.png',
          image: '/fishing-app/image/fish-card-image/fish-three.webp',
          tag: 'Весна',
          latinName: 'Esox lucius',
          title: 'Карп',
          time: 'Утром и вечером',
          temperature: '18-25°C',
        },
        {
          logo: '/fishing-app/image/icon/shcuka.png',
          image: '/fishing-app/image/fish-card-image/fish-three.webp',
          tag: 'Весна',
          latinName: 'Esox lucius',
          title: 'Карп',
          time: 'Утром и вечером',
          temperature: '18-25°C',
        },
      ],
    }
  },
  methods: {
    activeClass(id) {
      this.idActive = id
    },
  },
  computed: {
    filteredCards() {
      const search = this.searchText.toLowerCase()
      const activeFilter = this.filters.find((filter) => filter.id === this.idActive)
      const activeTag = activeFilter.text.toLowerCase()

      return this.cards
        .filter((card) => card.title.toLowerCase().includes(search))
        .filter((card) =>
          this.idActive === 0 ? this.cards : card.tag.toLowerCase().includes(activeTag),
        )
    },
  },
}
</script>
<style lang="scss" scoped>
.fishes {
  &__none {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    &-title {
      font-size: 20px;
      font-weight: 500;
      color: #b3b3b3;
    }
    &-text {
      font-size: 16px;
      font-weight: 400;
      color: #b3b3b3;
    }
    &-icon {
      background-color: #2d4a59;
      border-radius: 50px;
      width: 96px;
      height: 96px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    svg {
      width: 48px;
      height: 48px;
    }
  }
  &__search {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}
</style>
