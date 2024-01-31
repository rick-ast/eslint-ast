import { useRequest } from 'ahooks'
import { FC, useState } from 'react'

const App: FC = () => {
  const [count] = useState(0)

  const { data } = useRequest(
    async () => {
      return count + 1
    },
    { refreshDeps: [count] },
  )

  return <>{data}</>
}

export default App
