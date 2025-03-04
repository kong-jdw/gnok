<script lang="ts" setup>
import { ref } from 'vue'
import useServices from '@/composables/useServices'
import type { Service } from '@/composables/useServices'
import PageTitle from '@/components/PageTitle.vue'
import SearchInput from '@/components/SearchInput.vue'
import CreateServiceButton from '@/components/CreateServiceButton.vue'
import ServiceList from '@/components/ServiceList.vue'

const searchString = ref<string>('')

const {
  services,
  loading,
}: {
  services: Service[],
  loading: boolean,
} = useServices(searchString)

const handleSearch = (search: string): void => {
  if (search) {
    searchString.value = search
  } else {
    searchString.value = ''
  }
}
</script>

<template>
  <div class="header-search">
    <PageTitle>
      <template #default>
        Service Hub
      </template>
      <template #description>
        Organize services, manage and track versioning, and API service documentation.
        <a href="https://konghq.com">Learn more</a>.
      </template>
    </PageTitle>

    <div class="search">
      <SearchInput @search="handleSearch" />
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

.header-search {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: spacing.$space-md;
  justify-content: space-between;
  margin-bottom: spacing.$space-md;

  .search {
    align-items: center;
    display: flex;
    flex-grow: 1;
    gap: spacing.$space-md;
    justify-content: flex-end;
  }
}
</style>
