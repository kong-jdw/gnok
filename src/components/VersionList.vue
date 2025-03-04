<script lang="ts" setup>
import { defineProps } from 'vue'
import type { ServiceVersion, ServiceType } from '@/composables/useServices'

interface Props {
  versions: ServiceVersion[],
  type: ServiceType,
}

const { versions } = defineProps<Props>()
</script>

<template>
  <div class="version-list">
    <h4>
      Versions ({{ versions.length }})
    </h4>
    <div
      v-for="version in versions"
      :key="version.id"
      class="version-row"
    >
      <label>{{ version.name }}</label>
      <p>{{ version.description }}</p>
      <div class="version-type">
        <div
          class="type"
          :class="{
            selected: type.toString() === 'HTTP',
          }"
        >
          HTTP
        </div>
        <div
          class="type"
          :class="{
            selected: type.toString() === 'REST',
          }"
        >
          REST
        </div>
      </div>
      <div
        v-if="version.developer"
        class="developer"
      >
        <a
          class="avatar"
          :href="`mailto:${version.developer.email}`"
          :style="{
            'background-image': `url(${version.developer.avatar})`,
          }"
          :title="version.developer.name"
        />
        <div class="developer-name">
          <h5>{{ version.developer.name }}</h5>
          <p>{{ new Date(version.updated_at).toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@css/spacing.scss';
@use '@css/media.scss';
@use '@css/colors.scss' as c;

.version-list {
  background-color: white;
  padding: spacing.$space-sm;

  @include media.dark {
    background-color: black;
  }

  label, p {
    margin: 0;
  }

  h4 {
    margin-bottom: spacing.$space-md;
    margin-top: 0;
  }
}

.version-row {
  border-bottom: 1px solid rgba(c.$bright-gray, 0.4);
  display: flex;
  flex-direction: column;
  gap: spacing.$space-xs;
  margin-bottom: spacing.$space-sm;
  padding-bottom: spacing.$space-sm;

  @include media.md {
    display: grid;
    grid-template-columns: 10% 30% 20% 40%;
  }

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .version-type {
    align-items: center;
    display: flex;
    gap: spacing.$space-xs;

    .type {
      background-color: rgba(c.$bright-gray, 0.4);
      border-radius: 4px;
      color: c.$primary-blue;
      padding: 1px 4px;

      @include media.dark {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .type.selected {
      background-color: rgba(c.$primary-blue, 0.3);
      @include media.dark {
        background-color: rgba(c.$primary-blue, 0.5);
      }
    }
  }

  .developer {
    align-items: center;
    display: flex;
    gap: spacing.$space-xs;
    justify-content: flex-start;

    .developer-name h5,
    .developer-name p {
      margin: 0;
    }
  }

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
    width: 36px;

    @include media.dark {
      background-color: c.$dark-gray;
      border: none;
      box-shadow: 0 0 0 2px rgba(166, 166, 166, 0.2);
    }
  }
}
</style>
