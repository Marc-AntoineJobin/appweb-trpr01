<template>
    <div class="book-component" @click="$emit('click')">
      <h3>{{ title }}</h3>
      <!-- <p>ID: {{ id }}</p>
      <p>Description: {{ description }}</p>
      <p>Price: {{ price }}</p>
      <p>Stock: {{ stock }}</p>-->
    </div>
  </template>
<!-- Chatgpt pour la partie template -->

<script setup lang="ts">
defineProps<{
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
  }>();
</script>