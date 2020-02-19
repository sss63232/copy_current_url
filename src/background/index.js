import { getTarget } from '../popup/Popup'
import { promisifiedSyncSet } from '../browserApiHelpers/storageHelper'
import { TARGET_TAB_TYPE, TARGET_CONTENT_TYPE } from '../constants/tab'

// browser.runtime.onMessage.addListener(message => {
// })

// browser.commands.onCommand.addListener(async command => {
// })

const onInstalledHandler = async details => {
  const { reason } = details
  switch (reason) {
    case 'install':
    case 'update': {
      await initAppSettings()
      break
    }
  }
}

const initAppSettings = async () => {
  const target = await getTarget()

  const {
    targetTabType = TARGET_TAB_TYPE.ONLY_CURRENT_TAB,
    targetContentType = TARGET_CONTENT_TYPE.BOTH_TITLE_URL
  } = target

  await promisifiedSyncSet({
    targetTabType,
    targetContentType
  })
}

browser.runtime.onInstalled.addListener(onInstalledHandler)
