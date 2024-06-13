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
import { useToast } from 'vue-toastification';
import ItemService from '@/services/ItemService.js';
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
      appUserId: null, 
      itemIdForm: null
    };
  },
  methods: {
    async addItem(newItem) {
      const toast = useToast();
      try {
        newItem.appUserId = this.appUserId;
        var data = await ItemService.addItem(newItem);
        this.itemIdForm = data.id;
        this.auction.itemId = this.itemIdForm;
        await AuctionsService.addAuction(this.auction);
        toast.success("L'item a été ajouté avec succès!");
        this.$router.push('/');
      } catch (error) {
        toast.error('Erreur lors de l\'ajout de l\'item: ' + error.message);
      }
    },
    async fetchParentCategories() {
      const toast = useToast();
      try {
        const parentCategories = await categoryService.getParentCategories();
        this.parentCategories = parentCategories;
      } catch (error) {
        toast.error('Erreur lors de la récupération des catégories parentes: ' + error.message);
      }
    },
    async fetchSubCategories(categoryId) {
      const toast = useToast();
      try {
        const subCategories = await categoryService.getSubCategories(categoryId);
        this.subCategories = subCategories;
      } catch (error) {
        toast.error('Erreur lors de la récupération des sous-catégories: ' + error.message);
        this.subCategories = [];
      }
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

<style scoped>

</style>
@/services/ItemService.js