import React, { useState } from 'react'
// import styles from './Popup.module.css'
import { PAGE_MODE } from '../constants/page'
import DoCopy from './DoCopy/DoCopy'
import { Layout } from 'antd'
import Settings from '../Components/Settings'
const { Content, Footer } = Layout

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
          pageMode === PAGE_MODE.SETTINGS && (
            <>
              <Settings
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
