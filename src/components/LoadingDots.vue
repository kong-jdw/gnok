<template>
  <div class="loader" />
</template>
<style lang="scss" scoped>
@use '@css/media.scss';
@use '@css/colors.scss' as c;

/* #26 from https://css-loaders.com/dots/ */
.loader {
  animation: l26 2s infinite ease-in-out;
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow:
    19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 0px,
    19px 0     0 5px, 38px 0     0 5px, 57px 0     0 5px,
    19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 0px;
  color: c.$dark-gray;
  transform: translateX(-14px);
  width: 4px;

  @include media.dark {
    color: c.$bright-gray;
  }
}
@keyframes l26 {
  12.5% {box-shadow:
    19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 5px,
    19px 0     0 5px, 38px 0     0 0px, 57px 0     0 5px,
    19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 0px}
  25%   {box-shadow:
    19px -19px 0 5px, 38px -19px 0 0px, 57px -19px 0 5px,
    19px 0     0 0px, 38px 0     0 0px, 57px 0     0 0px,
    19px 19px  0 0px, 38px 19px  0 5px, 57px 19px  0 0px}
  50%   {box-shadow:
    19px -19px 0 5px, 38px -19px 0 5px, 57px -19px 0 0px,
    19px 0     0 0px, 38px 0     0 0px, 57px 0     0 0px,
    19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 5px}
  62.5% {box-shadow:
    19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 0px,
    19px 0     0 5px, 38px 0     0 0px, 57px 0     0 0px,
    19px 19px  0 0px, 38px 19px  0 5px, 57px 19px  0 5px}
  75%   {box-shadow:
    19px -19px 0 0px, 38px -19px 0 5px, 57px -19px 0 0px,
    19px 0     0 0px, 38px 0     0 0px, 57px 0     0 5px,
    19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 5px}
  87.5% {box-shadow:
    19px -19px 0 0px, 38px -19px 0 5px, 57px -19px 0 0px,
    19px 0     0 0px, 38px 0     0 5px, 57px 0     0 0px,
    19px 19px  0 5px, 38px 19px  0 0px, 57px 19px  0 0px}
}
</style>
