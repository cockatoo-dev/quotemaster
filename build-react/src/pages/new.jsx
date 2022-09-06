import React from "react";
import styled from "styled-components";

import Navbar from "../compoments/navbar"

import * as config from "../config.js";

const BoxText = styled.p`
    font-family: "Tahoma", sans-serif;
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
const WarningBox = styled.div`
    background-color: #ffffaa;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
`
const WarningTitle = styled.h2`
    font-family: "Tahoma", sans-serif;
    font-size: 16px;
    font-weight: bold;
    margin-top:0px;
    margin-bottom: 5px;
`
const WarningText = styled.p`
    font-family: "Tahoma", sans-serif;
    margin: 0px;
`
const FormLabel = styled.label`
    font-family: "Tahoma", sans-serif;
    font-weight: bold;
`
const QuoteTextarea = styled.textarea`
    width: 354px;
    padding:2px;
    border-width:1px;
    font-family: "Tahoma", sans-serif;
    font-size: 16px;
`
const NameInput = styled.input`
    width: 354px;
    padding:2px;
    border-width:1px;
    font-family: "Tahoma", sans-serif;
    font-size: 16px;
`
const CharLimit = styled.p`
    font-family: "Tahoma", sans-serif;
    text-align: right;
    margin-top: 0px;
`
export default function New_ () {
    const [quote, updateQuote] = React.useState("");
    const [name, updateName] = React.useState("");
    const [submitToggle, updateSubmitToggle] = React.useState(false);
    const [submitError, updateSubmitError] = React.useState(false);
    const [submitSuccess, updateSubmitSuccess] = React.useState(false);
    const [errorMessage, updateErrorMessage] = React.useState("");
    const [shareToggle, updateShareToggle] = React.useState(false);
    const [shareLink, updateShareLink] = React.useState("");

    let messageBox;

    async function submitQuote () {
        updateSubmitToggle(true);
        updateSubmitError(false);
        
        if (quote == "") {
            updateErrorMessage("Please enter a quote.");
            updateSubmitError(true);
        } else if (name.value == "") {
            updateErrorMessage("Please enter a name.");
            updateSubmitError(true);
        } else if (quote.value.length > 400) {
            updateErrorMessage("Quote should be less than 400 characters long.");
            updateSubmitError(true);
        } else if (name.value.length > 40) {
            updateErrorMessage("Name should be less than 40 characters long.");
            updateSubmitError(true);
        }
        if (submitError) {
            updateSubmitToggle(false);
            return;
        }

        let reqObj = {
            quote: quote,
            name: name
        }
        let resObj;
        try {
            let res = await fetch(`${config.API_HOST}/quotemaster/new`,{
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqObj),
            });
            if (res.status == 400) {
                resObj = await res.json();
                updateErrorMessage(resObj.errorMessage);
                updateSubmitError(true);
            } else if (res.ok) {
                resObj = await res.json();
                updateShareLink(`${config.HOST}/id/${resObj.id}`);
                updateSubmitSuccess(true);
            } else {
                updateErrorMessage("Unable to submit quote.");
                updateSubmitError(true);
            }
        } catch {
            updateErrorMessage("Unable to submit quote.");
            updateSubmitError(true);
        }
    }

    function reset () {
        updateQuote("");
        updateName("");
        updateSubmitToggle(false);
        updateSubmitSuccess(false);
        updateShareToggle(false);
    }
    
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
                        <button>Share this quote</button>
                    </div>
                    <div className="button-container">
                        <button>Write another quote</button>
                    </div>
                </SubmitActions>
                {shareToggle ? (
                    <div>
                        <ShareHeader>Copy this link to share:</ShareHeader>
                        <ShareLinkBox type="text" value={shareLink} disabled></ShareLinkBox> 
                    </div>
                ) : <div></div>}
            </SuccessBox>
        )
    } else {
        messageBox = (
            <WarningBox>
                <WarningTitle>Warning</WarningTitle>
                <WarningText>Anything you submit here is publicly viewable. Do not submit any personal or sensitive information.</WarningText>
            </WarningBox>
        )
    }

    return (
        <div>
            <Navbar />
            {messageBox}
            <form>
                <FormLabel for="quote">Your quote</FormLabel>
                <QuoteTextarea id="quote" rows="4"></QuoteTextarea>
                <CharLimit>/400</CharLimit>
                <FormLabel for="name">Your name</FormLabel>
                <NameInput id="name"></NameInput>
                <CharLimit>/40</CharLimit>
                <button type="submit">Submit quote</button>
            </form>
        </div>
    )
}
