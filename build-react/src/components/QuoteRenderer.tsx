import styled from "styled-components"

import { useEffect, useState } from "react"
import { apiQuoteType } from "../utils/types"
import { API_HOST, HOST } from "../utils/config"

const Placeholder = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 0px;
`
const QuoteBody = styled.p`
  font-family: "Open Sans", sans-serif;
  text-align: justify;
  text-indent: 2em;
`
const QuoteName = styled.p`
  font-family: "Open Sans", sans-serif;
  text-align: right;
  font-style: italic;
`
const QuoteActions = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`
const ShareHeader = styled.p`
  font-family: "Open Sans", sans-serif;
  margin-bottom: 0px;
`
const ShareLinkBox = styled.input`
  width: 354px;
  padding:2px;
  border-width:1px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
`

type propsType = {
  quote: apiQuoteType | null
}

export default function QuoteRenderer (props: propsType) {
  const [likeToggle, likeToggleUpdate] = useState(false)
  const [likeSuccess, likeSuccessUpdate] = useState(false)
  const [shareToggle, shareToggleUpdate] = useState(false)
  const [shareLink, shareLinkUpdate] = useState("")

  const newQuoteState = () => {
    likeToggleUpdate(false)
    likeSuccessUpdate(false)
    shareToggleUpdate(false)
    if (props.quote != null) {
      shareLinkUpdate(`${HOST}/id/${props.quote.id}`)
    }
  }
  
  const likeQuote = async () => {
    if (!props.quote) {
      return
    }

    likeToggleUpdate(true)
    const reqObj = {
      id: props.quote.id
    }
    let res;
    try {
      res = await fetch(`${API_HOST}/like`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqObj),
      });
      if (res.ok) {
        likeSuccessUpdate(true)
      } else {
        likeToggleUpdate(false)
      }
    } catch {
      likeToggleUpdate(false)
    }
  }

  useEffect(newQuoteState, [props.quote])

  if (props.quote == null) {
    return <Placeholder>Loading quote...</Placeholder>
  } else { 
    return (
      <div>
        <QuoteBody>{props.quote.quote}</QuoteBody>
        <QuoteName>- {props.quote.name}</QuoteName>
        <QuoteActions>
          <div className="button-container">
            <button 
              disabled={likeToggle} 
              onClick={likeQuote}
            >
              {likeSuccess ? "Liked" : "Like"} this quote
            </button>
          </div>
          <div className="button-container">
            <button 
              disabled={shareToggle} 
              onClick={() => {shareToggleUpdate(true)}}
            >
              Share this quote
            </button>
          </div>
        </QuoteActions>
        {shareToggle && (<div>
          <ShareHeader>Copy this link to share:</ShareHeader>
          <ShareLinkBox type="text" value={shareLink} disabled />
        </div>)}
      </div>
    )
  }
}
