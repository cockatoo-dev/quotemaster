<template>
    <div id="nav">
        <div class="button-container">
            <button :disabled="this.$route.fullPath == '/random'" @click="this.$router.push('/random')">Random quote</button>
        </div>
        <div class="button-container">
            <button :disabled="this.$route.fullPath == `/popular`" @click="this.$router.push('/popular')">Popular quote</button>
        </div>
        <div class="button-container">
            <button :disabled="this.$route.fullPath == '/new'" @click="this.$router.push('/new')">Write your own!</button>
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