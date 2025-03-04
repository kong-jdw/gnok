<template>
  <div class="page-title">
    <h1><slot name="default" /></h1>
    <p><slot name="description" /></p>
  </div>
</template>

<style scoped lang="scss">
.page-title {
  h1 {
    margin-top: 0;
  }

  p {
    font-size: 1rem;
  }
}
</style>
