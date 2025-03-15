<script setup lang="ts">
  import Button from '@nuxt/ui/runtime/components/Button.vue'
</script>

<template>
  <div class="pb-2">
    <div class="sm:grid sm:grid-cols-3 gap-2 border-y border-y-green-400 dark:border-y-green-500">
      <div class="py-1">
        <Button 
          label="Random Quote"
          variant="ghost"
          class="block w-full text-base text-center"
          to="/random"
        />
      </div>
      <div class="py-1">
        <Button 
          label="Popular Quote"
          variant="ghost"
          class="block w-full text-base text-center"
          to="/popular"
        />
      </div>
      <div class="py-1">
        <Button 
          label="Write Your Own"
          variant="ghost"
          class="block w-full text-base text-center"
          to="/new"
        />
      </div>
    </div>
  </div>
</template>
