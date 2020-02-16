import React, { useState, useEffect } from 'react'
import styles from './Popup.module.css'
import _ from 'lodash'
import copy from 'copy-to-clipboard'
import Success from './Success/Success'
import { getCurrentActiveTabs, getTabsByQuerying } from '../background/browserTabsUtils'
import { sequentiallySyncGet } from '../browserApiHelpers/storageHelper'
import { TARGET_TAB_TYPE, TARGET_TAB_TYPE_KEY } from '../constants/tab'
import { getMarkdownLink } from '../background/markdownUtils'

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

const copyHandler = async targetType => {
  let copyingText = ''

  try {
    switch (targetType) {
      case TARGET_TAB_TYPE.ALL_TABS: {
        const tabs = await getTabsByQuerying({ currentWindow: true })
        copyingText = tabs.map(getMarkdownLink).join(' ')
        break
      }
      case TARGET_TAB_TYPE.HIGHLIGHTED_TABS: {
        const tabs = await getTabsByQuerying({
          highlighted: true,
          currentWindow: true
        })
        copyingText = tabs.map(getMarkdownLink).join(' ')
        break
      }
      default:
      case TARGET_TAB_TYPE.ONLY_CURRENT_TAB: {
        const tabs = await getCurrentActiveTabs()
        copyingText = getMarkdownLink(tabs[0])
        break
      }
    }

    const hasCopiedSuccessfully = copy(copyingText)
    return {
      hasCopiedSuccessfully,
      copiedText: copyingText
    }
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
          const {
            copiedText,
            hasCopiedSuccessfully
          } = await copyHandler(type)

          setType(type)
          setHasCopied(hasCopiedSuccessfully)
          setCopiedUrl(copiedText)
        } catch (error) {

        }
      }

      copyTargetTabs()
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
