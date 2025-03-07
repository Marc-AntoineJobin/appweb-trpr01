<script setup lang="ts">
import {defineProps } from 'vue'
import { unparse } from 'papaparse'
import { saveAs } from 'file-saver'

//fait avec Appwebgpt
// Accepter les livres en tant que prop
const props = defineProps<{
  books: { id: number; title: string; description: string; price: number; stock: number }[]
}>()

const exportCSV = () => {
    // Convertir les données en CSV
    const csv = unparse(props.books, { header: true })

    // Créer un Blob pour le téléchargement
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

    // Sauvegarder le fichier
    saveAs(blob, 'books_export.csv')
}
</script>

<template>
    <button @click="exportCSV" class="btn btn-primary">Exporter CSV</button>
</template>

<style scoped>
.btn {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.btn:hover {
    background-color: #0056b3;
}
</style>