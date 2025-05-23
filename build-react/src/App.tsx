import { useEffect, useState } from 'react'
import { API_HOST } from './utils/config'
import { RouterView } from './router'
import { Alert, Button, Link } from '@heroui/react'
import { useMediaQuery } from '@uidotdev/usehooks'
import HICodeBracket from './icons/HICodeBracket'
import HIArrowPath from './icons/HIArrowPath'

function App () {
  const [apiOnline, apiOnlineUpdate] = useState(true)

  const doHandshake = async () => {
    let handshake;
    try {
      handshake = await fetch(`${API_HOST}/handshake`)
      if (handshake.ok) {
        apiOnlineUpdate(true)
      } else {
        apiOnlineUpdate(false)
      }
    } catch {
      apiOnlineUpdate(false)
    }
  }

  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {doHandshake()}, [])

  return (
    <div className="w-11/12 max-w-[640px] mx-auto">
      <div className="p-1">
        <h1 className="py-2 text-center text-4xl font-bold">Quotemaster</h1>
        <p className="pb-1 text-center">React build v1.0.0</p>
        <div className='text-center'>
          <Button
            color="primary"
            variant="light"
            className="text-base"
            as={Link}
            href="https://github.com/cockatoo-dev/quotemaster/"
            target='_blank'
            rel="noreferrer noopener"
            startContent={<HICodeBracket />}
          >
            View source on Github
          </Button>
        </div>
      </div>
      
      {apiOnline ? (
        <div className='pt-1'>
          <RouterView />
        </div>
      ) : (
        <div className='py-1'>
          <Alert 
            hideIcon
            color="danger"
            variant='faded'
            classNames={{mainWrapper: 'ms-0', title: 'pb-1 text-base text-center font-normal', description: 'mx-auto'}}
            title="Unable to reach API server."
            description={
              <div>
                <Button
                  color='danger'
                  className='text-base font-bold'
                  onPress={doHandshake}
                  startContent={<HIArrowPath />}
                >
                  Retry
                </Button>
              </div>
            }
          />
        </div>
      )}
    </div>
  )
}

export default App
