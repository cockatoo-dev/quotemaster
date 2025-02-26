<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import NavBar from "../components/NavBar.vue"
  import QuoteRenderer from "../components/QuoteRenderer.vue"
  import { API_HOST } from "../utils/config"
  import type { apiQuoteType } from "../utils/types"

  const quote = ref<apiQuoteType | null>(null)
  const error = ref(false)

  const getQuote = async () => {
    quote.value = null
    error.value = false

    try {
      const res = await fetch(`${API_HOST}/random`)
      if (!res.ok) {
        error.value = true
      } else {
        quote.value = await res.json() as apiQuoteType
      }
    } catch {
      error.value = true
    }
  }

  onMounted(getQuote)
</script>

<template>
  <NavBar />
  <div id="error-layover" v-if="error">
    <p>Unable to load quote.</p>
    <div class="button-container">
      <button @click="getQuote">Retry</button>
    </div>
  </div>
  <div v-else>
    <QuoteRenderer :quote="quote" />
    <div id="reload-button" class="button-container">
      <button @click="getQuote">Get another quote</button>
    </div>
  </div>
</template>

<style scoped>
  #error-layover {
    background-color: #ffaaaa;
    margin: auto;
    padding: 10px;
    font-family: 'Open Sans', sans-serif;
    text-align: center;
  }
  #reload-button {
    padding-top: 10px;
  }
</style>
