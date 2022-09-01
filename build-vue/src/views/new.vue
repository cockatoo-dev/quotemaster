<script setup>
    import { ref } from "vue";

    import * as config from "../config.js";

    let quote = ref("");
    let name = ref("");
    let submitToggle = ref(false);
    let submitError = ref(false);
    let submitSuccess = ref(false);
    let errorMessage = ref("");
    let shareToggle = ref(false);
    let shareLink = ref("");

    async function submitQuote () {
        submitToggle.value = true;
        submitError.value = false;
        
        if (quote.value == "") {
            errorMessage.value = "Please enter a quote.";
            submitError.value = true;
        } else if (name.value == "") {
            errorMessage.value = "Please enter a name.";
            submitError.value = true;
        } else if (quote.value.length > 400) {
            errorMessage.value = "Quote should be less than 400 characters long.";
            submitError.value = true;
        } else if (name.value.length > 40) {
            errorMessage.value = "Name should be less than 40 characters long.";
            submitError.value = true;
        }
        if (submitError.value) {
            submitToggle.value = false;
            return;
        }

        let reqObj = {
            quote: quote.value,
            name: name.value
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
                errorMessage.value = resObj.errorMessage;
                submitError.value = true;
            } else if (res.ok) {
                resObj = await res.json();
                shareLink.value = `${config.HOST}/id/${resObj.id}`
                submitSuccess.value = true;
            } else {
                errorMessage.value = "Unable to submit quote.";
                submitError.value = true;
            }
        } catch {
            errorMessage.value = "Unable to submit quote.";
            submitError.value = true;
        }
    }

    function reset () {
        quote.value = "";
        name.value = "";
        submitToggle.value = false;
        submitSuccess.value = false;
    }
</script>

<template>
    <div id="warning">
        <h2>Warning</h2>
        <p>Anything you submit here is publicly viewable. Do not submit any personal or sensitive information.</p>
    </div>

    <form>
        <label for="quote">Your quote</label>
        <textarea id="quote" rows="4" v-model="quote" :disabled="submitToggle"></textarea>
        <p class="char-limit" :class="{warn:quote.length > 400}">{{quote.length}}/400</p>

        <label for="name">Your name</label>
        <input type="text" id="name" v-model="name" :disabled="submitToggle">
        <p class="char-limit" :class="{warn:name.length > 40}">{{name.length}}/40</p>

        <button type="submit" @click.prevent="submitQuote" :disabled="submitToggle">Submit!</button>
    </form>

    <div id="submit-error" v-if="submitError">
        <p>{{errorMessage}}</p>
    </div>

    <div id="submit-success" v-if="submitSuccess">
        <p>Quote submitted!</p>

        <div id="submit-actions">
            <div>
                <button @click="shareToggle = true">Share this quote</button>
            </div>
            <div>
                <button @click="reset">Write another quote</button>
            </div>
        </div>

        <div id="share-link" v-if="shareToggle">
            <p>Copy this link to share:</p>
            <input type="text" :value="shareLink" disabled>
        </div>
    </div>
</template>

<style scoped>
    p, h2, label, input, textarea {
        font-family: "Tahoma", sans-serif;
    }
    #warning {
        background-color: #ffffaa;
        font-family: "Tahoma", sans-serif;
        padding: 10px;
        margin-bottom: 10px;
    }
    #warning h2 {
        font-size: 16px;
        font-weight: bold;
        margin-top:0px;
        margin-bottom: 5px;
    }
    #warning p {
        margin:0px;
    }
    #quote {
        width: 354px;
        padding:2px;
        border-width:1px;
        font-size: 16px;
    }
    #name {
        width: 354px;
        padding:2px;
        border-width:1px;
        font-size: 16px;
    }
    label {
        font-weight: bold;
    }
    .char-limit {
        margin-top: 0px;
        text-align: right;
    }
    .warn {
        color:#ff0000;
    }
    #submit-error {
        background-color: #ffaaaa;
        padding: 10px;
        margin-top: 10px;
    }
    #submit-error p {
        font-weight: bold;
        margin: 0px;
    }
    #submit-success {
        background-color: #aaffaa;
        padding: 10px;
        margin-top: 10px;
    }
    #submit-success p {
        font-weight: bold;
        margin: 0px;
    }
    #submit-actions {
        display:grid;
        grid-template-columns: 1fr 1fr;
        padding-top: 10px;
    }
    #submit-actions div {
        margin: auto;
    }
    #share-link {
        align-items: center;
        margin-top: 10px;
    }
    #share-link p {
        font-weight: normal;
    }
    #share-link input {
        width: 334px;
        padding:2px;
        border-width:1px;
        font-family: "Tahoma", sans-serif;
        font-size: 16px;
    }
</style>