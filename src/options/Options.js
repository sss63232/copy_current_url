import React from 'react'
import './Options.css'
import { Radio } from 'antd'
import { promisifiedSyncSet, promisifiedSyncGet } from '../browserApiHelpers/storageHelper'
import { TARGET_TAB_TYPE_KEY, TARGET_TAB_TYPE } from '../constants/tab'

const changeTargetTabTypeHandler = e => {
  const targetValue = e.target.value
  const storingData = {
    [TARGET_TAB_TYPE_KEY]: targetValue
  }
  promisifiedSyncSet(storingData).then(() => {
    console.log('set OK')
    promisifiedSyncGet([TARGET_TAB_TYPE_KEY]).then(result => {
      console.log('TCL: ------------------')
      console.log('TCL: result', result)
      console.log('TCL: ------------------')
    })
  })
}

const Options = props => {
  return (
    <div className='App'>
      Copy:
      <Radio.Group
        buttonStyle='solid'
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
    </div>
  )
}

export default Options
