import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Result, Tag, Divider } from 'antd'

const renderMarkdown = (mdString = '') => <ReactMarkdown source={mdString} />

const Success = props => {
  const {
    copiedLink,
    target: {
      targetTabType,
      targetContentType
    }
  } = props

  const mdRenderedLink = renderMarkdown(copiedLink)

  return (
    <div>
      <Result
        status='success'
        title={(
          <>
            <div>Successfully Copied</div>
            <Tag color='cyan'>{targetTabType}</Tag>
            <Tag color='cyan'>{targetContentType}</Tag>
          </>
        )}
        subTitle='Also saved into your clipboard so you can simply paste it anywhere right now.'
        extra={
          <div>
            <Divider />
            <h2>Source code in clipboard</h2>
            <span>{copiedLink}</span>
            <h2>Will be rendered as </h2>
            {mdRenderedLink}
          </div>
        }
      />
    </div>
  )
}

export default Success
