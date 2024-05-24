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
    <itemList
      :categoryNameInFiltrer="categoryNameInFiltrer"
      :items="filteredItems"
      @reset-pagination="resetPagination"
    ></itemList>
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
      filteredItems: [],
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
        // permet d'ajouter le nom de la catégorie à la colonne catégorie
        const itemsWithCategoryNames = await Promise.all(items.map(async (item) => {
          const category = await CategoryService.getCategoryById(item.categoryId);
          return { ...item, categoryName: category.name };
        }));
        this.items = itemsWithCategoryNames;
        this.filteredItems = itemsWithCategoryNames;
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
    onSubCategorySelected(subCategory) {
      this.filteredItems = this.items.filter(item => item.categoryId === subCategory.id);
      this.categoryNameInFiltrer = subCategory.name;
      this.resetPagination();
    },
    resetItems() {
      this.activeCategory = null;
      this.subCategories = [];
      this.filteredItems = this.items; // Réinitialiser pour afficher tous les items
      this.categoryNameInFiltrer = "";
      this.resetPagination();
    },
    resetPagination() {
      this.$emit('reset-pagination');
    }
  },
  created() {
    this.getItems();
    this.getCategory();
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
