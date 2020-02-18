import React from 'react'

const AntdFormField = props => {
  const {
    form,
    name,
    option,
    children
  } = props

  const { getFieldDecorator } = form

  return (
    <>
      {
        getFieldDecorator(name, option)(children)
      }
    </>
  )
}

export default AntdFormField
