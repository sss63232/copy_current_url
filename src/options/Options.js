import React from 'react'
import './Options.css'
import { Row, Col, Button } from 'antd'
import { WrappedOptionsForm } from './OptionsForm/OptionsForm'
import { PAGE_MODE } from '../constants/page'

const Options = props => {
  const {
    setPageMode
  } = props

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
            style={{
              margin: 15
            }}
            onClick={() => {
              setPageMode(PAGE_MODE.DO_COPY)
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
        <WrappedOptionsForm
          setPageMode={setPageMode}
        />
      </div>
    </>

  )
}

export default Options
