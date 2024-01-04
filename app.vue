<template>
    <NuxtLayout>
    <NuxtLoadingIndicator />
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>

</template>

<script setup lang="ts">
import { productStore } from '@/stores/product';

const store = productStore();
await store.getAbout();



</script>