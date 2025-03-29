import { useEffect, useState } from "react"
import { API_HOST } from "../utils/config"
import NavBar from "../components/NavBar"
import QuoteRenderer from "../components/QuoteRenderer"
import { Alert, Button } from "@heroui/react"
import HIArrowPath from "../icons/HIArrowPath"

export default function Popular () {
  const [quote, updateQuote] = useState(null)
  const [error, updateError] = useState(false)
  
  const getQuote = async () => {
    updateQuote(null)
    updateError(false)

    try {
      const res = await fetch(`${API_HOST}/popular`)
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
        <Alert 
          hideIcon
          color="danger"
          variant="faded"
          classNames={{mainWrapper: 'ms-0', title: 'pb-1 text-base text-center font-normal', description: 'mx-auto'}}
          title="Unable to load quote."
          description={
            <div>
              <Button
                color='danger'
                className='text-base font-bold'
                onPress={getQuote}
                startContent={<HIArrowPath />}
              >
                Retry
              </Button>
            </div>
          }
        />
      ) : (
        <div>
          <QuoteRenderer quote={quote} />
          <div className="pb-1 text-center">
            <Button
              color="primary"
              variant="light"
              className="text-base"
              onPress={getQuote}
              startContent={<HIArrowPath />}
            >
              Get another quote
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
