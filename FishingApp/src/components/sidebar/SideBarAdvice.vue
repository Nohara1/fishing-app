<template>
  <div class="sidebar__advice">
    <div class="sidebar__advice-content">
      <span class="sidebar__advice-logo">💡</span>
      <div class="sidebar__advice-text">
        <span class="sidebar__advice-title">{{ title }}</span>
        <span v-if="advice[currentAdviceIndex]" class="sidebar__advice-subtitle">{{
          advice[currentAdviceIndex].subtitle
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SideBarAdvice',
  data() {
    return {
      currentAdviceIndex: 0,
    }
  },
  props: {
    title: {
      type: String,
      default: 'Совет',
    },
    advice: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeAdvice() {
      this.currentAdviceIndex++
      if (this.currentAdviceIndex >= this.advice.length) {
        this.currentAdviceIndex = 0
      }
    },
  },
  mounted() {
    setInterval(() => {
      this.changeAdvice()
    }, 600000)
  },
}
</script>
<style lang="scss" scoped>
.sidebar {
  &__advice {
    &-logo {
      font-size: 24px;
    }
    &-content {
      display: flex;
      gap: 12px;
      padding: 16px;
      border-radius: 18px;
      border: 1px solid rgba(75, 85, 99, 0.2);
      background-image: linear-gradient(
        to right bottom,
        rgba(128, 128, 128, 0.1) 0%,
        rgba(255, 165, 0, 0.1) 100%
      );
    }
    &-text {
      display: flex;
      flex-direction: column;
    }
    &-title {
      color: #3a6ea5;
      font-size: 14px;
      font-weight: 500;
    }
    &-subtitle {
      font-size: 12px;
      font-weight: 400;
      line-height: 1.625;
      color: #b3b3b3;
    }
  }
}
</style>
