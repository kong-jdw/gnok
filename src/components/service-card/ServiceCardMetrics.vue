<script lang="ts" setup>
import { computed } from 'vue'
import type { ServiceMetrics } from '@/composables/useServices'
import { IN_PROGRESS } from '@/assets/constants/app'

interface Props {
  hover: boolean,
  metrics?: ServiceMetrics,
  status: string,
}

const {
  hover,
  metrics = {
    latency: null,
    errors: null,
    requests: null,
    uptime: null,
  },
} = defineProps<Props>()

const latency = computed<string | null>(() => {
  return metrics.latency === null
    ? null
    : `${Math.floor(metrics.latency * 100)}ms`
})

const uptime = computed<string | null>(() => {
  return metrics.uptime === null
    ? null
    : `${Number((metrics.uptime * 100).toFixed(2))}%`
})

const requests = computed<string | null>(() => {
  if (metrics.requests === null) {
    return null
  }

  if (metrics.requests < 1000) {
    return '< 1k'
  }

  return `${Math.floor(metrics.requests / 1000).toLocaleString()}k`
})

const errors = computed<string | null>(() => {
  return metrics.errors === null
    ? null
    : `${Number((metrics.errors * 100).toFixed(2))}%`
})
</script>

<template>
  <div
    v-if="status !== IN_PROGRESS"
    class="metrics"
    :class="{
      hover,
    }"
  >
    <div v-if="latency !== null">
      <div class="dot" />
      <div class="value">
        {{ latency }}
      </div>
      <label>latency</label>
    </div>

    <div v-if="uptime !== null">
      <div class="dot" />
      <div class="value">
        {{ uptime }}
      </div>
      <label>uptime</label>
    </div>

    <div v-if="requests !== null">
      <div class="dot" />
      <div class="value">
        {{ requests }}
      </div>
      <label>requests</label>

      <div
        v-if="errors"
        class="tiny-dot"
      >
        •
      </div>

      <div
        v-if="errors"
        class="value"
      >
        {{ errors }}
      </div>
      <label>errors</label>
    </div>
  </div>
  <div
    v-else
    class="metrics"
    :class="{
      hover,
    }"
  >
    <div>
      <div class="gray-dot" />
      <div class="value">
        Not configured with runtime yet
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@css/spacing.scss';
@use '@css/media.scss';
@use '@css/colors.scss' as c;

.metrics {
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  gap: calc(spacing.$space-xs / 2);

  > div {
    align-items: center;
    display: flex;
    gap: calc(spacing.$space-xs / 2);
  }

  .gray-dot,
  .dot {
    border-radius: 6px;
    height: 6px;
    margin-right: spacing.$space-xs;
    width: 6px;
  }

  .gray-dot {
    background-color: c.$paragraph-light;
    opacity: 0.7;
    transition: opacity 0.1s ease-in;

    @include media.dark {
      background-color: c.$paragraph-dark;
    }
  }

  .dot {
    background-color: c.$primary-green;
    box-shadow: 0px 0px 0px 0px c.$primary-green;
  }

  &.hover .gray-dot {
    opacity: 1;
  }

  &.hover .dot {
    animation: pulse-light 1s 1;
    @include media.dark {
      animation: pulse-dark 1s 1;
    }
  }

  .tiny-dot {
    font-size: 0.5rem;
  }

  .value {
    font-weight: 600;
  }
}

@keyframes pulse-light {
  0% {
    box-shadow: 0 0 0 0px rgba(c.$primary-green, 0.3);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(c.$primary-green, 0);
  }
}

@keyframes pulse-dark {
  0% {
    box-shadow: 0 0 0 0px rgba(c.$primary-green, 0.5);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(c.$primary-green, 0);
  }
}
</style>
