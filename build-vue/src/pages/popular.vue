<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import { API_HOST } from "../utils/config"
  import type { apiQuoteType } from "../utils/types"
  import NavBar from "../components/NavBar.vue"
  import QuoteRenderer from "../components/QuoteRenderer.vue"
  import Alert from "@nuxt/ui/runtime/components/Alert.vue"
  import Button from "@nuxt/ui/runtime/components/Button.vue"

  const quote = ref<apiQuoteType | null>(null)
  const error = ref(false)

  const getQuote = async () => {
    quote.value = null
    error.value = false

    try {
      const res = await fetch(`${API_HOST}/popular`)
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
  <div>
    <NavBar />
    <Alert v-if="error" color="error" variant="subtle">
      <template #title>
        <div class="text-base text-center">Unable to load quote.</div>
      </template>
      <template #description>
        <div class="text-center">
          <Button 
            color="error"
            class="text-base"
            @click="getQuote"
          >
            Retry
          </Button>
        </div>
      </template>
    </Alert>
    <div v-else>
      <QuoteRenderer :quote="quote" />
      <div class="pb-1 text-center">
        <Button 
          variant="ghost"
          class="text-base"
          @click="getQuote"
        >
          Get another quote
        </Button>
      </div>
    </div>
  </div>
</template>
