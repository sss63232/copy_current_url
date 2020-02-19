import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import copy from 'copy-to-clipboard'
import Success from './Success/Success'
import { getCurrentActiveTabs, getTabsByQuerying } from '../background/browserTabsUtils'
import { promisifiedSyncGet } from '../browserApiHelpers/storageHelper'
import {
  TARGET_TAB_TYPE,
  TARGET_TAB_TYPE_KEY,
  TARGET_CONTENT_TYPE_KEY,
  TARGET_CONTENT_TYPE
} from '../constants/tab'
import { getMarkdownLink } from '../background/markdownUtils'

import styles from './Popup.module.css'

/**
 * 取得目前的目標
 */
export const getTarget = async () => {
  try {
    const target = await promisifiedSyncGet([
      TARGET_TAB_TYPE_KEY,
      TARGET_CONTENT_TYPE_KEY
    ])
    return target
  } catch (error) {

  }
}

const copyHandler = async target => {
  let copyingText = ''

  const {
    targetTabType = TARGET_TAB_TYPE.ONLY_CURRENT_TAB,
    targetContentType = TARGET_CONTENT_TYPE.BOTH_TITLE_URL
  } = target

  let mdLinkOption = {}
  switch (targetContentType) {
    case TARGET_CONTENT_TYPE.ONLY_URL: {
      mdLinkOption = { hasTitle: false }
      break
    }
    case TARGET_CONTENT_TYPE.ONLY_TITLE: {
      mdLinkOption = { hasUrl: false }
      break
    }
    default:
    case TARGET_CONTENT_TYPE.BOTH_TITLE_URL: {
      break
    }
  }

  const getMD = tab => getMarkdownLink(tab, mdLinkOption)

  try {
    switch (targetTabType) {
      case TARGET_TAB_TYPE.ALL_TABS: {
        const tabs = await getTabsByQuerying({ currentWindow: true })
        copyingText = tabs.map(getMD).join(' ')
        break
      }
      case TARGET_TAB_TYPE.HIGHLIGHTED_TABS: {
        const tabs = await getTabsByQuerying({
          highlighted: true,
          currentWindow: true
        })
        copyingText = tabs.map(getMD).join(' ')
        break
      }
      default:
      case TARGET_TAB_TYPE.ONLY_CURRENT_TAB: {
        const tabs = await getCurrentActiveTabs()
        copyingText = getMD(tabs[0])
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
  const [target, setTarget] = useState({})

  useEffect(
    () => {
      const copyTargetTabs = async () => {
        try {
          const savedTarget = await getTarget()
          const {
            copiedText,
            hasCopiedSuccessfully
          } = await copyHandler(savedTarget)

          setTarget(savedTarget)
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
      <a
        href='options.html'
        target='_blank'
        className={styles.linkToOptions}
      >
        <Button
          shape='circle'
          icon='setting'
        />
      </a>
      {hasCopied && (
        <Success
          target={target}
          copiedLink={copiedUrl}
        />
      )}
    </div>
  )
}

export default Popup
