import { config } from '@vue/test-utils'

const DataTestIdPlugin = (wrapper: any) => {
  /**
   * Find element by `data-testid` selector
   * @param {string} dataTestid The `data=testid` attribute of the element
   * @example expect(wrapper.findTestId('search-input').isVisible()).toBe(true)
   */
  const findTestId = (dataTestid: string): any => {
    const dataSelector = `[data-testid="${dataTestid}"]`
    return wrapper.find(dataSelector)
  }

  /**
   * Get element by `data-testid` selector
   * @param {string} dataTestid The `data=testid` attribute of the element
   * @example expect(wrapper.findTestId('search-input').isVisible()).toBe(true)
   */
  const getTestId = (dataTestid: string): any => {
    const dataSelector = `[data-testid="${dataTestid}"]`
    return wrapper.get(dataSelector)
  }

  return {
    findTestId,
    getTestId,
  }
}

config.plugins.VueWrapper.install(DataTestIdPlugin)
