<script setup lang="ts">
  import Button from '@nuxt/ui/runtime/components/Button.vue'
</script>

<template>
  <div class="pb-2">
    <div class="sm:grid sm:grid-cols-3 gap-2 border-y border-y-green-400 dark:border-y-green-500">
      <div class="py-1">
        <Button 
          color="primary"
          variant="ghost"
          class="block w-full text-base text-center font-normal"
          to="/random"
        >
          Random Quote
        </Button>
      </div>
      <div class="py-1">
        <Button 
          color="primary"
          variant="ghost"
          class="block w-full text-base text-center font-normal"
          to="/popular"
        >
          Popular Quote
        </Button>
      </div>
      <div class="py-1">
        <Button 
          color="primary"
          variant="ghost"
          class="block w-full text-base text-center font-normal"
          to="/new"
        >
          Write Your Own
        </Button>
      </div>
    </div>
  </div>
</template>
