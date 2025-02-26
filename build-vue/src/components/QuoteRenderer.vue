<script setup lang="ts">
  import { ref, watch } from "vue"
import type { apiQuoteType } from "../utils/types";
import { API_HOST, HOST } from "../utils/config";

  const props = defineProps<{
    quote: apiQuoteType | null
  }>()

  const likeToggle = ref(false)
  const likeSuccess = ref(false)
  const shareToggle = ref(false)
  const shareLink = ref("")
  
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
  <div id="placeholder" v-if="quote === null">
    <p>Loading quote...</p>
  </div>
  <div v-else>
    <p id="quote">{{quote.quote}}</p>
    <p id="name">- {{quote.name}}</p>
    <div id="actions">
      <div class="button-container">
        <button 
          :disabled="likeToggle" 
          @click="likeQuote"
        >
          {{likeSuccess ? "Liked" : "Like"}} this quote
        </button>
      </div>
      <div class="button-container">
        <button 
          :disabled="shareToggle" 
          @click="() => {shareToggle = true}"
        >
          Share this quote
        </button>
      </div>
    </div>
    <div id="share-link" v-if="shareToggle">
      <p>Copy this link to share:</p>
      <input type="text" :value="shareLink" disabled>
    </div>
  </div>
</template>

<style scoped>
  .button-container {
    text-align: center;
  }
  p {
    font-family: "Open Sans", sans-serif;
  }
  #placeholder p {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  }
  #quote {
    text-align: justify;
    text-indent: 2em;
  }
  #name {
    text-align: right;
    font-style: italic;
  }
  #actions {
    display: grid;
    grid-template-columns: auto auto;
  }
  #share-link {
    align-items: center;
  }
  #share-link p {
    margin-bottom: 0px;
  }
  #share-link input {
    width: 354px;
    padding:2px;
    border-width:1px;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
  }
</style>