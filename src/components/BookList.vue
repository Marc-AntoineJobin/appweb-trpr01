<script setup lang="ts">
import BookComponent from './BookComponent.vue';
import ExportCsv from './exportCsv.vue';
import AddBook from './AddBook.vue';
import { reactive, ref, computed } from 'vue';
import type { Book } from '../scripts/types';

const books = ref<Book[]>([
  { id: 1, title: "Lord of The Rings", description: "Très bon livre!", price: 20.00, stock: 25 },
  { id: 2, title: "Narnia", description: "Jamais lu, bon Film par contre...", price: 21.00, stock: 30 },
  { id: 3, title: "La femme qui fuit", description: "Pas de mon gout...", price: 18.00, stock: 5 }
]);

const selectedBook = reactive<Book>({ id: 1, title: "Lord of The Rings", description: "Très bon livre!", price: 20.00, stock: 25 });
const saveBookError = ref('');
const searchQuery = ref('');

const selectBook = (book: Book) => {
  Object.assign(selectedBook, book);
};

const updateSelectedBook = () => {
  const bookIndex = books.value.findIndex(book => book.id === selectedBook.id);
  if (bookIndex !== -1) {
    books.value[bookIndex] = { ...selectedBook };
  }
};

const saveSelectedBook = () => {
  if (selectedBook.title.trim() && selectedBook.price > 0 && selectedBook.stock >= 0) {
    updateSelectedBook();
    saveBookError.value = '';
  } else {
    saveBookError.value = 'Veuillez remplir tous les champs correctement.';
  }
};

const deleteBook = (id: number) => {
  books.value = books.value.filter(book => book.id !== id);
};

const duplicateBook = (book: Book) => {
  const newBook = { ...book, id: books.value.length + 1 };
  books.value.push(newBook);
};

const filteredBooks = computed(() => {
  return books.value.filter(book => 
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    book.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <h3 class="mt-4">Liste des livres <ExportCsv :books="books" class="mb-3" /></h3>
        <h4>Cliquer un livre pour selectionner</h4>
        <input v-model="searchQuery" type="text" class="form-control mb-3" placeholder="Rechercher un livre..." />
        <div>
          <BookComponent
            v-for="book in filteredBooks"
            :key="book.id"
            v-bind="book"
            @click="selectBook(book)"
            @delete="deleteBook"
            @duplicate="duplicateBook"
          />
        </div>
      </div>
      <div class="col-md-5">
        <h3 class="mt-4">Modification du livre</h3>
        <div class="p-3 border rounded bg-light">
          <input v-model="selectedBook.title" type="text" class="form-control mb-2" placeholder="Titre" />
          <input v-model="selectedBook.price" type="number" class="form-control mb-2" placeholder="Prix" />
          <input v-model="selectedBook.stock" type="number" class="form-control mb-2" placeholder="Stock" />
          <textarea v-model="selectedBook.description" class="form-control mb-2" rows="2" placeholder="Description"></textarea>
          <button class="btn btn-primary w-100" @click="saveSelectedBook" data-bs-toggle="modal" data-bs-target="#saveBookModal">Enregistrer</button>
          <div v-if="saveBookError" class="text-danger mt-2">{{ saveBookError }}</div>
          <button 
            v-if="selectedBook.stock === 0" 
            type="button" 
            class="btn btn-warning w-100 mt-3" 
            data-bs-toggle="modal" 
            data-bs-target="#stockZeroModal">
            Ce livre est en rupture de stock !
          </button>
        </div>
      </div>
    </div>
    <AddBook :books="books" />
  </div>

  <!-- Modal https://getbootstrap.com/docs/4.0/components/modal/ tout pris de la-->
  <div class="modal fade" id="saveBookModal" tabindex="-1" aria-labelledby="saveBookModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="saveBookModalLabel">Confirmation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Voulez-vous vraiment enregistrer les modifications de ce livre ?
          <div v-if="saveBookError" class="text-danger mt-2">{{ saveBookError }}</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Enregistrer</button>
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