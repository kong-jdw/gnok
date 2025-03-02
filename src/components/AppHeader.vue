<script lang="ts" setup>
</script>

<template>
  <nav>
    <div>
      <router-link to="/">
        Logo
      </router-link>
    </div>

    <div class="right-nav">
      <router-link to="/">
        Organization
      </router-link>

      <router-link to="/">
        Settings
      </router-link>

      <router-link to="/">
        Avatar
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use '@css/colors.scss' as c;

nav {
  background: c.$gradient-header;
  background-color: c.$primary-blue;
  display: flex;
  justify-content: space-between;
  padding: 1.375rem;
  position: sticky;
  top: 0;
}

.right-nav {
  display: flex;
  gap: 1rem;
  justify-items: center;
}
</style>
