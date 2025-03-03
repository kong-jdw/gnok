<script lang="ts" setup>
import useServices from '@/composables/useServices'
import type { Service } from '@/composables/useServices'
import PageTitle from '@/components/PageTitle.vue'
import SearchInput from '@/components/SearchInput.vue'
import CreateServiceButton from '@/components/CreateServiceButton.vue'
import ServiceList from '@/components/ServiceList.vue'

const { services, loading }: { services: Service[], loading: boolean } = useServices()
</script>

<template>
  <div class="header-search">
    <PageTitle>Service Hub</PageTitle>
    <div class="search">
      <SearchInput />
      <CreateServiceButton />
    </div>
  </div>

  <ServiceList
    :loading="loading"
    :services="services"
  />
</template>

<style lang="scss" scoped>
@use '@css/spacing.scss';
@use '@css/media.scss';

.header-search {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: spacing.$space-md;
  justify-content: space-between;
  margin-bottom: spacing.$space-md;
}

.search {
  align-items: center;
  background-color: red;
  display: flex;
  gap: spacing.$space-md;
  justify-content: flex-end;
  width: 100%;

  @include media.md {
    max-width: 50%;
  }
}
</style>
