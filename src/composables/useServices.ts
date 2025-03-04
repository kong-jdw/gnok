import { ref, watch, toValue } from 'vue'
import type { Ref } from 'vue'
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

export const enum ServiceType {
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

export default function useServices(queryString: Ref<string>): any {
  const services = ref<Service[]>([])
  const error = ref<boolean>(false)
  const loading = ref<boolean>(false)

  const getServices = async (): Promise<any> => {
    try {
      services.value = []
      loading.value = true
      error.value = false

      // useful for simulating a delay
      // function timeout(ms: number) {
      //   return new Promise(resolve => setTimeout(resolve, ms))
      // }
      // await timeout(1000)

      const url = toValue(queryString)
        ? `/api/services?q=${encodeURIComponent(toValue(queryString))}`
        : '/api/services'

      const { data }: { data: Service[] } = await axios.get(url)
      services.value = data.sort(({ name: a }, { name: b }) => a.localeCompare(b))
    } catch (err: any) {
      services.value = []
      error.value = true
    } finally {
      loading.value = false
    }
  }

  watch(queryString, () => {
    // FIXME `watchEffect` _should_ work here but it doesn't?
    getServices()
  }, { immediate: true })

  return {
    services,
    loading,
    error,
  }
}
