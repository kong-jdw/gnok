<script lang="ts" setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <nav>
    <div>
      <router-link to="/">
        <img src="/konnect.svg">
      </router-link>
    </div>

    <div class="right-nav">
      <router-link to="/">
        <Icon icon="healthicons:people" />
        <span class="label">Organization</span>
      </router-link>

      <router-link to="/">
        <Icon icon="ion:settings-sharp" />
        <span class="label">Settings</span>
      </router-link>

      <router-link to="/">
        <div class="avatar">
          <Icon icon="simple-icons:kong" />
        </div>
        <span class="label">Kong Kardashian</span>
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use '@css/media.scss';
@use '@css/spacing.scss';
@use '@css/colors.scss' as c;

nav {
  background: c.$gradient-header;
  background-color: c.$primary-blue;
  display: flex;
  justify-content: space-between;
  padding: 1.375rem;
  position: sticky;
  top: 0;
  z-index: 1000;

  a {
    align-items: center;
    color: rgba(c.$bright-gray, 1);
    display: flex;
    font-size: 1rem;
    gap: spacing.$space-xs;
    &:hover {
      color: rgba(c.$bright-gray, 1);
    }

    .label {
      display: none;
      @include media.md {
        display: inline;
      }
    }
  }

  .avatar {
    align-items: center;
    background-color: c.$secondary-purple;
    border-radius: 100%;
    display: flex;
    height: 1.5rem;
    justify-content: center;
    width: 1.5rem;

    .iconify {
      font-size: 0.875rem;
    }
  }
}

.right-nav {
  display: flex;
  gap: spacing.$space-md;
  justify-items: center;
}
</style>
