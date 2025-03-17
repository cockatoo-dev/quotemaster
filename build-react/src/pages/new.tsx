import { FormEvent, useState } from "react"
import { API_HOST, HOST } from "../utils/config"
import NavBar from "../components/NavBar"
import { Alert, Button, Input, Textarea } from "@heroui/react"
import { useCopyToClipboard } from "@uidotdev/usehooks"

export default function New_ () {
  const [quote, updateQuote] = useState("")
  const [name, updateName] = useState("")
  const [submitToggle, updateSubmitToggle] = useState(false)
  const [submitError, updateSubmitError] = useState(false)
  const [submitSuccess, updateSubmitSuccess] = useState(false)
  const [errorMessage, updateErrorMessage] = useState("")
  const [shareToggle, updateShareToggle] = useState(false)
  const [shareLink, updateShareLink] = useState("")

  const copy = useCopyToClipboard()[1]
  const [copyToggle, copyToggleUpdate] = useState(false)

  const copyShareLink = async () => {
    await copy(shareLink)
    copyToggleUpdate(true)
    setTimeout(() => {
      copyToggleUpdate(false)
    }, 2000);
  }


  const submitQuote = async (event: FormEvent<HTMLFormElement>) => {
    console.log("Submit")
    event.preventDefault()
    updateSubmitError(false)
    let submitErrorVar = false
    
    if (quote === "") {
      updateErrorMessage("Please enter a quote.")
      updateSubmitError(true)
      submitErrorVar = true
    } else if (name === "") {
      updateErrorMessage("Please enter a name.")
      updateSubmitError(true)
      submitErrorVar = true
    } else if (quote.length > 400) {
      updateErrorMessage("Quote should be less than 400 characters long.")
      updateSubmitError(true)
      submitErrorVar = true
    } else if (name.length > 40) {
      updateErrorMessage("Name should be less than 40 characters long.")
      updateSubmitError(true)
      submitErrorVar = true
    }
    if (submitErrorVar) {
      return
    }

    updateSubmitToggle(true)
    const reqObj = {
      quote: quote,
      name: name
    }
    let resObj
    try {
      const res = await fetch(`${API_HOST}/new`,{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqObj),
      })
      if (res.status === 400) {
        resObj = await res.json()
        updateErrorMessage(resObj.errorMessage)
        updateSubmitError(true)
        submitErrorVar = true
      } else if (res.ok) {
        resObj = await res.json()
        updateShareLink(`${HOST}/id/${resObj.id}`)
        updateSubmitSuccess(true)
      } else {
        updateErrorMessage("Unable to submit quote.")
        updateSubmitError(true)
        submitErrorVar = true
      }
    } catch {
      updateErrorMessage("Unable to submit quote.")
      updateSubmitError(true)
      submitErrorVar = true
    } finally {
      if (submitErrorVar) {
        updateSubmitToggle(false)
      }
    }
  }

  const reset = () => {
    updateQuote("")
    updateName("")
    updateSubmitToggle(false)
    updateSubmitSuccess(false)
    updateShareToggle(false)
  }

  return (
    <div>
      <NavBar />
      <div className="pb-1">
        {submitError ? (
          <Alert
            hideIcon
            color="danger"
            variant="faded"
            classNames={{mainWrapper: 'ms-0', title: 'text-base font-bold', description: 'text-base'}}
            title="Error"
            description={errorMessage}
          />
        ) : submitSuccess ? (
          <Alert 
            hideIcon
            color="success"
            variant="faded"
            classNames={{mainWrapper: 'ms-0', title: 'pb-2 text-base font-bold', description: 'w-full'}}
            title="Quote submitted!"
            description={<>
              <div className="sm:grid sm:grid-cols-2">
                <div className="pb-1 sm:pb-0 sm:pr-0.5">
                  <Button
                    color="success"
                    className="w-full text-base font-bold"
                    isDisabled={shareToggle}
                    onPress={() => {updateShareToggle(true)}}
                  >
                    Share this quote
                  </Button>
                </div>
                <div className="pb-1 sm:pb-0 sm:pl-0.5">
                  <Button
                    color="success"
                    className="w-full text-base font-bold"
                    onPress={reset}
                  >
                    Write another quote
                  </Button>
                </div>
              </div>
              {shareToggle && (
                <div className="pt-1 pb-2">
                  <p className="pt-1 text-base font-normal">Copy this link to share:</p>
                  <div className="grid grid-cols-[1fr_auto] pt-1">
                    <div>
                      <Input 
                        value={shareLink}
                        isDisabled
                        variant="bordered"
                        classNames={{base: 'w-full', input: 'text-base cursor-text pointer-events-auto'}}
                      />
                    </div>
                    <div className="pl-1">
                      <Button 
                        isDisabled={copyToggle}
                        color="success"
                        className="text-base font-bold"
                        onPress={copyShareLink}
                      >
                        {copyToggle ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>}
          />
        ) : (
          <Alert
            hideIcon
            color="warning"
            variant="faded"
            classNames={{mainWrapper: 'ms-0', title: 'text-base font-bold', description: 'text-base'}}
            title="Warning"
            description="Anything you submit here can be seen by anyone on the internet. Do not submit any personal or sensitive information."
          />
        )}
      </div>
      
      <form onSubmit={submitQuote}>
        <label htmlFor="quote" className="block font-bold py-1">Your Quote</label>
        <Textarea 
          id="quote"
          value={quote}
          onValueChange={updateQuote}
          isDisabled={submitToggle}
          autoComplete="off"
          rows={4}
          variant="bordered"
          classNames={{base: 'w-full', input: 'text-base'}}
        />
        <p className={`text-xs text-right transition-colors ${quote.length > 400 ? 'text-red-500 dark:text-red-400' : ''}`}>
          {quote.length}/400
        </p>
        
        <label htmlFor="name" className="block font-bold py-1">Your Name</label>
        <Input 
          id="name"
          value={name}
          onValueChange={updateName}
          isDisabled={submitToggle}
          autoComplete="off"
          variant="bordered"
          classNames={{base: 'w-full', input: 'text-base'}}
        />
        <p className={`text-xs text-right transition-colors ${name.length > 40 ? 'text-red-500 dark:text-red-400' : ''}`}>
          {name.length}/400
        </p>
        
        <div className="pt-1">
          <Button
            type="submit"
            isDisabled={submitToggle}
            color="primary"
            className="w-full text-base font-bold"
          >
            Submit Quote
          </Button>
        </div>
      </form>
    </div>
  )
}
