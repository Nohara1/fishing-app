<template>
  <select class="select" v-model="selected">
    <option disabled value="">Выберите один из вариантов</option>
    <option v-for="option in options" :key="option.id" value="">{{ option.name }}</option>
  </select>
</template>
<script>
export default {
  name: 'BaseSelect',
  props: {
    options: Array,
  },
  data() {
    return {
      selected: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.select {
  background-color: #1b3a4b;
  border-radius: 12px;
  width: 100%;
  min-height: 36px;
  font-size: 14px;
  padding: 8px 12px;
  color: #b3b3b3;
}
</style>
