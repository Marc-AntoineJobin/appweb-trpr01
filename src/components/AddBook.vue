<script setup lang="ts">
import { ref, defineProps } from 'vue';
import type { Book } from '../scripts/types';

const props = defineProps<{
  books: Book[]
}>();

const newBookTitle = ref('');
const newBookDescription = ref('');
const newBookPrice = ref(0);
const newBookStock = ref(0);

// erreurs
const titleError = ref('');
const priceError = ref('');
const stockError = ref('');

const validateInfo = () => {
  let isValid = true;

  if (!newBookTitle.value.trim()) {
    titleError.value = 'Veuillez entrer un titre valide.';
    isValid = false;
  } else {
    titleError.value = '';
  }

  if (newBookPrice.value < 0) {
    priceError.value = 'Le prix ne peut pas être négatif.';
    isValid = false;
  } else {
    priceError.value = '';
  }

  if (newBookStock.value < 0) {
    stockError.value = 'Le stock ne peut pas être négatif.';
    isValid = false;
  } else {
    stockError.value = '';
  }

  return isValid;
};

const confirmAddBook = () => {
  if (validateInfo()) {
    const newBook: Book = {
      id: props.books.length + 1,
      title: newBookTitle.value.trim(),
      description: newBookDescription.value.trim(),
      price: newBookPrice.value,
      stock: newBookStock.value
    };
    props.books.push(newBook);
    newBookTitle.value = '';
    newBookDescription.value = '';
    newBookPrice.value = 0;
    newBookStock.value = 0;
  }
};
</script>

<template>
  <div class="book-list__add mt-3">
    <h3>Ajout d'un livre</h3>
    <div class="row">
      <div class="col-md-4">
        <div class="input-group mb-2">
          <span class="input-group-text">Titre:</span>
          <input v-model="newBookTitle" type="text" class="form-control"/>
        </div>
        <span v-if="titleError" class="text-danger">{{ titleError }}</span>
      </div>
      <div class="col-md-4">
        <div class="input-group mb-2">
          <span class="input-group-text">Prix:</span>
          <input v-model="newBookPrice" type="number" class="form-control"/>
        </div>
        <span v-if="priceError" class="text-danger">{{ priceError }}</span>
      </div>
      <div class="col-md-4">
        <div class="input-group mb-2">
          <span class="input-group-text">Stock:</span>
          <input v-model="newBookStock" type="number" class="form-control"/>
        </div>
        <span v-if="stockError" class="text-danger">{{ stockError }}</span>
      </div>
    </div>
    <div class="input-group mb-2">
      <span class="input-group-text">Description:</span>
      <textarea v-model="newBookDescription" class="form-control" rows="2"></textarea>
    </div>
    <div class="d-flex justify-content-center">
      <button type="button" class="mb-3 mt-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#addBookModal">Ajouter le livre</button>
    </div>

    <!-- Modal de confirmation pour l'ajout -->
    <div class="modal fade" id="addBookModal" tabindex="-1" aria-labelledby="addBookModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addBookModalLabel">Confirmation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Voulez-vous vraiment ajouter ce livre ?
            <div v-if="titleError" class="text-danger mt-2">{{ titleError }}</div>
            <div v-if="priceError" class="text-danger mt-2">{{ priceError }}</div>
            <div v-if="stockError" class="text-danger mt-2">{{ stockError }}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-primary" @click="confirmAddBook" data-bs-dismiss="modal">Ajouter</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-danger {
  color: red;
}
</style>