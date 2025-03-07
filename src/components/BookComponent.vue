<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
}>();

const emit = defineEmits(['click', 'delete', 'duplicate']);

const confirmDelete = () => {
  emit('delete', props.id);
};

const duplicateBook = () => {
  emit('duplicate', {
    id: props.id,
    title: props.title,
    description: props.description,
    price: props.price,
    stock: props.stock
  });
};

const stockClass = () => {
  if (props.stock === 0) {
    return 'bg-danger text-white rounded';
  } else if (props.stock > 0 && props.stock < 10) {
    return 'bg-warning text-dark rounded';
  } else {
    return 'bg-success text-white rounded';
  }
};
</script>

<template>
  <div class="container">
    <div class="row book-component border p-2 mb-1 rounded" @click="$emit('click')"> <!--https://getbootstrap.com/docs/4.0/layout/grid/-->
      <div class="col-md-5">
        <p>{{ title }}</p>
      </div>
      <div class="col-md-2">
        <p>Prix: {{ price }}</p>
      </div>
      <div class="col-md-2">
        <p :class="['p-2', stockClass()]">Stock: {{ stock }}</p>
      </div>
      <div class="col-md-3 text-end">
        <button @click.stop data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-danger btn-sm">Supprimer?</button>
        <button @click.stop="duplicateBook" class="btn btn-secondary btn-sm ms-2 mt-2">Dupliquer</button>
      </div>
    </div>
  </div>

  <!-- Modal https://getbootstrap.com/docs/4.0/components/modal/ tout pris de la-->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Supprimer le livre</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Voulez-vous vraiment supprimer ce livre?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-danger btn-primary" @click="confirmDelete" data-bs-dismiss="modal">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>