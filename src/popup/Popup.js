import React, { useState, useEffect } from 'react'
import { Button, Layout, Row, Col } from 'antd'
import Success from './Success/Success'
import { promisifiedSyncGet } from '../browserApiHelpers/storageHelper'
import {
  TARGET_TAB_TYPE_KEY,
  TARGET_CONTENT_TYPE_KEY
} from '../constants/tab'
// import styles from './Popup.module.css'
import { WrappedOptionsForm } from '../options/OptionsForm/OptionsForm'
import { PAGE_MODE } from '../constants/page'
import { copyHandler } from '../background/copyHandler'
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
  const [hasCopied, setHasCopied] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState()
  const [target, setTarget] = useState({})
  const [pageMode, setPageMode] = useState(PAGE_MODE.POPUP)

  useEffect(
    () => {
      const copyTargetTabs = async () => {
        try {
          const savedTarget = await getTargetFromChromeSync()
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
    <Layout className='layout'>
      <Content
        style={{
          width: 500
        }}
      >
        {
          pageMode === PAGE_MODE.OPTIONS && (
            <>
              <Row
                type='flex'
                justify='end'
              >
                <Col>
                  <Button
                    shape='circle'
                    icon='rollback'
                    style={{
                      margin: 15
                    }}
                    onClick={() => {
                      setPageMode(PAGE_MODE.POPUP)
                    }}
                  />
                </Col>
              </Row>
              <WrappedOptionsForm />
            </>
          )
        }
        {
          pageMode === PAGE_MODE.POPUP && hasCopied && (
            <>
              <Row
                type='flex'
                justify='end'
              >
                <Button
                  shape='circle'
                  icon='setting'
                  style={{
                    margin: 15
                  }}
                  onClick={() => {
                    setPageMode(PAGE_MODE.OPTIONS)
                  }}
                />
              </Row>
              <Success
                target={target}
                copiedLink={copiedUrl}
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
