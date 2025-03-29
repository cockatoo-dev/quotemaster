<script setup lang="ts">
  import { ref, onMounted, watch } from "vue"
  import { RouterView } from 'vue-router'
  import { API_HOST } from "./utils/config"
  import App from "@nuxt/ui/runtime/components/App.vue"
  import Button from "@nuxt/ui/runtime/components/Button.vue"
  import Alert from "@nuxt/ui/runtime/components/Alert.vue"
  import { useMediaQuery } from "@vueuse/core"
  import HICodeBracket from "./icons/HICodeBracket.vue"
import HIArrowPath from "./icons/HIArrowPath.vue"

  const apiOnline = ref(true)

  const doHandshake = async () => {
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

  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  watch(isDarkMode, () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })
  
  onMounted(doHandshake)
</script>

<template>
  <App>
    <div class="w-11/12 max-w-[640px] mx-auto">
      <div class="p-1">
        <h1 class="py-2 text-center text-4xl font-bold">Quotemaster</h1>
        <p class="pb-1 text-center">Vue build v1.0.0</p>
        <div class="text-center">
          <Button 
            color="primary"
            variant="ghost" 
            class="text-base font-normal"
            to="https://github.com/cockatoo-dev/quotemaster/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <template #leading><HICodeBracket /></template>
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
                <template #leading><HIArrowPath /></template>
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
