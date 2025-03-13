import { useParams } from "react-router"
import styled from "styled-components"
import { useCallback, useEffect, useState } from "react"
import NavBar from "../components/NavBar.js"
import QuoteRenderer from "../components/QuoteRenderer"
import { apiErrorType, apiQuoteType } from "../utils/types"
import { API_HOST } from "../utils/config"

const ErrorLayover = styled.div`
  font-family: "Open Sans", sans-serif;
  text-align: center;
  background-color: #ffaaaa;
  margin: auto;
  padding: 10px;
`

export default function Id () {
  const id = useParams().id
  const [quote, updateQuote] = useState<apiQuoteType | null>(null)
  const [error, updateError] = useState(false)
  const [errorMessage, updateErrorMessage] = useState("Unable to load quote.")
  
  const getQuote = useCallback(async () => {
    try {
      const res = await fetch(`${API_HOST}/id?id=${id}`)
      if (!res.ok) {
        updateError(true)
        if (res.status === 400) {
          const errorObj = await res.json() as apiErrorType
          updateErrorMessage(errorObj.message)
        } else {
          updateErrorMessage("Unable to load quote.")
        }
      } else {
        updateQuote(await res.json() as apiQuoteType)
      }
    } catch {
      updateError(true)
      updateErrorMessage("Unable to load quote.")
    }
  }, [id])

  useEffect(() => {getQuote()},[getQuote])
  
  return (
    <div>
      <NavBar />
      {error ? (
        <ErrorLayover>
          <p>{errorMessage}</p>
          <button onClick={getQuote}>Retry</button>
        </ErrorLayover>
      ) : (
        <div>
          <QuoteRenderer quote={quote} />
        </div>
      )}
    </div>
  )
}
