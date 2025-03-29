import { useEffect, useState } from "react"
import { apiQuoteType } from "../utils/types"
import { API_HOST, HOST } from "../utils/config"
import { Button, Input } from "@heroui/react"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import HIHeart from "../icons/HIHeart"
import HIShare from "../icons/HIShare"
import HIDocumentDuplicate from "../icons/HIDocumentDuplicate"

type propsType = {
  quote: apiQuoteType | null
}

export default function QuoteRenderer (props: propsType) {
  const [likeToggle, likeToggleUpdate] = useState(false)
  const [likeSuccess, likeSuccessUpdate] = useState(false)
  const [shareToggle, shareToggleUpdate] = useState(false)
  const [shareLink, shareLinkUpdate] = useState("")

  const copy = useCopyToClipboard()[1]
  const [copyToggle, copyToggleUpdate] = useState(false)

  const copyShareLink = async () => {
    await copy(shareLink)
    copyToggleUpdate(true)
    setTimeout(() => {
      copyToggleUpdate(false)
    }, 2000);
  }

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
 
  return (
    <div>
      {props.quote === null ? (
        <div>
          <p className="pt-2 text-2xl text-center font-bold">Loading quote...</p>
        </div>
      ) : (
        <div>
          <p className="pt-4 pb-2 text-justify indent-12">{props.quote.quote}</p>
          <p className="pt-2 pb-4 text-right italic">- {props.quote.name}</p>
          <div className="sm:grid sm:grid-cols-2 py-2">
            <div className="pb-1 sm:pb-0 sm:pr-0.5">
              <Button
                isDisabled={likeToggle}
                color="primary"
                className="w-full text-base font-bold"
                onPress={likeQuote}
                startContent={<HIHeart />}
              >
                {likeSuccess ? 'Liked this quote' : 'Like this quote'}
              </Button>
            </div>
            <div className="pb-1 sm:pb-0 sm:pl-0.5">
              <Button
                isDisabled={shareToggle}
                color="secondary"
                className="w-full text-base font-bold"
                onPress={() => {shareToggleUpdate(true)}}
                startContent={<HIShare />}
              >
                Share this quote
              </Button>
            </div>
          </div>
        </div>
      )}
      {shareToggle && (
        <div className="pt-1 pb-2">
          <p>Copy this link to share:</p>
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
                color="primary"
                className="text-base font-bold"
                onPress={copyShareLink}
                startContent={<HIDocumentDuplicate />}
              >
                {copyToggle ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

