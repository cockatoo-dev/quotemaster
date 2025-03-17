<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import { RouterView } from 'vue-router'
  import { API_HOST } from "./utils/config"
  import App from "@nuxt/ui/runtime/components/App.vue"
  import Button from "@nuxt/ui/runtime/components/Button.vue"
  import Alert from "@nuxt/ui/runtime/components/Alert.vue"

  const apiOnline = ref(true)

  async function doHandshake () {
    try {
      const handshake = await fetch(`${API_HOST}/handshake`)
      if (handshake.ok) {
        apiOnline.value = true
      } else {
        apiOnline.value = false
      }
    } catch {
      apiOnline.value = false
    }
  }
  
  onMounted(doHandshake)
</script>

<template>
  <App>
    <div class="w-11/12 max-w-[640px] mx-auto">
      <div class="p-1">
        <h1 class="py-2 text-center text-4xl font-bold">Quotemaster</h1>
        <p class="pb-1 text-center">Vue build v0.9.0</p>
        <div class="text-center">
          <Button 
            color="primary"
            variant="ghost" 
            class="text-base font-normal"
            to="https://github.com/cockatoo-dev/quotemaster/"
            target="_blank"
            rel="noreferrer noopener"
          >
            View source on Github
          </Button>
        </div>
      </div>
      <div v-if="!apiOnline" class="py-1">
        <Alert
          color="error"
          variant="subtle"
          :ui="{title: 'pb-1 text-center text-base font-normal', description: 'mx-auto'}"
          title="Unable to reach API server."
        >
          <template #description>
            <div>
              <Button 
                color="error"
                class="text-base font-bold"
                @click="doHandshake"
              >
                Retry
              </Button>
            </div>
          </template>
        </Alert>
      </div>
      <div class="pt-1" v-else>
        <RouterView />
      </div>
    </div>
  </App>
</template>
