import { TARGET_TAB_TYPE, TARGET_CONTENT_TYPE } from '../constants/tab'
import { getMarkdownLink } from './markdownUtils'
import { getTabsByQuerying, getCurrentActiveTabs } from './browserTabsUtils'
import copy from 'copy-to-clipboard'

export const copyHandler = async target => {
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
