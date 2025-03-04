<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useAppStore } from '@/stores/app'
import { Icon } from '@iconify/vue'

const appStore = useAppStore()

const handleKeyEvent = ({ key }: { key: string }) => {
  if (key === 'Escape' && appStore.isCreateServiceModalOpen) {
    appStore.toggleCreateServiceModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyEvent)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyEvent)
})
</script>

<template>
  <div
    class="create-service-button"
    @click="appStore.toggleCreateServiceModal"
  >
    <Icon icon="typcn:plus" />
    Service<span class="sm-hide"> package</span>
  </div>
</template>

<style lang="scss" scoped>
@use '@css/spacing.scss';
@use '@css/colors.scss' as c;
@use '@css/media.scss';

.create-service-button {
  align-items: center;
  background-color: c.$primary-green;
  border-radius: 100px;
  box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.1);
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  gap: calc(spacing.$space-xs / 2);
  padding: spacing.$space-xs spacing.$space-sm;
  transition: box-shadow 0.1s ease-in;
  user-select: none;
  white-space: nowrap;

  @include media.dark {
    box-shadow: 1px 1px 5px 0 rgba(255,255,255,0.1);
  }

  &:hover {
    box-shadow: 3px 3px 5px 0 rgba(0,0,0,0.3);
    @include media.dark {
      box-shadow: 2px 2px 5px 0 rgba(255,255,255,0.2);
    }
    .iconify {
      animation: hithere 1s ease-in 1;
    }
  }

  .sm-hide {
    display: none;
    @include media.sm {
      display: inline;
    }
  }
}

@keyframes hithere {
  30% { transform: scale(1.2); }
  40%, 60% { transform: rotate(-20deg) scale(1.2); }
  50% { transform: rotate(20deg) scale(1.2); }
  70% { transform: rotate(0deg) scale(1.2); }
  100% { transform: scale(1); }
}
</style>
