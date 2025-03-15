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
      >
        <template #title>
          <div class="text-base text-center">{{ errorMessage }}</div>
        </template>
      </Alert>
      <Alert 
        v-else-if="submitSuccess"
        color="success"
        variant="subtle"
      >
        <template #title>
          <div class="text-base font-bold">Quote submitted!</div>
        </template>
        <template #description>
          <div class="grid grid-cols-2">
            <div class="pr-0.5">
              <Button 
                label="Share this quote"
                color="success"
                class="block w-full text-center text-base font-bold"
                :disabled="shareToggle"
                @click="() => {shareToggle = true}"
              />
            </div>
            <div class="pl-0.5">
              <Button 
                label="Write another quote"
                color="success"
                class="block w-full text-center text-base font-bold"
                @click="reset"
              />
            </div>
          </div>

          <div v-if="shareToggle" class="pt-1 pb-2">
          <p>Copy this link to share:</p>
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
                :label="copyToggle ? 'Copied!' : 'Copy'"
                :disabled="copyToggle"
                class="text-base font-bold"
                @click="() => {
                  copy(shareLink)
                  copyToggle = true
                }"
              />
            </div>
          </div>
        </div>
        </template>
      </Alert>
      
      <Alert 
        v-else
        color="warning"
        variant="subtle"
      >
        <template #title>
          <div class="text-base font-bold">Warning</div>
        </template>
        <template #description>
          <div class="text-base">
            Anything you submit here can be seen by anyone on the internet. Do not submit any personal or sensitive information.
          </div>
        </template>
      </Alert>
    </div>

    <form @submit.prevent="submitQuote">
      <label for="quote" class="block font-bold py-1">Your Quote</label>
      <Textarea
        id="quote"
        v-model="quote"
        :disabled="submitToggle"
        autocomplete="off"
        :rows="4"
        :ui="{root: 'block w-full', base: 'text-base'}"
      />
      <p class="text-xs text-right" :class="{warn:quote.length > 400}">{{quote.length}}/400</p>

      <label for="name" class="block font-bold py-1">Your Name</label>
      <Input
        id="name"
        v-model="name"
        :disabled="submitToggle"
        autocomplete="off"
        :ui="{root: 'block w-full', base: 'text-base'}"
      />
      <p class="text-xs text-right" :class="{warn:name.length > 40}">{{name.length}}/40</p>

      <div class="pt-1">
        <Button 
          type="submit"
          label="Submit Quote"
          :disabled="submitToggle"
          class="block w-full text-base text-center font-bold"
        />
      </div>
    </form>
  </div>
</template>
