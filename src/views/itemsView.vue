<template>
  <div class="home">
    <div class="categories">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category"
        v-show="activeCategory === null || activeCategory === category.id"
      >
        <button @click="toggleSubCategories(category.id)" class="btn btn-category">
          {{ category.name }}
        </button>
        <div v-if="category.id === activeCategory" class="subcategories">
          <button
            v-for="subCategory in category.subCategories"
            :key="subCategory.id"
            class="btn btn-subcategory"
          >
            {{ subCategory.name }}
          </button>
        </div>
      </div>
    </div>
    <itemList v-bind:categoryNameInFiltrer="categoryNameInFiltrer" v-bind:items="items"></itemList>
  </div>
</template>

<script>
// @ is an alias to /src
import itemList from "@/components/itemList.vue";
import itemServices from "@/services/itemService.js";
import CategoryService from "@/services/CategoryService";

export default {
  name: "ItemView",
  components: {
    itemList,
  },
  data() {
    return {
      items: [],
      categories: [],
      categoryNameInFiltrer: "",
      activeCategory: null,
    };
  },
  methods: {
    async getItems() {
      try {
        const items = await itemServices.getItems(); // Assurez-vous que la méthode est async et utilise await
        this.items = items; // Stockez les données récupérées dans la data du composant
        this.categoryNameInFiltrer = "";
      } catch (error) {
        console.error("Erreur lors de la récupération des items: ", error);
      }
    },
    async getCategory() {
      try {
        const categories = await CategoryService.getCategory();
        this.categories = categories;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories: ", error);
      }
    },
    async onCategorySelected(category) {
      try {
        const items = await itemServices.getItemsByCategory(category); // Assurez-vous que la méthode est async et utilise await
        this.items = items; // Stockez les données récupérées dans la data du composant
        this.categoryNameInFiltrer = category;
      } catch (error) {
        console.error("Erreur lors de la récupération des items: ", error);
      }
    },
    toggleSubCategories(categoryId) {
      this.activeCategory = this.activeCategory === categoryId ? null : categoryId;
    },
  },
  created() {
    this.getItems();
    this.getCategory();
  },
};
</script>

<style scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}
.category {
  margin: 10px;
  text-align: center;
}
.btn-category {
  background-color: #42b983; /* Couleur de fond pour les boutons de catégorie */
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  min-width: 150px;
  text-align: center;
}
.btn-category:hover {
  background-color: #36a572; /* Couleur de fond au survol pour les boutons de catégorie */
}
.btn-subcategory {
  background-color: #66cdaa; /* Couleur de fond plus clair pour les boutons de sous-catégorie */
  color: #fff;
  border: none;
  padding: 8px 12px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  min-width: 120px;
  text-align: center;
  font-size: 0.9em; /* Taille de police plus petite pour les sous-catégories */
}
.btn-subcategory:hover {
  background-color: #5bb298; /* Couleur de fond au survol pour les boutons de sous-catégorie */
}
.subcategories {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
</style>
