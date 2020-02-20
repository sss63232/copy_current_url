import * as browser from 'webextension-polyfill'

export const sendMessageToBackground = payload => browser.runtime.sendMessage(payload)
