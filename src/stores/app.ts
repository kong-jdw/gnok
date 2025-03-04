import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',

  state: () => ({
    serviceModalOpen: false,
  }),

  getters: {
    isCreateServiceModalOpen: (state) => state.serviceModalOpen,
  },

  actions: {
    toggleCreateServiceModal(): void {
      this.serviceModalOpen = !this.isCreateServiceModalOpen
    },
  },
})

