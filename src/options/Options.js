import React from 'react'
import './Options.css'
import { Radio, Form, Layout, Button } from 'antd'
import { promisifiedSyncSet, promisifiedSyncGet } from '../browserApiHelpers/storageHelper'
import { TARGET_TAB_TYPE_KEY, TARGET_TAB_TYPE, TARGET_CONTENT_TYPE } from '../constants/tab'

const { Header, Content, Footer } = Layout

const changeTargetTabTypeHandler = e => {
  const targetValue = e.target.value
  const storingData = {
    [TARGET_TAB_TYPE_KEY]: targetValue
  }
  promisifiedSyncSet(storingData).then(() => {
    console.log('set OK')
    promisifiedSyncGet([TARGET_TAB_TYPE_KEY]).then(result => {
    })
  })
}

const Options = props => {
  return (
    <div className='App'>

      <Layout className='layout'>
        <Header>
          <div className='logo' />
        </Header>
        <Content style={{ padding: '50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Form layout='vertical'>
              <Form.Item label='Target tab:'>
                <Radio.Group
                  defaultValue={TARGET_TAB_TYPE.ONLY_CURRENT_TAB}
                  onChange={changeTargetTabTypeHandler}
                >
                  {
                    Object.keys(TARGET_TAB_TYPE)
                      .map(key => TARGET_TAB_TYPE[key])
                      .map(targetTabType => {
                        return (
                          <Radio.Button
                            key={`${targetTabType}__Mode`}
                            value={targetTabType}
                          >
                            {targetTabType}
                          </Radio.Button>
                        )
                      })
                  }
                </Radio.Group>
              </Form.Item>

              <Form.Item label='Target content:'>
                <Radio.Group
                  defaultValue={TARGET_CONTENT_TYPE.BOTH_TITLE_URL}
                // onChange={changeTargetTabTypeHandler}
                >
                  {
                    Object.keys(TARGET_CONTENT_TYPE)
                      .map(key => TARGET_CONTENT_TYPE[key])
                      .map(targetContentType => {
                        return (
                          <Radio.Button
                            key={`${targetContentType}__Mode`}
                            value={targetContentType}
                          >
                            {targetContentType}
                          </Radio.Button>
                        )
                      })
                  }
                </Radio.Group>
              </Form.Item>

              <Button type='primary'>Submit</Button>
            </Form>

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          {/* CopyUrlToMD ©20202 Created by YU-HSIN, CHEN */}
        </Footer>
      </Layout>,

    </div>
  )
}

export default Options
