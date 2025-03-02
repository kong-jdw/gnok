<script lang="ts" setup>
defineProps({
  service: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="card">
    <p>{{ service.name }}</p>
    <p>{{ service.description }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use '@css/media.scss';

.card {
  border: 1px solid black;
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
}
</style>
