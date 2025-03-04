<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import BookList from "./components/BookList.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>


<template>
  <div class="border rounded">
  <Header/>
    <BookList/>
  </div>
  <Footer/>
</template>


<style scoped>
.app-container {
  background-color: #001f3f; /* Bleu foncé */
}
</style>
