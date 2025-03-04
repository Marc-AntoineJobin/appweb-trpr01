<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import BookList from "./components/BookList.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>


<template>
  <body class="border rounded">
  <div>
  <Header/>
    <BookList/>
  </div>
</body>
  <Footer/>
</template>


<style scoped>
</style>
