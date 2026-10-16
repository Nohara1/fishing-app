<template>
  <div class="tags">
    <BaseButton
      variant="content"
      v-for="tag in tags"
      :key="tag.id"
      @click="onClick(tag.id)"
      :class="{ active: idActive === tag.id }"
      >{{ tag.name }}</BaseButton
    >
  </div>
</template>
<script>

export default {
  name: 'BaseTags',
  emits: ['change-tag'],
  props: {
    idActive: Number,
    tags: Array,
  },
  methods: {
    onClick(id) {
      this.$emit('change-tag', id)
    },
  },
}
</script>
<style lang="scss" scoped>
.tags {
  display: flex;
  width: 100%;
  gap: 10px;
  border-radius: 12px;
  background-color: #2d4a59;
  justify-content: space-around;
  padding: 5px;
  margin-bottom: 40px;
}
</style>
