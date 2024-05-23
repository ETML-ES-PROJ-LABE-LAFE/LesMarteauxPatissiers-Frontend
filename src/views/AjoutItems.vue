<template>
    <div class="ajout-items">
      <h1>Ajout d'un nouveau lot</h1>
      <form @submit.prevent="addItem">
        <div class="form-group">
          <label for="name">Nom:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="category">Catégorie:</label>
          <select id="category" v-model="categoryId" required>
            <option disabled value="">Sélectionnez une catégorie</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="subCategory">Sous-Catégorie:</label>
          <select id="subCategory" v-model="subCategoryId" required>
            <option disabled value="">Sélectionnez une sous-catégorie</option>
            <option v-for="subCat in subCategories" :key="subCat.id" :value="subCat.id">{{ subCat.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input type="text" id="description" v-model="description" required>
        </div>
        <div class="form-group">
          <label for="initialPrice">Prix initial:</label>
          <input type="number" id="initialPrice" v-model="initialPrice" required>
        </div>
        <div class="form-group">
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import itemService from '@/services/itemService.js';
  import categoryService from '@/services/CategoryService.js';
  
  export default {
    name: 'AjoutItems',
    data() {
      return {
        name: '',
        categoryId: '',
        subCategoryId: '',
        description: '',
        initialPrice: 0,
        categories: [],
        subCategories: []
      };
    },
    methods: {
      async addItem() {
        const newItem = {
          name: this.name,
          category: { id: this.categoryId },
          subCategory: { id: this.subCategoryId },
          description: this.description,
          initialPrice: this.initialPrice
        };
  
        console.log('Tentative d\'ajout de l\'item:', newItem); // Debug: log de l'item à ajouter
  
        try {
          await itemService.addItem(newItem);
          console.log('Item ajouté avec succès'); // Debug: confirmation d'ajout
          this.showSuccessAlert();
          this.$router.push('/');
        } catch (error) {
          console.error('Erreur lors de l\'ajout de l\'item:', error);
        }
      },
      async fetchCategories() {
        try {
          const categories = await categoryService.getCategory();
          this.categories = categories;
        } catch (error) {
          console.error('Erreur lors de la récupération des catégories:', error);
        }
      },
      showSuccessAlert() {
        alert("L'item a été ajouté avec succès!");
      }
    },
    watch: {
      categoryId(newCategoryId) {
        const selectedCategory = this.categories.find(cat => cat.id === newCategoryId);
        this.subCategories = selectedCategory ? selectedCategory.subCategories : [];
      }
    },
    created() {
      this.fetchCategories();
    }
  };
  </script>
  
  <style scoped>
  .ajout-items {
    max-width: 600px;
    margin: 50px auto 0; /* Ajout d'une marge en haut de 50px */
    padding: 20px;
    background-color: #333; /* Fond noir correspondant à la barre de menu */
    color: #fff; /* Texte blanc */
    border-radius: 8px;
  }
  .ajout-items h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #42b983; /* Vert pour le titre */
  }
  .form-group {
    margin-bottom: 20px;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #42b983; /* Vert pour les labels */
  }
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #444; /* Fond gris foncé pour les champs */
    color: #fff; /* Texte blanc pour les champs */
  }
  .form-group button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #42b983; /* Fond vert pour le bouton */
    color: #000; /* Texte noir pour le bouton */
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .form-group button:hover {
    background-color: #36a572; /* Vert plus foncé au survol */
  }
  </style>
  