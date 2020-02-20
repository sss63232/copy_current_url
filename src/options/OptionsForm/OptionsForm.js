import React from 'react'
import { Radio, Form, Button, message } from 'antd'
import _ from 'lodash'
import {
  TARGET_CONTENT_TYPE,
  TARGET_TAB_TYPE,
  TARGET_TAB_TYPE_KEY,
  TARGET_CONTENT_TYPE_KEY
} from '../../constants/tab'
import AntdFormField from '../AntdFormField/AntdFormField'
import { promisifiedSyncSet } from '../../browserApiHelpers/storageHelper'
import { PAGE_MODE } from '../../constants/page'
import useGetSyncTarget from '../../Hooks/useGetSyncTarget'

const OPTIONS_FORM_NAME = 'optionsForm'

const STORAGE_MESSAGE_KEY = 'storageMessageKey'

const OptionsForm = props => {
  const {
    form,
    setPageMode = null
  } = props

  const target = useGetSyncTarget()

  const handleError = error => {
    if (_.isNull(error)) {
      return
    }

    message.error({
      key: STORAGE_MESSAGE_KEY,
      content: `Failed, Error Detail: ${error}`
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    message.loading({
      key: STORAGE_MESSAGE_KEY,
      content: 'saving options...'
    })

    form.validateFields(
      async (err, values) => {
        if (!err) {
          try {
            await promisifiedSyncSet(values)

            message.success({
              key: STORAGE_MESSAGE_KEY,
              content: 'Saved'
            })

            if (!_.isNull(setPageMode)) {
              setPageMode(PAGE_MODE.DO_COPY)
            }
          } catch (error) {
            err = error
          }
        }

        handleError(err)
      })
  }

  return (
    <Form
      layout='vertical'
      onSubmit={handleSubmit}
    >
      <Form.Item label='Target tab:'>
        <AntdFormField
          form={form}
          name={TARGET_TAB_TYPE_KEY}
          option={{
            initialValue: target[TARGET_TAB_TYPE_KEY],
            rules: [
              {
                required: true,
                message: 'Please input your target tab type!'
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
          form={form}
          name={TARGET_CONTENT_TYPE_KEY}
          option={{
            initialValue: target[TARGET_CONTENT_TYPE_KEY],
            rules: [
              {
                required: true,
                message: 'Please input your target content type!'
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
          Save settings
      </Button>
    </Form>
  )
}

export const WrappedOptionsForm = Form.create({ name: OPTIONS_FORM_NAME })(OptionsForm)
