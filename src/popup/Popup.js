import React, { useState, useEffect } from 'react'
import styles from './Popup.module.css'
import _ from 'lodash'
import copy from 'copy-to-clipboard'
import Success from './Success/Success'
import { getCurrentActiveTabs, getTabsByQuerying } from '../background/browserTabsUtils'
import { sequentiallySyncGet } from '../browserApiHelpers/storageHelper'
import { TARGET_TAB_TYPE, TARGET_TAB_TYPE_KEY } from '../constants/tab'
import { getMarkdownLink } from '../background/markdownUtils'
import { sendMessageToBackground } from '../browserApiHelpers/runtimeHelper'

const queryTabsAbout = async (queryInfo) => {
  try {
    const tabs = await getTabsByQuerying(queryInfo)
    return tabs
  } catch (error) {
  }
}

/**
 * 取得目前的目標 tab type
 */
const getTargetTabType = async () => {
  try {
    const tabType = await sequentiallySyncGet([TARGET_TAB_TYPE_KEY])
    return _.head(tabType) || TARGET_TAB_TYPE.ONLY_CURRENT_TAB
  } catch (error) {

  }
}

const Popup = () => {
  const [hasCopied, setHasCopied] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState()
  const [type, setType] = useState()

  useEffect(
    () => {
      const copyTargetTabs = async () => {
        try {
          const type = await getTargetTabType()
          let textToBeCopied = ''

          switch (type) {
            case TARGET_TAB_TYPE.ALL_TABS: {
              const tabs = await queryTabsAbout({ currentWindow: true })
              textToBeCopied = tabs.map(getMarkdownLink).join(' ')
              break
            }
            default:
            case TARGET_TAB_TYPE.ONLY_CURRENT_TAB: {
              const tabs = await getCurrentActiveTabs()
              textToBeCopied = getMarkdownLink(tabs[0])
            }
          }

          const hasCopiedSuccessfully = copy(textToBeCopied)
          if (hasCopiedSuccessfully) {
            setType(type)
            setHasCopied(true)
            setCopiedUrl(textToBeCopied)
          }
        } catch (error) {

        }
      }

      copyTargetTabs()

      sendMessageToBackground({ copy: 'copy' })
    },
    []
  )

  return (
    <div className={styles.popup}>
      {hasCopied && (
        <Success
          type={type}
          copiedLink={copiedUrl}
        />
      )}
    </div>
  )
}

export default Popup
