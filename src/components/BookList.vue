<script setup lang="ts">
import { defineProps } from 'vue';
import BookComponent from './BookComponent.vue';
import { reactive, ref } from 'vue';
import type { Book } from '../scripts/types';

const books = ref<Book[]>([
  {
      id: 1, title: "Lord of The Rings", 
      description: "Very good book!",
      price: 20.00,
      stock: 25
  },
  {
      id: 2, title: "Narnia",
      description: "Never read it, good movie though",
      price: 21.00,
      stock: 30
  },
  {
      id: 3, title: "La femme qui fuit",
      description: "Not very good...",
      price: 18.00,
      stock: 5
  }
]);

const selectedBook = reactive<Book>({ id: 1, title: "Lord of The Rings", description: "Very good book!", price: 20.00, stock: 25 });
const newBookTitle = ref('');
const newBookDescription = ref('');
const newBookPrice = ref(0);
const newBookStock = ref(0);

const selectBook = (books: Book) => {
    selectedBook.id = books.id;
    selectedBook.title = books.title;
    selectedBook.description = books.description;
    selectedBook.price = books.price;
    selectedBook.stock = books.stock;
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
  }
};

const deleteBook = (id: number) => {
  books.value = books.value.filter((books: { id: number; }) => books.id !== id);
};
</script>

<template>
    <div class="book-list">
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
        />
        </div>
        <div class="book-list__selected">
        <BookComponent
            :id="selectedBook.id"
            :title="selectedBook.title"
            :description="selectedBook.description"
            :price="selectedBook.price"
            :stock="selectedBook.stock"
        />
        </div>
        <div class="book-list__add">
        <input v-model="newBookTitle" type="text" placeholder="Title" />
        <input v-model="newBookDescription" type="text" placeholder="Description" />
        <input v-model="newBookPrice" type="number" placeholder="Price" />
        <input v-model="newBookStock" type="number" placeholder="Stock" />
        <button @click="addBook">Ajouter le livre</button>
        </div>
    </div>
</template>