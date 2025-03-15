<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import { useRoute } from "vue-router"
  import NavBar from "../components/NavBar.vue"
  import { API_HOST } from "../utils/config"
  import QuoteRenderer from "../components/QuoteRenderer.vue"
  import type { apiErrorType, apiQuoteType } from "../utils/types"
  import Alert from "@nuxt/ui/runtime/components/Alert.vue"
  import Button from "@nuxt/ui/runtime/components/Button.vue"

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
  <div>
    <NavBar />
    <Alert v-if="error" color="error" variant="subtle">
      <template #title>
        <div class="text-base text-center">{{ errorMessage }}</div>
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
    </div>
  </div>
</template>
