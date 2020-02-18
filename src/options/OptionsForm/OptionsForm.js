import React from 'react'
import { Radio, Form, Button } from 'antd'
import { TARGET_CONTENT_TYPE, TARGET_TAB_TYPE } from '../../constants/tab'
import AntdFormField from '../AntdFormField/AntdFormField'

const OptionsForm = props => {
  const handleSubmit = e => {
    console.log('TCL: ------------')
    console.log('TCL:  e ', e)
    console.log('TCL: ------------')
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('TCL: ------------------')
        console.log('TCL: values', values)
        console.log('TCL: ------------------')
      }
    })
  }

  return (
    <Form
      layout='vertical'
      onSubmit={handleSubmit}
    >
      <Form.Item label='Target tab:'>
        <AntdFormField
          name='targetTab'
          form={props.form}
          option={{
            initialValue: TARGET_TAB_TYPE.ONLY_CURRENT_TAB,
            rules: [
              {
                required: true,
                message: 'Please input your target tab!'
              }
            ]
          }}
        >
          <Radio.Group>
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
        </AntdFormField>
      </Form.Item>

      <Form.Item label='Target content:'>
        <AntdFormField
          name='targetContent'
          form={props.form}
          option={{
            initialValue: TARGET_CONTENT_TYPE.BOTH_TITLE_URL,
            rules: [
              {
                required: true,
                message: 'Please input your target content!'
              }
            ]
          }}
        >
          <Radio.Group>
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
        </AntdFormField>

      </Form.Item>

      <Button
        type='primary'
        htmlType='submit'
      >
          Submit
      </Button>
    </Form>
  )
}

export const WrappedOptionsForm = Form.create({ name: 'optionsForm' })(OptionsForm)
