// src/composables/useBooks.ts
import { ref, reactive } from 'vue'
import type { Book } from './types'

const books = ref<Book[]>([
    { id: 1, title: 'Lord of The Rings', description: 'Très bon livre!', price: 20.00, stock: 25 },
    { id: 2, title: 'Narnia', description: 'Jamais lu, bon Film par contre...', price: 21.00, stock: 30 },
    { id: 3, title: 'La femme qui fuit', description: 'Pas de mon gout...', price: 18.00, stock: 5 }
])

const selectedBook = reactive<Book>({ id: 0, title: '', description: '', price: 0, stock: 0 })

const selectBook = (book: Book) => {
    Object.assign(selectedBook, book)
}

const addBook = (newBook: Book) => {
    books.value.push({ ...newBook, id: books.value.length + 1 })
}

const deleteBook = (id: number) => {
    books.value = books.value.filter(book => book.id !== id)
}

export function useBooks() {
    return { books, selectedBook, selectBook, addBook, deleteBook }
}
