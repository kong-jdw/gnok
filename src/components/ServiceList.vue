<script lang="ts" setup>
import ServiceCard from '@components/ServiceCard.vue'
import type { Service } from '@/composables/useServices'

interface Props {
  services: Service[],
  loading: boolean,
}

defineProps<Props>()
</script>

<template>
  <div v-if="loading">
    loading
  </div>

  <div
    v-else-if="services.length"
    class="card-list"
  >
    <ServiceCard
      v-for="service in services"
      :key="service.id"
      :service="service"
    />
  </div>

  <div
    v-else
    data-testid="no-results"
  >
    No services
  </div>
</template>

<style lang="scss" scoped>
@use '@css/media.scss';
@use '@css/spacing.scss';

.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: spacing.$space-md;
}

.card-list > * {
  width: 100%;

  @include media.md {
    max-width: calc(50% - (spacing.$space-md / 2));
  }

  @include media.xl {
    max-width: calc(33.33% - (spacing.$space-md * 2 / 3));
  }
}
</style>
