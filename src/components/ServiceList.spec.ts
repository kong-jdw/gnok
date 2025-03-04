import { describe, it, expect, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker'
import { mount } from '@vue/test-utils'
import ServiceList from './ServiceList.vue'
import servicesData from '../../mocks/services'
import { CARDS_PER_PAGE } from '@/assets/constants/app'

describe('ServiceCatalog', () => {
  const render = ({
    loading = false,
    error = false,
    services = servicesData,
  } = {}) => {
    return mount(ServiceList, {
      props: {
        loading,
        error,
        services,
      },
      shallow: true,
    })
  }

  beforeEach(() => {
  })

  it.each([
    ['empty', { services: [] }],
    ['loading', { loading: true }],
    ['error', { error: true }],
    ['normally', { services: servicesData.slice(0, 1) }],
  ])('renders %s', (kind: string, props) => {
    const wrapper = render(props)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('does not have page navigation when only a couple services exist', () => {
    const wrapper = render({ services: servicesData.slice(0, 3) })
    const pageCount = wrapper.findTestId('pagination-controls')
    expect(pageCount.exists()).toBe(false)
  })

  it('has page navigation when more services exist than can be shown at once', () => {
    const services = Array(30).fill(undefined).map(() => ({
      ...servicesData[Math.floor(Math.random() * servicesData.length)],
      id: faker.string.uuid(), // ensure no :key collisions with limited mock data
    }))
    const wrapper = render({ services })
    const pageCount = wrapper.getTestId('pagination-controls')
    expect(pageCount.text()).toContain(`1 to ${CARDS_PER_PAGE} of 30 services`)
  })
})
