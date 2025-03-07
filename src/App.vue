<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import BookList from "./components/BookList.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <header >
      <Header/>
    </header>
    <main class="flex-grow-1">
      <BookList/>
    </main>
    <footer class="d-flex justify-content-center align-items-center mt-auto">
      <Footer/>
    </footer>
  </div>
</template>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>