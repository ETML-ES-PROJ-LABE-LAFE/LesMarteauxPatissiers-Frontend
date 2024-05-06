<template>
    <div>
      <p class="category-button" v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">
        {{ category }}
      </p>
      <p>oui</p>
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
      }
    }
  };
  </script>
  
  <style scoped>
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
  