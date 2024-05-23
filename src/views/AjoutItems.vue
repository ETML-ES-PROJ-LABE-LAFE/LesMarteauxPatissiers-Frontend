<template>
    <div class="ajout-items">
      <h1>Ajout d'un nouvel item</h1>
      <form @submit.prevent="addItem">
        <div class="form-group">
          <label for="name">Nom:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="category">Catégorie:</label>
          <select id="category" v-model="category" required>
            <option disabled value="">Sélectionnez une catégorie</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="subCategory">Sous-Catégorie:</label>
          <select id="subCategory" v-model="subCategory" required>
            <option disabled value="">Sélectionnez une sous-catégorie</option>
            <option v-for="subCat in subCategories" :key="subCat.id" :value="subCat.name">{{ subCat.name }}</option>
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
          <button type="submit">Ajouter l'item</button>
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
        category: '',
        subCategory: '',
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
          category: this.category,
          subCategory: this.subCategory,
          description: this.description,
          initialPrice: this.initialPrice
        };
  
        try {
          await itemService.addItem(newItem);
          this.$router.push('/'); // Rediriger vers la page d'accueil après l'ajout
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
      }
    },
    watch: {
      category(newCategory) {
        const selectedCategory = this.categories.find(cat => cat.name === newCategory);
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
    margin: 0 auto;
    padding: 20px;
    background-color: #2c3e50;
    color: white;
    border-radius: 8px;
  }
  .ajout-items h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .form-group button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .form-group button:hover {
    background-color: #3498db;
  }
  </style>
  