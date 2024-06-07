<template>
  <div class="container">
    <h1 class="text-center">Détails de l'item</h1>
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="item" class="item-container">
      <ItemDetails :item="item" :isCustomerConnected="isCustomerConnected" />
    </div>
    <div v-else class="error">Erreur lors du chargement de l'item.</div>
  </div>
</template>
 
<script>
import itemService from '@/services/itemService';
import ItemDetails from '@/components/ItemDetails.vue';
 
export default {
  name: 'ItemDescriptionView',
  components: {
    ItemDetails
  },
  data() {
    return {
      item: null,
      loading: true,
      error: null,
      isCustomerConnected: false // Simuler l'état de connexion du customer
    };
  },
  methods: {
    async fetchItem() {
      const itemId = this.$route.params.id;
      try {
        const response = await itemService.getItemById(itemId);
        this.item = response;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    checkCustomerConnection() {
      this.isCustomerConnected = !!localStorage.getItem('customer');
    }
  },
  created() {
    this.fetchItem();
    this.checkCustomerConnection();
  }
};
</script>
 
<style scoped>
.container {
  padding: 20px;
}
.loading {
  text-align: center;
  font-size: 1.5em;
}
.item-container {
  display: flex;
  justify-content: center;
}
.error {
  text-align: center;
  color: red;
  font-size: 1.2em;
}
</style>