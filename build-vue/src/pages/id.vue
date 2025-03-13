<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import { useRoute } from "vue-router"
  import NavBar from "../components/NavBar.vue"
  import { API_HOST } from "../utils/config"
  import QuoteRenderer from "../components/QuoteRenderer.vue"
  import type { apiErrorType, apiQuoteType } from "../utils/types"

  const route = useRoute()
  const id = route.params.id
  const quote = ref<apiQuoteType | null>(null)
  const error = ref(false)
  const errorMessage = ref("Unable to load quote.")


  const getQuote = async () => {
    try {
      const res = await fetch(`${API_HOST}/id?id=${id}`)
      if (!res.ok) {
        error.value = true
        if (res.status === 400) {
          const errorObj = await res.json() as apiErrorType
          errorMessage.value = errorObj.message
        } else {
          errorMessage.value = "Unable to load quote."
        }
      } else {
        quote.value = await res.json() as apiQuoteType
      }
    } catch {
      error.value = true
      errorMessage.value = "Unable to load quote."
    }
  }

  onMounted(getQuote)
</script>

<template>
  <NavBar />
  <div id="error-layover" v-if="error">
    <p>{{errorMessage}}</p>
    <div class="button-container">
      <button @click="getQuote">Retry</button>
    </div>
  </div>
  <div id="quote-display" v-else>
    <QuoteRenderer :quote="quote" />
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
    font-family: "Open Sans", sans-serif;
    text-align: center;
  }
</style>
