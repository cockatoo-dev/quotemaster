import { useParams } from "react-router"
import { useCallback, useEffect, useState } from "react"
import NavBar from "../components/NavBar.js"
import QuoteRenderer from "../components/QuoteRenderer"
import { apiErrorType, apiQuoteType } from "../utils/types"
import { API_HOST } from "../utils/config"
import { Alert, Button } from "@heroui/react"

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
        <Alert 
          hideIcon
          color="danger"
          variant="faded"
          classNames={{mainWrapper: 'ms-0', title: 'pb-1 text-base text-center', description: 'mx-auto'}}
          title={errorMessage}
          description={
            <div>
              <Button
                color='danger'
                className='text-base font-bold'
                onPress={getQuote}
              >
                Retry
              </Button>
            </div>
          }
        />
      ) : (
        <div>
          <QuoteRenderer quote={quote} />
        </div>
      )}
    </div>
  )
}
