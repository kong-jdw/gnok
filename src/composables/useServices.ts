import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// This composable is a simplified example for the exercise **and could likely be improved**.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

export default function useServices(): any {
  const services = ref<any[]>(null)
  const error = ref<any>(false)

  const getServices = async (): Promise<any> => {
    try {
      setTimeout(async () => {
        const { data } = await axios.get('/api/services')
        services.value = data
      }, 1000) // TODO, REMOVE ME

    } catch (err: any) {
      services.value = []
      error.value = true
    }
  }

  onMounted(async (): Promise<void> => {
    // Fetch services from the API
    await getServices()
  })

  // Return stateful data
  return {
    services,
    loading: computed(() => !services.value && !error.value),
    error,
  }
}
