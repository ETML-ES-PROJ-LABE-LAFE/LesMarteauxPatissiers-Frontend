<template>
  <div>
    <AddItem
      :parentCategories="parentCategories"
      :subCategories="subCategories"
      :form="form"
      :isCustomerConnected="isCustomerConnected"
      @add-item="addItem"
      @category-changed="fetchSubCategories"
    />
  </div>
</template>

<script>
import AddItem from '@/components/AddItem.vue';
import itemService from '@/services/itemService.js';
import AuctionsService from '@/services/AuctionsService.js';
import categoryService from '@/services/CategoryService.js';

export default {
  components: {
    AddItem
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
      auction : {
        itemId: null,
      },
      parentCategories: [],
      subCategories: [],
      isCustomerConnected: false,
      appUserId: null, // Nouvelle variable pour stocker l'ID de l'utilisateur
      itemIdForm: null
    };
  },
  methods: {
    async addItem(newItem) {
      try {
        newItem.appUserId = this.appUserId;
        var data = await itemService.addItem(newItem);
        this.itemIdForm = data.id;
        //permet de renseigner l'item id à l'auction
        this.auction.itemId = this.itemIdForm;
        var dataAuction = await AuctionsService.addAuction(this.auction);
        console.log('Item ajouté avec succès ' + dataAuction.id);
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
    },
    checkCustomerConnection() {
      const customer = JSON.parse(localStorage.getItem('customer'));
      if (customer && customer.id) {
        this.appUserId = customer.id;
        this.isCustomerConnected = true;
      }
    }
  },
  created() {
    this.fetchParentCategories();
    this.checkCustomerConnection();
   
  }
};
</script>
