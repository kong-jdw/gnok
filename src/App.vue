<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue'
import CreateServiceModal from '@/components/CreateServiceModal.vue'
</script>

<template>
  <AppHeader />
  <main>
    <router-view />
  </main>
  <CreateServiceModal />
</template>

<style lang="scss" scoped>
@use '@css/media.scss';
@use '@css/spacing.scss';

main {
  margin: 0 auto;
  max-width: 100%;
  padding: spacing.$space-lg spacing.$space-md;

  @include media.xxl {
    max-width: media.$screen-xl;
  }
}
</style>
