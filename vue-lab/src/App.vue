<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { watchEffect } from 'vue'

const route = useRoute()

watchEffect(() => {
  if (route.meta.layout === 'dating') {
    document.body.classList.add('dating-mode')
  } else {
    document.body.classList.remove('dating-mode')
  }
})
</script>

<template>
  <header v-if="route.meta.layout !== 'dating'">
    <div class="max-w-4xl mx-auto">
      <nav class="p-4 bg-gray-100 rounded-b-lg shadow-md">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink to="/onboarding/1" class="ml-4 text-red-500 font-bold">Dating App</RouterLink>
      </nav>
    </div>
  </header>

  <main :class="route.meta.layout === 'dating' ? 'w-full h-full p-0 m-0' : 'max-w-4xl mx-auto mt-5'">
    <RouterView />
  </main>
</template>
