<script setup lang="ts">
import BookComponent from './BookComponent.vue';
import { reactive, ref } from 'vue';
import type { Book } from '../scripts/types';

const books = ref<Book[]>([
  {
      id: 1, title: "Lord of The Rings", 
      description: "Très bon livre!",
      price: 20.00,
      stock: 25
  },
  {
      id: 2, title: "Narnia",
      description: "Jamais lu, bon Film par contre...",
      price: 21.00,
      stock: 30
  },
  {
      id: 3, title: "La femme qui fuit",
      description: "Pas de mon gout...",
      price: 18.00,
      stock: 5
  }
]);

const selectedBook = reactive<Book>({ id: 1, title: "Lord of The Rings", description: "Very good book!", price: 20.00, stock: 25 });
const newBookTitle = ref('');
const newBookDescription = ref('');
const newBookPrice = ref(0);
const newBookStock = ref(0);
const titleError = ref(false);

const selectBook = (book: Book) => {
    selectedBook.id = book.id;
    selectedBook.title = book.title;
    selectedBook.description = book.description;
    selectedBook.price = book.price;
    selectedBook.stock = book.stock;
};

const addBook = () => {
  if (newBookTitle.value.trim()) {
    const newBook: Book = {
      id: books.value.length + 1,
      title: newBookTitle.value.trim(),
      description: newBookDescription.value.trim(),
      price: newBookPrice.value,
      stock: newBookStock.value
    };
    books.value.push(newBook);
    newBookTitle.value = '';
    newBookDescription.value = '';
    newBookPrice.value = 0;
    newBookStock.value = 0;
    titleError.value = false;
  } else {
    titleError.value = true;
  }
};

const deleteBook = (id: number) => {
  books.value = books.value.filter((book: { id: number; }) => book.id !== id);
};

const updateSelectedBook = () => {
  const bookIndex = books.value.findIndex(book => book.id === selectedBook.id);
  if (bookIndex !== -1) {
    books.value[bookIndex].title = selectedBook.title;
    books.value[bookIndex].description = selectedBook.description;
    books.value[bookIndex].price = selectedBook.price;
    books.value[bookIndex].stock = selectedBook.stock;
  }
};
</script>

<template>
  <div class="container">
      <div class="row">
          <div class="col-md-8">
            <h3 class="mt-4">Liste des livres</h3>
              <div class="book-list__books">
                  <BookComponent
                      v-for="book in books"
                      :key="book.id"
                      :id="book.id"
                      :title="book.title"
                      :description="book.description"
                      :price="book.price"
                      :stock="book.stock"
                      @click="selectBook(book)"
                      @delete="deleteBook"
                  />
              </div>
          </div>
          <div class="col-md-4">
            <h3 class=" mt-4">Modification du livre</h3>
              <div class="book-list__selected p-3 border rounded bg-light">
                <div class="input-group mb-2">
                    <span class="input-group-text">Titre:</span>
                    <input v-model="selectedBook.title" type="text" class="form-control"/>
                  </div>
                  <div class="input-group mb-2">
                    <span class="input-group-text">Prix:</span>
                    <input v-model="selectedBook.price" type="number" class="form-control"/>
                  </div>
                  <div class="input-group mb-2">
                    <span class="input-group-text">Stock:</span>
                    <input v-model="selectedBook.stock" type="number" class="form-control"/>
                  </div>
                  <div class="input-group mb-2">
                    <span class="input-group-text">Description:</span>
                    <input v-model="selectedBook.description" type="text" class="form-control"/>
                  </div>
                  <button @click="updateSelectedBook" class="btn btn-primary">Enregistrer les modifications</button>
              </div>
          </div>
      </div>
      <div class="book-list__add mt-3">
        <h3>Ajout d'un livre</h3>
          <div class="row">
              <div class="col-md-4">
                <div class="input-group mb-2">
                  <span class="input-group-text">Titre:</span>
                  <input v-model="newBookTitle" type="text" class="form-control"/>
                </div>
                <span v-if="titleError" class="text-danger">Veuillez entrer un titre!</span>
              </div>
              <div class="col-md-4">
                  <div class="input-group mb-2">
                      <span class="input-group-text">Prix:</span>
                      <input v-model="newBookPrice" type="number" class="form-control"/>
                  </div>
              </div>
              <div class="col-md-4">
                  <div class="input-group mb-2">
                      <span class="input-group-text">Stock:</span>
                      <input v-model="newBookStock" type="number" class="form-control"/>
                  </div>
              </div>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">Description:</span>
            <input v-model="newBookDescription" type="text" class="form-control"/>
          </div>
          <button @click="addBook" class="mb-3 mt-3 btn btn-primary">Ajouter le livre</button>
      </div> <!-- TODO LIST
                  meilleur message de validation,
                  confirmation lors de supprimer un livre -->
  </div>
</template>

<style scoped>
.text-danger {
  color: red;
}
</style>