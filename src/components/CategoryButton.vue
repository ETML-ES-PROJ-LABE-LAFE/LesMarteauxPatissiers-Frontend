<template>
    <div class="button-container">
      <button class="category-button" v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">
        {{ category }}
      </button>
      <button class="category-button" @click="resetFilterItems()">
        Reset
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "CategoryButton",
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    methods: {
      selectCategory(category) {
        this.$emit('category-selected', category);
      },
      resetFilterItems() {
        this.$emit('reset-Filter-Items');
      }
    }
  };
  </script>
  
  <style scoped>
.button-container {
    display: flex;
    justify-content: center; /* Centrer horizontalement */
    align-items: center; /* Centrer verticalement */
    height: 10vh; /* Prendre toute la hauteur de la vue */
  }

  .category-button {
    background-color: #4CAF50; /* Couleur de fond */
    color: white; /* Couleur du texte */
    border: none; /* Supprimer la bordure */
    padding: 15px 32px; /* Espacement du texte à l'intérieur du bouton */
    text-align: center; /* Alignement du texte */
    text-decoration: none; /* Supprimer la décoration du texte */
    display: inline-block; /* Afficher en tant que bloc */
    font-size: 16px; /* Taille de la police */
    margin: 4px 2px; /* Marge extérieure du bouton */
    cursor: pointer; /* Curseur pointeur au survol */
    border-radius: 12px; /* Bordures arrondies */
  }
  
  .category-button:hover {
    background-color: #45a049; /* Couleur de fond au survol */
  }
  </style>
  