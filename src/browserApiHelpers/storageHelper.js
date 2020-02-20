import _ from 'lodash'
import { TARGET_TAB_TYPE_KEY, TARGET_CONTENT_TYPE_KEY } from '../constants/tab'

const DEFAULT_OPTIONS = {
  escape: false
}

/**
 * chrome.storage.sync.set({key: value}, function() {
 *   console.log('Value is set to ' + value);
 * });
 */
export const promisifiedSyncSet = async storingData => {
  return new Promise((resolve) => {
    chrome.storage.sync.set(storingData, resolve)
  })
}

/**
 *
 * @example
 * chrome.storage.sync.get(['key'], function (result) {
 *  console.log('Value currently is ' + result.key)
 * })
 *
 * @return {Promise}
 */
export const promisifiedSyncGet = keys => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, resolve)
  })
}

export const sequentiallySyncGet = async keys => {
  const resultObj = await promisifiedSyncGet(keys)
  const results = keys.map(key => _.get(resultObj, key))
  return results
}

export function onChange (callback) {
  chrome.storage.onChanged.addListener((changes) => {
    const callbackChanges = {}

    Object.keys(DEFAULT_OPTIONS).forEach((key) => {
      callbackChanges[key] = changes[key].newValue
    })

    callback(callbackChanges)
  })
}

/**
 * 取得目前 chrome sync 中的目標
 */
export const getTargetFromChromeSync = async () => {
  try {
    const target = await promisifiedSyncGet([
      TARGET_TAB_TYPE_KEY,
      TARGET_CONTENT_TYPE_KEY
    ])
    return target
  } catch (error) {

  }
}
