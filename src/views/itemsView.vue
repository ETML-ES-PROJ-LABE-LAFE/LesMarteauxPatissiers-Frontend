<template>
  <div>
    <CategoryButton
      :categories="categories"
      @category-clicked="onCategoryClicked"
      @reset-filter-items="resetItems"
    />
    <SubCategoryButton
      :subCategories="subCategories"
      @subcategory-selected="onSubCategorySelected"
    />
    <itemList :categoryNameInFiltrer="categoryNameInFiltrer" :items="items"></itemList>
  </div>
</template>

<script>
import itemList from "@/components/itemList.vue";
import itemServices from "@/services/itemService.js";
import CategoryButton from "@/components/CategoryButton.vue";
import SubCategoryButton from "@/components/SubCategoryButton.vue";
import CategoryService from "@/services/CategoryService";

export default {
  name: "ItemView",
  components: {
    itemList,
    CategoryButton,
    SubCategoryButton,
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
        const items = await itemServices.getItems(); 
        this.items = items; 
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
    async onSubCategorySelected(subCategory) {
      try {
        const items = await itemServices.getItemsByCategory(subCategory.id);
        this.items = items;
        this.categoryNameInFiltrer = subCategory.name;
      } catch (error) {
        console.error("Erreur lors de la récupération des items: ", error);
      }
    },
    resetItems() {
      this.activeCategory = null;
      this.subCategories = [];
      this.getItems();
    }
  },
  created() {
    this.getItems();
    this.getCategory();
  },
};
</script>
