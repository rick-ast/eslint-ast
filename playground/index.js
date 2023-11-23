// eslint-disable-next-line local-rules/no-ahooks-req
import { useRequest } from 'ahooks'
import { useState } from 'react'

export const C = () => {
  const [foo, _setFoo] = useState()
  const [bar, _setBar] = useState()

  useRequest(
    async () => {
      return [foo, bar]
    },
    { refreshDeps: [bar, foo] },
  )
}
