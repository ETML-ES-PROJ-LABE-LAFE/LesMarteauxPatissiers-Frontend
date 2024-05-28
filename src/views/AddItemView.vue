<template>
  <div>
    <AddItemComponent 
      :parentCategories="parentCategories" 
      :subCategories="subCategories" 
      :form="form"
      @add-item="addItem"
      @category-changed="fetchSubCategories"
    />
  </div>
</template>

<script>
import AddItemComponent from '@/components/AddItem.vue';
import itemService from '@/services/itemService.js';
import categoryService from '@/services/CategoryService.js';

export default {
  components: {
    AddItemComponent
  },
  data() {
    return {
      form: {
        name: '',
        categoryId: '',
        subCategoryId: 0,
        description: '',
        initialPrice: 0,
      },
      parentCategories: [],
      subCategories: []
    };
  },
  methods: {
    async addItem(newItem) {
      try {
        await itemService.addItem(newItem);
        console.log('Item ajouté avec succès');
        this.showSuccessAlert();
        this.$router.push('/');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'item:', error);
      }
    },
    async fetchParentCategories() {
      try {
        const parentCategories = await categoryService.getParentCategories();
        this.parentCategories = parentCategories;
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories parentes:', error);
      }
    },
    async fetchSubCategories(categoryId) {
      try {
        const subCategories = await categoryService.getSubCategories(categoryId);
        this.subCategories = subCategories;
      } catch (error) {
        console.error('Erreur lors de la récupération des sous-catégories:', error);
        this.subCategories = [];
      }
    },
    showSuccessAlert() {
      alert("L'item a été ajouté avec succès!");
    }
  },
  created() {
    this.fetchParentCategories();
  }
};
</script>
