<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ServiceCard from '@/components/service-card/ServiceCard.vue'
import LoadingDots from '@/components/LoadingDots.vue'
import type { Service } from '@/composables/useServices'

interface Props {
  services: Service[],
  loading: boolean,
}

const props = defineProps<Props>()

const visible = 9
const page = ref(0)

const maxPage = computed((): number => {
  return Math.floor(props.services.length / visible)
})

const visibleServices = computed((): Service[] => {
  return props.services.slice(page.value * visible, (page.value + 1) * visible)
})

const showingFrom = computed((): number => {
  return page.value * visible + 1
})

const showingTo = computed((): number => {
  const end = (page.value + 1) * visible
  return props.services.length > end ? end : props.services.length
})

const prev = (): void => {
  if (page.value > 0) {
    page.value -= 1
  }
}

const next = (): void => {
  if (page.value < maxPage.value) {
    page.value += 1
  }
}
</script>

<template>
  <div
    v-if="loading"
    class="loading"
  >
    <LoadingDots />
  </div>

  <div
    v-else-if="services.length"
  >
    <div class="card-list">
      <ServiceCard
        v-for="service in visibleServices"
        :key="service.id"
        :service="service"
      />
    </div>

    <div
      v-if="services.length > visible"
      class="pagination-controls"
    >
      <div
        class="pager"
        :class="{
          disabled: page === 0,
        }"
        @click="prev"
      >
        <Icon icon="bitcoin-icons:arrow-left-filled" />
      </div>

      <p>
        <strong>{{ showingFrom }} to {{ showingTo }}</strong>
        of {{ services.length }} services
      </p>

      <div
        class="pager"
        :class="{
          disabled: page === maxPage,
        }"
        @click="next"
      >
        <Icon icon="bitcoin-icons:arrow-right-filled" />
      </div>
    </div>
  </div>

  <div
    v-else
    class="no-results"
    data-testid="no-results"
  >
    <h3>
      No services found
    </h3>
    <Icon icon="hugeicons:sad-dizzy" />
  </div>
</template>

<style lang="scss" scoped>
@use '@css/media.scss';
@use '@css/spacing.scss';
@use '@css/colors.scss' as c;

.loading {
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
}

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

.no-results {
  align-items: center;
  display: flex;
  gap: spacing.$space-md;

  h3 {
    margin: 0;
  }

  .iconify {
    font-size: 3rem;
  }
}

.pagination-controls {
  align-items: center;
  display: flex;
  gap: spacing.$space-md;
  justify-content: center;
  margin-top: spacing.$space-md;

  p {
    margin: 0;
  }

  .pager {
    align-items: center;
    border: 1px solid rgba(c.$primary-blue, 0.7);
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    font-size: 1rem;
    height: spacing.$space-lg;
    justify-content: center;
    transition: color 0.1s ease-in;
    user-select: none;
    width: spacing.$space-lg;

    &.disabled {
      border: 1px solid rgba(c.$dark-gray, 0.3);
      cursor: not-allowed;

      &:hover {
        border: 1px solid rgba(c.$dark-gray, 0.3);
      }
    }

    &:hover {
      border: 1px solid rgba(c.$primary-blue, 1);
    }
  }
}
</style>
