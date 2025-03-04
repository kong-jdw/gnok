<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const focus = ref(false)
const field = ref()

const submit = () => {
  field.value.blur()
}

const handleKeyEvent = ({ key }: { key: string }): void => {
  if (key === 'Enter') {
    submit()
  }
}
</script>

<template>
  <div
    class="search"
    :class="{
      focus,
    }"
  >
    <Icon
      class="magnify"
      icon="material-symbols:search-rounded"
    />
    <input
      ref="field"
      placeholder="Search"
      @blur="focus = false"
      @focus="focus = true"
      @keydown="handleKeyEvent"
    >
    <Icon
      class="query"
      icon="tdesign:send-filled"
      @click="submit"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@css/media.scss';
@use '@css/colors.scss' as c;

.search {
  position: relative;

  input {
    border-radius: 4px;
    border-style: solid;
    color: c.$paragraph-light;
    outline: none;
    padding: calc(0.5rem + 1px);
    padding-left: 1.75rem;
    transition: border-color 0.1s ease-in;
    width: 100%;

    @include media.dark {
      background-color: c.$dark-gray;
      border-color: rgba(c.$bright-gray, 0.4);
      color: c.$paragraph-dark;
    }

    &:focus {
      border-color: c.$primary-blue;
    }
  }

  .iconify {
    font-size: 1rem;
    position: absolute;
    top: 50%;

    &.magnify {
      left: 1rem;
      transform: translate(-50%, -50%);
    }

    &.query {
      color: c.$primary-blue;
      cursor: pointer;
      opacity: 0.2;
      right: 1rem;
      transform: translate(50%, -50%);
      transition: opacity 0.1s ease-in;

      &:hover {
        animation: search 0.3s ease-in 1;
      }
    }
  }

  &.focus .iconify.query {
    opacity: 1;
  }
}

@keyframes search {
  0% {
    transform: translate(50%, -50%) rotate(0deg);
  }
  25% {
    transform: translate(50%, -50%) rotate(10deg);
  }
  50% {
    transform: translate(50%, -50%) rotate(0deg);
  }
  75% {
    transform: translate(50%, -50%) rotate(-10deg);
  }
  100% {
    transform: translate(50%, -50%) rotate(0deg);
  }
}
</style>
