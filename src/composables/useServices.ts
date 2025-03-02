import { ref, onBeforeMount } from 'vue'
import axios from 'axios'

export interface ServiceMetrics {
  errors: number,
  latency: number,
  requests: number,
  uptime: number,
}

export interface ServiceDeveloper {
  readonly id: string,
  name: string,
  email: string,
  avatar: string,
}

export interface ServiceVersion {
  readonly id: string,
  name: string,
  description: string,
  developer?: ServiceDeveloper,
  updated_at: string,
}

const enum ServiceType {
  REST,
  HTTP,
}

export interface Service {
  readonly id: string,
  name: string,
  description: string,
  type: ServiceType,
  published: boolean,
  configured: boolean,
  versions: ServiceVersion[],
  metrics?: ServiceMetrics,
}

export default function useServices(): any {
  const services = ref<Service[]>([])
  const error = ref<boolean>(false)
  const loading = ref<boolean>(false)

  const getServices = async (): Promise<any> => {
    try {
      loading.value = true
      error.value = false

      // TODO remove the timeout stuff to stop simulating delay
      function timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
      await timeout(1000)

      const { data }: { data: Service[] } = await axios.get('/api/services')
      services.value = data
    } catch (err: any) {
      services.value = []
      error.value = true
    } finally {
      loading.value = false
    }
  }

  onBeforeMount(async (): Promise<void> => {
    // Fetch services from the API
    await getServices()
    loading.value = false
  })

  // Return stateful data
  return {
    services,
    loading,
    error,
  }
}
