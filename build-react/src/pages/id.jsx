import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Navbar from "../compoments/navbar.jsx";
import QuoteRenderer from "../compoments/quoteRenderer.jsx";

import * as config from "../config.js";

const ErrorLayover = styled.div`
    font-family: "Tahoma", sans-serif;
    text-align: center;
    background-color: #ffaaaa;
    margin: auto;
    padding: 10px;
`

export default function Id () {
    const ID = useParams().id;
    const [QUOTE, updateQuote] = React.useState(null);
    const [error, updateError] = React.useState(false);
    const [errorMessage, updateErrorMessage] = React.useState("Unable to load quote.");
    
    async function getQuote () {
        let res, errorObj;
        try {
            res = await fetch(`${config.API_HOST}/quotemaster/id/${ID}`);
            if (!res.ok) {
                updateError(true);
                if (res.status == 400) {
                    errorObj = await res.json();
                    updateErrorMessage(errorObj.errorMessage);
                } else {
                    updateErrorMessage("Unable to load quote.");
                }
            } else {
                updateQuote(await res.json());
            }
        } catch {
            updateError(true);
            updateErrorMessage("Unable to load quote.");
        }
    }

    React.useEffect(() => {getQuote()},[]);
    
    return (
        <div>
            <Navbar />
            {error ? (
                <ErrorLayover>
                    <p>{errorMessage}</p>
                    <button onClick={getQuote}>Retry</button>
                </ErrorLayover>
            ) : (
                <div>
                    <QuoteRenderer quote={QUOTE} />
                </div>
            )}
        </div>
    )
}