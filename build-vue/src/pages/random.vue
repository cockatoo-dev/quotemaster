<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import NavBar from "../components/NavBar.vue"
  import QuoteRenderer from "../components/QuoteRenderer.vue"
  import { API_HOST } from "../utils/config"
  import type { apiQuoteType } from "../utils/types"
  import Alert from "@nuxt/ui/runtime/components/Alert.vue"
  import Button from "@nuxt/ui/runtime/components/Button.vue"
  import HIArrowPath from "../icons/HIArrowPath.vue"

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
  <div>
    <NavBar />
    <Alert 
      v-if="error" 
      color="error" 
      variant="subtle"
      :ui="{title: 'pb-1 text-center text-base font-normal', description: 'mx-auto'}"
      title="Unable to load quote."
    >
      <template #description>
        <div>
          <Button 
            color="error"
            class="text-base font-bold"
            @click="getQuote"
          >
            <template #leading><HIArrowPath /></template>
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
          class="text-base font-normal"
          @click="getQuote"
        >
          <template #leading><HIArrowPath /></template>
          Get another quote
        </Button>
      </div>
    </div>
  </div>
</template>
