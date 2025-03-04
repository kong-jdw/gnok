<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useServices from '@/composables/useServices'
import type { Service } from '@/composables/useServices'
import ServiceCard from '@/components/service-card/ServiceCard.vue'
import VersionList from '@/components/VersionList.vue'

const route = useRoute()
const serviceId = route.params.serviceId as string

const searchString = ref<string>(serviceId)

const {
  services,
  loading,
}: {
  services: Service[],
  loading: boolean,
} = useServices(searchString)
</script>

<template>
  <div
    v-if="loading"
  >
    loading
  </div>
  <div
    v-else-if="services[0]"
    class="content"
  >
    <ServiceCard
      :service="services[0]"
    />
    <VersionList
      v-if="services[0].versions.length"
      :type="services[0].type"
      :versions="services[0].versions"
    />
  </div>
  <h1 v-else>
    This is a totally legit 404 page. Your service could not be found.
  </h1>
</template>

<style lang="scss" scoped>
@use '@css/spacing.scss';

.content {
  display: flex;
  flex-direction: column;
  gap: spacing.$space-md;
}
</style>
