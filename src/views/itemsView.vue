<template>
  <div class="home">
    <CategoryButton
      v-bind:categories="categories"
      v-bind:subCategories="subCategories"
      v-bind:activeCategory="activeCategory"
      @category-clicked="onCategoryClicked"
      @category-selected="onCategorySelected"
      @reset-filter-items="resetItems"
    />
    <itemList v-bind:categoryNameInFiltrer="categoryNameInFiltrer" v-bind:items="items"></itemList>
  </div>
</template>
<script>
// @ is an alias to /src
import itemList from "@/components/itemList.vue";
import itemServices from "@/services/itemService.js";
import CategoryButton from "@/components/CategoryButton.vue";
import CategoryService from "@/services/CategoryService";
export default {
  name: "ItemView",
  components: {
    itemList,
    CategoryButton,
  },
  data() {
    return {
      items: [],
      categories: [],
      subCategories: [],
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
        const categories = await CategoryService.getParentCategories();
        this.categories = categories;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories: ", error);
      }
    },
    async onCategoryClicked(category) {
      try {
        this.activeCategory = category.id;
        this.subCategories = await CategoryService.getSubCategories(category.id);
      } catch (error) {
        console.error("Erreur lors de la récupération des sous-catégories: ", error);
      }
    },
    async onCategorySelected(category) {
      try {
        const items = await itemServices.getItemsByCategory(category.id);
        this.items = items;
        this.categoryNameInFiltrer = category.name;
      } catch (error) {
        console.error("Erreur lors de la récupération des items: ", error);
      }
    },
  },
  created() {
    this.getItems();
    this.getCategory();
  },
};
</script>