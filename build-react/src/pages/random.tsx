import { useEffect, useState } from "react"
import styled from "styled-components"
import { API_HOST } from "../utils/config"
import NavBar from "../components/NavBar"
import QuoteRenderer from "../components/QuoteRenderer"

const ErrorLayover = styled.div`
  font-family: "Open Sans", sans-serif;
  text-align: center;
  background-color: #ffaaaa;
  margin: auto;
  padding: 10px;
`
const ReloadButton = styled.button`
  margin-top: 10px;
`

export default function Random () {
  const [quote, updateQuote] = useState(null)
  const [error, updateError] = useState(false)
  
  const getQuote = async () => {
    updateQuote(null)
    updateError(false)

    try {
      const res = await fetch(`${API_HOST}/random`)
      if (!res.ok) {
        updateError(true)
      } else {
        updateQuote(await res.json())
      }
    } catch {
      updateError(true)
    }
  }

  useEffect(() => {getQuote()}, [])

  return (
    <div>
      <NavBar />
      {error ? (
        <ErrorLayover>
          <p>Unable to load quote.</p>
          <button onClick={getQuote}>Retry</button>
        </ErrorLayover>
      ) : (
        <div>
          <QuoteRenderer quote={quote} />
          <div className="button-container">
            <ReloadButton onClick={getQuote}>Get another quote</ReloadButton>
          </div>
        </div>
      )}
    </div>
  )
}
