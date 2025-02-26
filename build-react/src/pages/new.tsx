import { FormEvent, ReactElement, useState } from "react"
import styled from "styled-components"
import { API_HOST, HOST } from "../utils/config"
import NavBar from "../components/NavBar"

const BoxText = styled.p`
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  margin: 0px;
`
const ErrorBox = styled.div`
  background-color: #ffaaaa;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`
const SuccessBox = styled.div`
  background-color: #aaffaa;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`
const SubmitActions = styled.div`
  display:grid;
  grid-template-columns: auto auto;
  padding-top: 10px;
`

const ShareHeader = styled.p`
  font-family: "Open Sans", sans-serif;
  margin-bottom: 0px;
`
const ShareLinkBox = styled.input`
  width: 334px;
  padding:2px;
  border-width:1px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
`
const WarningBox = styled.div`
  background-color: #ffffaa;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`
const WarningTitle = styled.h2`
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-top:0px;
  margin-bottom: 5px;
`
const WarningText = styled.p`
  font-family: "Open Sans", sans-serif;
  margin: 0px;
`
const FormLabel = styled.label`
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
`
const QuoteTextarea = styled.textarea`
  width: 354px;
  padding:2px;
  border-width:1px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
`
const NameInput = styled.input`
  width: 354px;
  padding:2px;
  border-width:1px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
`
const CharLimit = styled.p`
  font-family: "Open Sans", sans-serif;
  text-align: right;
  margin-top: 0px;
`
export default function New_ () {
  const [quote, updateQuote] = useState("")
  const [name, updateName] = useState("")
  const [submitToggle, updateSubmitToggle] = useState(false)
  const [submitError, updateSubmitError] = useState(false)
  const [submitSuccess, updateSubmitSuccess] = useState(false)
  const [errorMessage, updateErrorMessage] = useState("")
  const [shareToggle, updateShareToggle] = useState(false)
  const [shareLink, updateShareLink] = useState("")

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

  let messageBox: ReactElement

  if (submitError) {
    messageBox = (
      <ErrorBox>
        <BoxText>{errorMessage}</BoxText>
      </ErrorBox>
    )
  } else if (submitSuccess) {
    messageBox = (
      <SuccessBox>
        <BoxText>Quote submitted!</BoxText>
        <SubmitActions>
          <div className="button-container">
            <button 
              disabled={shareToggle} 
              onClick={() => {updateShareToggle(true)}}
            >
              Share this quote
            </button>
          </div>
          <div className="button-container">
            <button onClick={reset}>Write another quote</button>
          </div>
        </SubmitActions>
          {shareToggle && (<div>
            <ShareHeader>Copy this link to share:</ShareHeader>
            <ShareLinkBox type="text" value={shareLink} disabled /> 
          </div>)}
      </SuccessBox>
    )
  } else {
    messageBox = (
      <WarningBox>
        <WarningTitle>Warning</WarningTitle>
        <WarningText>
          Anything you submit here is publicly viewable. Do not submit any personal or sensitive information.
        </WarningText>
      </WarningBox>
    )
  }

  return (
    <div>
      <NavBar />
      {messageBox}
      <form onSubmit={submitQuote}>
        <FormLabel htmlFor="quote">Your quote</FormLabel>
        <QuoteTextarea 
          id="quote" 
          name="quote" 
          rows={4}
          disabled={submitToggle} 
          value={quote} 
          onChange={(e) => {updateQuote(e.target.value)}}
        />
        <CharLimit className={`${quote.length > 400 ? "warn" : ""}`}>{quote.length}/400</CharLimit>
        <FormLabel htmlFor="name">Your name</FormLabel>
        <NameInput 
          id="name" 
          name="name" 
          disabled={submitToggle} 
          value={name} 
          onChange={(e) => {updateName(e.target.value)}}
        />
        <CharLimit className={`${name.length > 40 ? "warn" : ""}`}>{name.length}/40</CharLimit>
        <button type="submit" disabled={submitToggle}>Submit quote</button>
      </form>
    </div>
  )
}
