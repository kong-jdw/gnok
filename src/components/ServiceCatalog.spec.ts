import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import ServiceCatalog from './ServiceCatalog.vue'
import SearchInput from '@/components/SearchInput.vue'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
}))

vi.mock('axios', async () => {
  const actual: any = await vi.importActual('axios')
  return {
    default: {
      ...actual.default,
      // Mock get request responses
      get: mocks.get,
    },
  }
})

describe('ServiceCatalog', () => {
  beforeEach(() => {
    mocks.get.mockReset()
    setActivePinia(createPinia())
  })

  it('renders', async () => {
    const wrapper = mount(ServiceCatalog, { shallow: true })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('fetches services on mount', async () => {
    mount(ServiceCatalog, { shallow: true })

    expect(mocks.get).toHaveBeenCalledTimes(1)
    expect(mocks.get).toHaveBeenLastCalledWith('/api/services')
  })

  it('fetches new services when search changes', async () => {
    const wrapper = mount(ServiceCatalog, { shallow: true })
    expect(mocks.get).toHaveBeenCalledTimes(1)

    const search = wrapper.findComponent(SearchInput)
    await search.vm.$emit('search', 'test')
    expect(mocks.get).toHaveBeenCalledTimes(2)
    expect(mocks.get).toHaveBeenLastCalledWith('/api/services?q=test')
  })
})
