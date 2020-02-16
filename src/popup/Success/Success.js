import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Result } from 'antd'

const renderMarkdown = (mdString = '') => <ReactMarkdown source={mdString} />

const Success = props => {
  const {
    type,
    copiedLink
  } = props

  const mdRenderedLink = renderMarkdown(copiedLink)

  return (
    <div>
      current type is {type}
      <Result
        status='success'
        title='Successfully Copied the URL'
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
