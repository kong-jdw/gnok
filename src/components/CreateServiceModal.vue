<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import { Icon } from '@iconify/vue'

const appStore = useAppStore()
</script>

<template>
  <div
    v-if="appStore.isCreateServiceModalOpen"
    class="modal"
    @click="appStore.toggleCreateServiceModal"
  >
    <div
      class="content"
      @click.stop
    >
      <div
        class="close"
        @click="appStore.toggleCreateServiceModal"
      >
        <Icon icon="stash:times-solid" />
      </div>

      <h3>Create Service</h3>

      <p>
        Vexillologist scenester raw denim tote bag, offal hot chicken ugh pinterest dreamcatcher meggings copper mug cold-pressed blackbird spyplane tacos shabby chic. Solarpunk hashtag quinoa, same shabby chic migas seitan skateboard kitsch. Readymade sriracha banjo, cupping master cleanse edison bulb tattooed health goth DIY enamel pin tonx swag art party 90's kale chips. Swag normcore dreamcatcher next level fam grailed wayfarers schlitz mumblecore palo santo migas.
      </p>

      <p>
        Text from the glorious <a href="https://hipsum.co/">hipster ipsum</a>.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@css/media.scss';
@use '@css/spacing.scss';
@use '@css/colors.scss' as c;

.modal {
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10000;

  @include media.dark {
    background-color: rgba(c.$dark-gray, 0.4);
  }

  .content {
    background-color: white;
    left: 50%;
    max-height: 90%;
    max-width: 90%;
    min-height: 20rem;
    min-width: 20rem;
    overflow: auto;
    padding: 0 spacing.$space-md spacing.$space-md spacing.$space-md;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);

    @include media.dark {
      background-color: black;
    }
  }

  .close {
    cursor: pointer;
    font-size: 1.5rem;
    line-height: 1;
    padding: spacing.$space-xs;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
