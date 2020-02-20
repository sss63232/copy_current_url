import React from 'react'
import './Options.css'
import { Layout } from 'antd'
import { WrappedOptionsForm } from './OptionsForm/OptionsForm'

const { Header, Content, Footer } = Layout

const Options = props => {
  return (
    <div className='App'>
      <Layout className='layout'>
        <Header>
          <div className='logo' />
        </Header>

        <Content style={{ padding: '50px' }}>
          <div style={{
            background: '#fff',
            padding: 24,
            minHeight: 280
          }}
          >
            <WrappedOptionsForm />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          CopyUrlToMD ©20202 Created by YU-HSIN, CHEN
        </Footer>
      </Layout>
    </div>
  )
}

export default Options
