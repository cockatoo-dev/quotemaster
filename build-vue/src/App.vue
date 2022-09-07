<script setup>
    import { ref, onMounted } from "vue";
    import { RouterView } from 'vue-router';
    import * as config from "./config.js";

    const apiOnline = ref(true);

    async function doHandshake () {
        let handshake;
        try {
            handshake = await fetch(`${config.API_HOST}/handshake`);
            if (handshake.ok) {
                apiOnline.value = true;
            } else {
                apiOnline.value = false;
            }
        } catch {
            apiOnline.value = false;
        }
    }
    
    onMounted(doHandshake);
</script>

<template>
    <div id="header">
        <h1>Quotemaster</h1>
        <p>Vue build v0.2.0</p>
        <p><a href="https://github.com/max8539/quotemaster/">View source on Github</a></p>
    </div>
    <div id="no-api" v-if="!apiOnline">
        <p>Unable to reach API server.</p>
        <div class="button-container">
            <button @click="doHandshake()">Retry</button>
        </div>
    </div>
    <div id="content" v-else>
        <RouterView />
    </div>
</template>

<style scoped>
    .button-container {
        text-align: center;
    }
    #header h1 {
        font-weight: bold;
        font-size: 32px;
        text-align: center;
        line-height: 16px;
    }
    #header p {
        text-align: center;
    }
    #no-api {
        width: 340px;
        margin: auto;
        padding: 10px;
        text-align: center;
        background-color: #ffaaaa;
    }
    #content {
        width: 360px;
        margin: 0 auto;
    }
    #random {
        grid-area: random;
    }
    #popular {
        grid-area: popular;
    }
    #new {
        grid-area: new;
    }
    #router {
        grid-area: router;
        width:360px;
        margin: auto;
        padding-top:10px;
    }
    button {
        margin: auto;
    }

</style>
