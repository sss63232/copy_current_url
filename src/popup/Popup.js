import React, { useState } from 'react'
import { promisifiedSyncGet } from '../browserApiHelpers/storageHelper'
import {
  TARGET_TAB_TYPE_KEY,
  TARGET_CONTENT_TYPE_KEY
} from '../constants/tab'
// import styles from './Popup.module.css'
import { PAGE_MODE } from '../constants/page'
import DoCopy from './DoCopy/DoCopy'
import Options from '../options/Options'
import { Layout } from 'antd'
const { Content, Footer } = Layout

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

const Popup = () => {
  const [pageMode, setPageMode] = useState(PAGE_MODE.DO_COPY)

  return (
    <Layout>
      <Content
        style={{
          width: 500
        }}
      >
        {
          pageMode === PAGE_MODE.DO_COPY && (
            <DoCopy
              setPageMode={setPageMode}
            />
          )
        }
        {
          pageMode === PAGE_MODE.OPTIONS && (
            <>
              <Options
                setPageMode={setPageMode}
              />
            </>
          )
        }
      </Content>

      <Footer
        style={{
          textAlign: 'center'
        }}
      >
CopyUrlToMD ©20202 Created by YU-HSIN, CHEN
      </Footer>
    </Layout>
  )
}

export default Popup
