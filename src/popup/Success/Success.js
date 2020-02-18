import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Result, Tag } from 'antd'

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
            <span>Successfully Copied</span>
            <Tag color='cyan'>{targetTabType}</Tag>
            <Tag color='cyan'>{targetContentType}</Tag>
          </>
        )}
        subTitle='The URL has also been saved to your clipboard so you could simply paste it right now.'
        extra={
          <div>
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
