import { useEffect, useState } from 'react'
import './style.css'
import styled from 'styled-components'
import { API_HOST } from './utils/config'
import { RouterView } from './router'

const Header = styled.h1`
  font-family: "Open Sans", sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  line-height: 16px;
`
const BuildInfo = styled.p`
  font-family: "Open Sans", sans-serif;
  text-align: center;
`
const ContentArea = styled.div`
  width: 360px;
  margin: 0 auto;
`
const NoApi = styled.div`
  width: 340px;
  padding: 10px;
  align-items: center;
  background-color: #ffaaaa;
  margin: auto;
  font-family: "Open Sans", sans-serif;
  text-align: center;
`

function App() {
  const [apiOnline, apiOnlineUpdate] = useState(true)

  async function doHandshake () {
    let handshake;
    try {
      handshake = await fetch(`${API_HOST}/handshake`)
      console.log(handshake.ok)
      if (handshake.ok) {
        apiOnlineUpdate(true)
      } else {
        apiOnlineUpdate(false)
      }
    } catch {
      apiOnlineUpdate(false)
    }
  }

  useEffect(() => {doHandshake()}, [])

  return (
    <div>
      <Header>Quotemaster</Header>
      <BuildInfo>React build v0.2.0</BuildInfo>
      <BuildInfo>
        <a 
          href="https://github.com/cockatoo-dev/quotemaster/"
          rel="noreferrer noopener"
        >
          View source on Github
        </a>
      </BuildInfo>
      
      {apiOnline ? (
        <ContentArea>
          <RouterView />
        </ContentArea>
      ) : (
        <NoApi>
          <p>Unable to reach API server.</p>
          <div className="button-container">
            <button onClick={() => {doHandshake()}}>Retry</button>
          </div>
        </NoApi>
      )}
    </div>
  )
}

export default App
