<script lang="ts" setup>
import { computed } from 'vue'
import type { ServiceVersion, ServiceDeveloper } from '@/composables/useServices'

interface Props {
  hover: boolean,
  status: string,
  versions: ServiceVersion[],
}

const { hover, versions } = defineProps<Props>()

const isDeveloper = (dev: ServiceDeveloper | undefined): dev is ServiceDeveloper => {
  return !!dev
}

const developers = computed<ServiceDeveloper[]>(() => {
  // get all the valid developers from versions by truthiness of the developer
  const allDevs = versions.map(({ developer }) => developer).filter(isDeveloper)

  // get a Set of the unique developer ids
  const uniqueIds = new Set(allDevs.map(({ id }) => id))

  // if id is successfully deleted then it was the first of that unique id. That
  // gives us the list of unique developers of our versions
  return allDevs.filter(({ id }) => uniqueIds.delete(id))
})

const visibleDevs = computed<ServiceDeveloper[]>(() => {
  return developers.value.slice(0, 3)
})

const remainingDevs = computed<ServiceDeveloper[]>(() => {
  return developers.value.slice(3)
})
</script>

<template>
  <div
    class="avatar-list"
    :class="{
      hover,
    }"
  >
    <div
      v-if="remainingDevs.length"
      class="avatar"
      style="z-index: 10"
    >
      <label>+{{ remainingDevs.length }}</label>
    </div>
    <a
      v-for="(developer, index) in visibleDevs"
      :key="developer.id"
      class="avatar"
      :href="`mailto:${developer.email}`"
      :style="{
        'background-image': `url(${developer.avatar})`,
        'z-index': `${9 - index}`,
      }"
      :title="developer.name"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@css/spacing.scss';
@use '@css/media.scss';
@use '@css/colors.scss' as c;

.avatar-list,
.avatar {
  transition: margin-right 0.1s ease-in;
}

.avatar-list {
  align-items: center;
  display: flex;
  margin-right: 11px;

  .avatar {
    align-items: center;
    background-color: c.$bright-gray;
    background-position: center center;
    background-size: cover;
    border: 1px solid white;
    border-radius: 100%;
    box-shadow: 0 0 0 1px rgba(166, 166, 166, 0.1);
    display: flex;
    font-size: 0.75rem;
    font-weight: 700;
    height: 36px;
    justify-content: center;
    margin-right: -11px;
    width: 36px;

    @include media.dark {
      background-color: c.$dark-gray;
      border: none;
      box-shadow: 0 0 0 2px rgba(166, 166, 166, 0.2);
    }

    &:hover {
      z-index: 100 !important;
    }
  }

  &.hover {
    margin-right: 9px;

    .avatar {
      margin-right: -9px;
    }
  }
}
</style>
