<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { ServiceVersion } from '@/composables/useServices'
import { PUBLISHED, UNPUBLISHED, IN_PROGRESS } from '@/assets/constants/app'

interface Props {
  status: string,
  hover: boolean,
  versions: ServiceVersion[],
}

const { status, hover, versions } = defineProps<Props>()

const versionLabel = computed(() => {
  const count = versions.length

  if (count > 1) {
    return `${count} versions`
  }

  if (count > 0) {
    return `${count} version`
  }

  return ''
})

const icon = computed(() => {
  switch (status) {
    case PUBLISHED:
      return 'fluent:checkmark-12-filled'
    case UNPUBLISHED:
      return 'mi:warning'
    case IN_PROGRESS:
    default:
      return 'mingcute:loading-line'
  }
})

const statusLabel = computed(() => {
  switch (status) {
    case PUBLISHED:
      return 'Published to portal'
    case UNPUBLISHED:
      return 'Unpublished'
    case IN_PROGRESS:
    default:
      return 'In progress'
  }
})
</script>

<template>
  <div
    class="header"
    :class="{
      [status]: true,
      hover,
    }"
  >
    <div class="header-status">
      <Icon :icon="icon" />
      <label>{{ statusLabel }}</label>
    </div>

    <div
      v-if="versions.length"
      class="header-versions"
    >
      {{ versionLabel }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@css/spacing.scss';
@use '@css/media.scss';
@use '@css/colors.scss' as c;

.header {
  align-items: center;
  display: flex;
  gap: spacing.$space-sm;
  justify-content: space-between;

  .header-status {
    align-items: center;
    display: flex;
    gap: spacing.$space-xs;

    label {
      font-size: 0.75rem;
      transition: color 0.1s ease-in;
    }
  }

  .iconify {
    transition: color 0.1s ease-in;
  }

  &.in-progress .iconify {
    animation: spin 1s ease-in-out 1;
  }
  &.published .iconify {
    color: c.$primary-green;
  }

  .header-versions {
    background-color: rgba(c.$primary-blue, 0.1);
    border-radius: 100px;
    color: c.$primary-blue;
    font-size: 0.75rem;
    padding: spacing.$space-xs spacing.$space-sm;
    transition: background-color 0.1s ease-in;

    @include media.dark {
      background-color: rgba(c.$primary-blue, 0.2);
    }
  }

  &.hover {
    .iconify {
      color: c.$primary-blue;
    }

    .header-versions {
      background-color: rgba(c.$primary-blue, 0.2);

      @include media.dark {
        background-color: rgba(c.$primary-blue, 0.3);
      }
    }
  }
}
</style>
