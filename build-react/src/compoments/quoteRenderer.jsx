import React from "react";
import styled from "styled-components";

import * as config from "../config.js";

const Placeholder = styled.p`
    font-family: "Tahoma", sans-serif;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin: 0px;
`
const QuoteBody = styled.p`
    font-family: "Tahoma", sans-serif;
    text-align: justify;
    text-indent: 2em;
`
const QuoteName = styled.p`
    font-family: "Tahoma", sans-serif;
    text-align: right;
    font-style: italic;
`
const QuoteActions = styled.div`
    display: grid;
    grid-template-columns: auto auto;
`
const ShareHeader = styled.p`
    font-family: "Tahoma", sans-serif;
    margin-bottom: 0px;
`
const ShareLinkBox = styled.input`
    width: 354px;
    padding:2px;
    border-width:1px;
    font-family: "Tahoma", sans-serif;
    font-size: 16px;
`


// function resetState (
//     quote, likeToggleUpdate, likeSuccessUpdate, shareToggleUpdate, shareLinkUpdate
// ) {
//     likeToggleUpdate(false);
//     likeSuccessUpdate(false);
//     shareToggleUpdate(false);
//     if (quote != null) {
//         shareLinkUpdate(`${config.HOST}/id/${quote.id}`);
//     }
// }

export default function QuoteRenderer (props) {
    const [likeToggle, likeToggleUpdate] = React.useState(false);
    const [likeSuccess, likeSuccessUpdate] = React.useState(false);
    const [shareToggle, shareToggleUpdate] = React.useState(false);
    const [shareLink, shareLinkUpdate] = React.useState("");

    function newQuoteState () {
        likeToggleUpdate(false);
        likeSuccessUpdate(false);
        shareToggleUpdate(false);
        if (props.quote != null) {
            shareLinkUpdate(`${config.HOST}/id/${props.quote.id}`);
        }
    }
    
    async function likeQuote () {
        likeToggleUpdate(true);
        let reqObj = {
            id: props.quote.id
        }
        let res;
        try {
            res = await fetch(`${config.API_HOST}/quotemaster/like`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqObj),
            });
            if (res.ok) {
                likeSuccessUpdate(true);
            } else {
                likeToggleUpdate(false);
            }
        } catch {
            likeToggleUpdate(false);
        }
    }

    React.useEffect(newQuoteState, [props.quote]);

    if (props.quote == null) { return (
        <Placeholder>Loading quote...</Placeholder>
    )} else { return (
        <div>
            <QuoteBody>{props.quote.quote}</QuoteBody>
            <QuoteName>- {props.quote.name}</QuoteName>
            <QuoteActions>
                <div className="button-container">
                    <button disabled={likeToggle} onClick={likeQuote}>{likeSuccess ? "Liked" : "Like"} this quote</button>
                </div>
                <div className="button-container">
                    <button disabled={shareToggle} onClick={() => {shareToggleUpdate(true)}}>Share this quote</button>
                </div>
            </QuoteActions>
            {shareToggle ? (
                <div>
                    <ShareHeader>Copy this link to share:</ShareHeader>
                    <ShareLinkBox type="text" value={shareLink} disabled></ShareLinkBox> 
                </div>
            ) : <div></div>}
        </div>
    )}
}