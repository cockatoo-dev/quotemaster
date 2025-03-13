<script setup lang="ts"></script>

<template>
  <div id="nav">
    <div class="button-container">
      <button 
        :disabled="$route.fullPath === '/random'" 
        @click="$router.push('/random')"
      >
        Random quote
      </button>
    </div>
    <div class="button-container">
      <button 
        :disabled="$route.fullPath === `/popular`" 
        @click="$router.push('/popular')"
      >
        Popular quote
      </button>
    </div>
    <div class="button-container">
      <button 
        :disabled="$route.fullPath === '/new'" 
        @click="$router.push('/new')"
      >
        Write your own
      </button>
    </div>
  </div>
</template>

<style scoped>
  #nav {
    display: grid;
    grid-template-columns: auto auto auto;
    margin-bottom: 10px;
  }
</style>
