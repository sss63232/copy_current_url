import * as browser from 'webextension-polyfill'

export const getTabsByQuerying = async (queryInfo = {}) => {
  try {
    const tabs = await browser.tabs.query(queryInfo)
    return tabs
  } catch (error) {

  }
}

export const getCurrentActiveTabs = async () => {
  const currentActiveTabs = await getTabsByQuerying({
    currentWindow: true,
    active: true
  })

  return currentActiveTabs
}
