import { useState, useRef } from 'react'

export const BEFORE = 'before'
export const PENDING = 'pending'
export const FULFILLED = 'fulfilled'
export const REJECTED = 'rejected'

const useAsync = (fn) => {
  let currentPromise = useRef(null)
  const [state, setState] = useState({
    status: BEFORE,
    result: undefined,
  })

  return [
    state,
    async function() {
      setState(prev => ({
        ...prev,
        status: PENDING,
      }))
      let prom = fn(...arguments)
      currentPromise.current = prom
      try {
        let result = await prom
        if (prom !== currentPromise.current) {
          return
        }
        setState({
          status: FULFILLED,
          result: result,
        })
      } catch (e) {
        if (prom !== currentPromise.current) {
          return
        }
        setState({
          status: REJECTED,
          result: e,
        })
      }
      return prom
    },
  ]
}

export default useAsync