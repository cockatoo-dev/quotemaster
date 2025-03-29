<script setup lang="ts">
  import Button from '@nuxt/ui/runtime/components/Button.vue'
  import HILightBulb from '../icons/HILightBulb.vue';
  import HIStar from '../icons/HIStar.vue';
  import HIPencilSquare from '../icons/HIPencilSquare.vue';
</script>

<template>
  <div class="pb-2">
    <div class="sm:grid sm:grid-cols-3 gap-2 border-y border-y-green-400 dark:border-y-green-500">
      <div class="py-1">
        <Button 
          color="primary"
          variant="ghost"
          class="w-full justify-center text-base font-normal"
          to="/random"
        >
          <template #leading><HILightBulb /></template>
          Random Quote
        </Button>
      </div>
      <div class="py-1">
        <Button 
          color="primary"
          variant="ghost"
          class="w-full justify-center text-base font-normal"
          to="/popular"
        >
          <template #leading><HIStar /></template>
          <div>Popular Quote</div>
        </Button>
      </div>
      <div class="py-1">
        <Button 
          color="primary"
          variant="ghost"
          class="w-full justify-center text-base font-normal"
          to="/new"
        >
          <template #leading><HIPencilSquare /></template>
          Write Your Own
        </Button>
      </div>
    </div>
  </div>
</template>
