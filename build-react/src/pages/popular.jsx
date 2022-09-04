import React from "react";
import styled from "styled-components";

import Navbar from "../compoments/navbar"
import QuoteRenderer from "../compoments/quoteRenderer.jsx";

import * as config from "../config.js";

const ErrorLayover = styled.div`
    font-family: "Tahoma", sans-serif;
    text-align: center;
    background-color: #ffaaaa;
    margin: auto;
    padding: 10px;
`
const ReloadButton = styled.button`
    margin-top: 10px;
`


export default function Popular () {
    const [QUOTE, updateQuote] = React.useState(null);
    const [error, updateError] = React.useState(false);
    
    async function getQuote () {
        updateQuote(null);
        updateError(false);

        let res;
        try {
            res = await fetch(`${config.API_HOST}/quotemaster/popular`);
            if (!res.ok) {
                updateError(true);
            } else {
                updateQuote(await res.json());
            }
        } catch {
            updateError(true);
        }
    }

    React.useEffect(() => {getQuote()}, []);

    return (
        <div>
            <Navbar />
            {error ? (
                <ErrorLayover>
                    <p>Unable to load quote.</p>
                    <button onClick={getQuote}>Retry</button>
                </ErrorLayover>
            ) : (
                <div>
                    <QuoteRenderer quote={QUOTE} />
                    <div className="button-container">
                        <ReloadButton onClick={getQuote}>Get another quote</ReloadButton>
                    </div>
                </div>
            )}
        </div>
    )
}
