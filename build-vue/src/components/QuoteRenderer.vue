<script setup lang="ts">
  import { ref, watch } from "vue"
  import type { apiQuoteType } from "../utils/types";
  import { API_HOST, HOST } from "../utils/config";
  import Button from "@nuxt/ui/runtime/components/Button.vue";
  import Input from "@nuxt/ui/runtime/components/Input.vue";
  import { useClipboard } from "@vueuse/core";

  const props = defineProps<{
    quote: apiQuoteType | null
  }>()

  const likeToggle = ref(false)
  const likeSuccess = ref(false)
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

  const newQuoteState = () => {
    if (props.quote != null) {
      likeToggle.value = false
      likeSuccess.value = false
      shareToggle.value = false
      shareLink.value = `${HOST}/id/${props.quote.id}`
    }
  }

  const likeQuote = async () => {
    likeToggle.value = true;
    const reqObj = {
      id: props.quote?.id
    }
    try {
      const res = await fetch(`${API_HOST}/like`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqObj),
      });
      if (res.ok) {
        likeSuccess.value = true
      } else {
        likeToggle.value = false
      }
    } catch {
      likeToggle.value = false
    }
  }

  watch(props, newQuoteState)
</script>

<template>
  <div>
    <div v-if="quote === null">
      <p class="pt-2 text-2xl text-center font-bold">Loading quote...</p>
    </div>
    <div v-else>
      <p class="pt-4 pb-2 text-justify indent-12">{{quote.quote}}</p>
      <p class="pt-2 pb-4 text-right italic">- {{quote.name}}</p>
      <div class="sm:grid sm:grid-cols-2 py-2">
        <div class="pb-1 sm:pb-0 sm:pr-0.5">
          <Button 
            :disabled="likeToggle"
            color="primary"
            class="block w-full text-center text-base font-bold"
            @click="likeQuote"
          >
            {{likeSuccess ? 'Liked this quote' : 'Like this quote'}}
          </Button>
        </div>
        <div class="pb-1 sm:pb-0 sm:pl-0.5">
          <Button 
            :disabled="shareToggle"
            color="secondary"
            class="block w-full text-center text-base font-bold"
            @click="() => {shareToggle = true}"
          >
            Share this quote
          </Button>
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
              :disabled="copyToggle"
              color="primary"
              class="text-base font-bold"
              @click="copyShareLink"
            >
              {{copyToggle ? 'Copied!' : 'Copy'}}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
