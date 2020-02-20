import React from 'react'
import { Row, Col, Button } from 'antd'
import { PAGE_MODE } from '../constants/page'
import { WrappedOptionsForm } from '../options/OptionsForm/OptionsForm'

const Settings = props => {
  const {
    setPageMode = null
  } = props

  const handleRollBackClick = e => {
    setPageMode(PAGE_MODE.DO_COPY)
  }

  return (
    <>
      <Row
        type='flex'
        justify='end'
      >
        <Col>
          <Button
            shape='circle'
            icon='rollback'
            onClick={handleRollBackClick}
            style={{
              margin: 15
            }}
          />
        </Col>
      </Row>
      <div
        style={{
          background: '#fff',
          padding: 25
        }}
      >
        <WrappedOptionsForm />
      </div>
    </>

  )
}

export default Settings
