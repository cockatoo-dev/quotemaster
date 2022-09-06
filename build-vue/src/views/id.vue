<script setup>
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";

    import * as config from "../config.js";
    import Navbar from "../components/navbar.vue";
    import quoteRenderer from "../components/quoteRenderer.vue";

    const ROUTE = useRoute();
    const ID = ROUTE.params.id;
    const QUOTE = ref(null);
    const error = ref(false);
    const errorMessage = ref("Unable to load quote.");


    async function getQuote () {
        let res, errorObj;
        try {
            res = await fetch(`${config.API_HOST}/quotemaster/id/${ID}`);
            if (!res.ok) {
                error.value = true;
                if (res.status == 400) {
                    errorObj = await res.json();
                    errorMessage.value = errorObj.errorMessage;
                } else {
                    errorMessage.value = "Unable to load quote.";
                }
            } else {
                QUOTE.value = await res.json();
            }
        } catch {
            error.value = true;
            errorMessage.value = "Unable to load quote.";
        }
    }

    onMounted(getQuote);
</script>

<template>
    <Navbar />
    <div id="error-layover" v-if="error">
        <p>{{errorMessage}}</p>
        <div class="button-container">
            <button @click="getQuote">Retry</button>
        </div>
    </div>
    <div id="quote-display" v-else>
        <quoteRenderer :quote="QUOTE" />
    </div>
</template>

<style scoped>
    .button-container {
        text-align: center;
    }
    #error-layover {
        background-color: #ffaaaa;
        margin: auto;
        padding:10px;
        text-align: center;
    }
</style>
