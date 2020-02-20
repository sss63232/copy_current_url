import { useState, useEffect } from 'react'
import { getTargetFromChromeSync } from '../popup/Popup'

const useGetSyncTarget = () => {
  const [target, setTarget] = useState({})

  useEffect(
    () => {
      const initTarget = async () => {
        try {
          const savedTarget = await getTargetFromChromeSync()
          setTarget(savedTarget)
        } catch (error) {

        }
      }

      initTarget()
    },
    []
  )

  return target
}

export default useGetSyncTarget
