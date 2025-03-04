<template>
  <div class="container">
    <div class="row book-component border p-3 mb-2 rounded" @click="$emit('click')">
      <div class="col-md-4">
        <p>{{ title }}</p>
      </div>
      <div class="col-md-2">
        <p>Price: {{ price }}</p>
      </div>
      <div class="col-md-3">
        <p>Stock: {{ stock }}</p>
      </div>
      <div class="col-md-3 text-end">
        <button @click.stop="$emit('delete', id)" class="btn btn-danger btn-sm">Supprimer?</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
  }>();
</script>