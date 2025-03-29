<script setup lang="ts">
  import { ref } from "vue"
  import { API_HOST, HOST } from "../utils/config"
  import type { apiErrorType, apiIdType } from "../utils/types"
  import NavBar from "../components/NavBar.vue"
  import Alert from "@nuxt/ui/runtime/components/Alert.vue"
  import Button from "@nuxt/ui/runtime/components/Button.vue"
  import Input from "@nuxt/ui/runtime/components/Input.vue"
  import Textarea from "@nuxt/ui/runtime/components/Textarea.vue"
  import { useClipboard } from "@vueuse/core"
  import HIShare from "../icons/HIShare.vue"
  import HIPencilSquare from "../icons/HIPencilSquare.vue"
  import HIDocumentDuplicate from "../icons/HIDocumentDuplicate.vue"
  import HIPaperAirplane from "../icons/HIPaperAirplane.vue"

  const quote = ref("")
  const name = ref("")
  const submitToggle = ref(false)
  const submitError = ref(false)
  const submitSuccess = ref(false)
  const errorMessage = ref("")
  const shareToggle = ref(false)
  const shareLink = ref("")

  const { copy } = useClipboard({legacy: true})
  const copyToggle = ref(false)

  const copyShareLink = async () => {
    await copy(shareLink.value)
    copyToggle.value = true
    setTimeout(() => {
      copyToggle.value = false
    }, 2000);
  }

  const submitQuote = async () => {
    submitError.value = false
    
    if (quote.value == "") {
      errorMessage.value = "Please enter a quote."
      submitError.value = true
    } else if (name.value == "") {
      errorMessage.value = "Please enter a name."
      submitError.value = true
    } else if (quote.value.length > 400) {
      errorMessage.value = "Quote should be less than 400 characters long."
      submitError.value = true
    } else if (name.value.length > 40) {
      errorMessage.value = "Name should be less than 40 characters long."
      submitError.value = true
    }

    if (submitError.value) {
      return
    }

    submitToggle.value = true
    const reqObj = {
      quote: quote.value,
      name: name.value
    }
    try {
      const res = await fetch(`${API_HOST}/new`,{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqObj),
      })
      if (res.status === 400) {
        const resObj = await res.json() as apiErrorType
        errorMessage.value = resObj.message
        submitError.value = true
      } else if (res.ok) {
        const resObj = await res.json() as apiIdType
        shareLink.value = `${HOST}/id/${resObj.id}`
        submitSuccess.value = true
      } else {
        errorMessage.value = "Unable to submit quote."
        submitError.value = true
      }
  } catch {
      errorMessage.value = "Unable to submit quote."
      submitError.value = true
  } finally {
    if (submitError.value) {
      submitToggle.value = false
    }
  }
  }

  const reset = () => {
    quote.value = ""
    name.value = ""
    submitToggle.value = false
    submitSuccess.value = false
    shareToggle.value = false
  }
</script>

<template>
  <div>
    <NavBar />
    
    <div class="pb-1">
      <Alert
        v-if="submitError"
        color="error"
        variant="subtle"
        :ui="{title: 'text-base font-bold', description: 'text-base opacity-100'}"
        title="Error"
        :description="errorMessage"
      />
      <Alert 
        v-else-if="submitSuccess"
        color="success"
        variant="subtle"
        :ui="{title: 'pb-1 text-base font-bold', description: 'w-full'}"
        title="Quote submitted!"
      >
        <template #description>
          <div class="sm:grid sm:grid-cols-2">
            <div class="pb-1 sm:pb-0 sm:pr-0.5">
              <Button 
                color="success"
                class="block w-full text-center text-base font-bold"
                :disabled="shareToggle"
                @click="() => {shareToggle = true}"
              >
                <template #leading><HIShare /></template>
                Share this quote
              </Button>
            </div>
            <div class="pb-1 sm:pb-0 sm:pl-0.5">
              <Button 
                color="success"
                class="block w-full text-center text-base font-bold"
                @click="reset"
              >
                <template #leading><HIPencilSquare /></template>
                Write another quote
              </Button>
            </div>
          </div>

          <div v-if="shareToggle" class="pt-1 pb-2">
            <p class="pt-1 text-base font-normal">Copy this link to share:</p>
            <div class="grid grid-cols-[1fr_auto] pt-1">
              <div>
                <Input 
                  :model-value="shareLink" 
                  disabled 
                  :ui="{root: 'w-full', base: 'text-base disabled:cursor-text'}"
                />
              </div>
              <div class="pl-1">
                <Button 
                  :disabled="copyToggle"
                  color="success"
                  class="text-base font-bold"
                  @click="copyShareLink"
                >
                  <template #leading><HIDocumentDuplicate /></template>
                  {{copyToggle ? 'Copied!' : 'Copy'}}
                </Button>
              </div>
            </div>
          </div>
        </template>
      </Alert>
      
      <Alert 
        v-else
        color="warning"
        variant="subtle"
        :ui="{title: 'text-base font-bold', description: 'text-base font-normal opacity-100'}"
        title="Warning"
        description="Anything you submit here can be seen by anyone on the internet. Do not submit any personal or sensitive information."
      />
    </div>

    <form @submit.prevent="submitQuote">
      <label for="quote" class="block font-bold py-1">Your Quote</label>
      <Textarea
        id="quote"
        v-model="quote"
        :disabled="submitToggle"
        autocomplete="off"
        :rows="4"
        :ui="{root: 'w-full', base: 'text-base'}"
      />
      <p :class="`text-xs text-right transition-colors ${quote.length > 400 ? 'text-red-500 dark:text-red-400' : ''}`">
        {{quote.length}}/400
      </p>

      <label for="name" class="block font-bold py-1">Your Name</label>
      <Input
        id="name"
        v-model="name"
        :disabled="submitToggle"
        autocomplete="off"
        :ui="{root: 'w-full', base: 'text-base'}"
      />
      <p :class="`text-xs text-right transition-colors ${name.length > 40 ? 'text-red-500 dark:text-red-400' : ''}`">
        {{name.length}}/40
      </p>

      <div class="pt-1">
        <Button 
          type="submit"
          :disabled="submitToggle"
          class="w-full justify-center text-base font-bold"
        >
          <template #leading><HIPaperAirplane /></template>
          Submit Quote
        </Button>
      </div>
    </form>
  </div>
</template>
