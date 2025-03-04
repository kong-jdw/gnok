<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Service } from '@/composables/useServices'
import { PUBLISHED, UNPUBLISHED, IN_PROGRESS } from '@/assets/constants/app'
import ServiceCardHeader from '@/components/service-card/ServiceCardHeader.vue'
import ServiceCardMetrics from '@/components/service-card/ServiceCardMetrics.vue'
import ServiceCardDevelopers from '@/components/service-card/ServiceCardDevelopers.vue'

interface Props {
  service: Service,
}

const { service } = defineProps<Props>()

const status = computed(() => {
  if (service.published && service.configured) {
    return PUBLISHED
  }

  if (!service.published && !service.configured) {
    return UNPUBLISHED
  }

  return IN_PROGRESS
})

const hover = ref(false)

const router = useRouter()
const goToService = (): void => {
  router.push(`/${service.id}`)
}
</script>

<template>
  <div
    class="card"
    @click="goToService"
    @mouseleave="hover = false"
    @mouseover="hover = true"
  >
    <ServiceCardHeader
      :hover="hover"
      :status="status"
      :versions="service.versions"
    />

    <div class="content">
      <h3>{{ service.name }}</h3>
      <p class="description">
        {{ service.description }}
      </p>
    </div>

    <div class="footer">
      <ServiceCardMetrics
        :hover="hover"
        :metrics="service.metrics"
        :status="status"
      />

      <ServiceCardDevelopers
        :hover="hover"
        :status="status"
        :versions="service.versions"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@css/spacing.scss';
@use '@css/media.scss';
@use '@css/colors.scss' as c;

.card {
  background-color: white;
  border-radius: 2px;
  box-shadow: rgba(c.$dark-gray, 0.1) 5px 5px 5px 0px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: box-shadow 0.1s ease-in;
  width: 100%;
  word-break: break-word;

  @include media.dark {
    background-color: black;
    box-shadow: rgba(c.$bright-gray, 0.02) 5px 5px 5px 0px;
  }

  .content {
    flex-grow: 1;
    margin-bottom: spacing.$space-md;
  }

  .footer {
    align-items: flex-end;
    display: flex;
    gap: spacing.$space-sm;
    justify-content: space-between;
  }

  &:hover {
    box-shadow: rgba(c.$dark-gray, 0.2) 5px 5px 5px 1px;

    @include media.dark {
      box-shadow: rgba(c.$bright-gray, 0.04) 5px 5px 5px 1px;
    }
  }
}
</style>
