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
    <ItemList
      :categoryNameInFiltrer="categoryNameInFiltrer"
      :items="filteredItems"
      @reset-pagination="resetPagination"
    />
  </div>
</template>

<script>
import ItemList from "@/components/ItemList.vue";
import ItemServices from "@/services/ItemService.js";
import CategoryButton from "@/components/CategoryButton.vue";
import SubCategoryButton from "@/components/SubCategoryButton.vue";
import CategoryService from "@/services/CategoryService";
import { useToast } from 'vue-toastification';

export default {
  name: "ItemView",
  components: {
    ItemList,
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
      activeSubCategory: null,
    };
  },
  methods: {
    async getItems() {
      const toast = useToast();
      try {
        const items = await ItemServices.getItems();
        const itemsWithCategoryNames = await Promise.all(items.map(async (item) => {
          const category = await CategoryService.getCategoryById(item.categoryId);
          return { ...item, categoryName: category.name };
        }));
        this.items = itemsWithCategoryNames;
        this.filteredItems = itemsWithCategoryNames;
        this.categoryNameInFiltrer = "";
      } catch (error) {
        toast.error("Erreur lors de la récupération des items: " + error.message);
      }
    },
    async getCategory() {
      const toast = useToast();
      try {
        const categories = await CategoryService.getParentCategories();
        this.categories = categories;
      } catch (error) {
        toast.error("Erreur lors de la récupération des catégories: " + error.message);
      }
    },
    async onCategoryClicked(category) {
      const toast = useToast();
      try {
        this.activeCategory = category.id;
        const subCategories = await CategoryService.getSubCategories(category.id);
        this.subCategories = subCategories;

        const subCategoryIds = subCategories.map(subCat => subCat.id);
        this.filteredItems = this.items.filter(item => subCategoryIds.includes(item.categoryId));

        this.categoryNameInFiltrer = category.name;
        this.resetPagination();
      } catch (error) {
        toast.error("Erreur lors de la récupération des sous-catégories: " + error.message);
      }
    },
    onSubCategorySelected(subCategory) {
      this.activeSubCategory = subCategory.id;
      this.filteredItems = this.items.filter(item => item.categoryId === subCategory.id);
      this.categoryNameInFiltrer = subCategory.name;
      this.resetPagination();
    },
    resetItems() {
      this.activeCategory = null;
      this.activeSubCategory = null;
      this.subCategories = [];
      this.filteredItems = this.items; 
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
@/services/ItemService.js