<template>
  <div class="proposed-lots">
    <div class="proposed-lots-header">
      <h1>Mes lots proposés</h1>
    </div>
    <div class="proposed-lots-content">
      <MySalesList 
        :items="items" 
        @end-auction="handleEndAuction" 
      />
    </div>
  </div>
</template>

<script>
import MySalesList from '../components/MySalesList.vue';
import CustomerService from '@/services/CustomerService.js';
import ItemService from '@/services/ItemService.js';
import AuctionsService from '@/services/AuctionsService.js';

export default {
  name: "MyProposedLots",
  components: {
    MySalesList
  },
  data() {
    return {
      items: [],
      customerId: null 
    };
  },
  created() {
    this.checkCustomerConnection();
    this.fetchUserSales();
  },
  methods: {
    async fetchUserSales() {
      try {
        if (this.customerId) {
          const response = await CustomerService.getUserSales(this.customerId);
          console.log('Données reçues de l\'API:', response);
          this.items = response;
        } else {
          console.error('Customer ID is not available');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des ventes de l’utilisateur:', error);
      }
    },
    async handleEndAuction(itemId) {
      try {
        const auction = await ItemService.getAuctionByItemId(itemId);
        if (auction && auction.active) {
          await AuctionsService.endAuction(auction.id);
          this.fetchUserSales(); // Rafraîchir la liste après la fin de l'enchère
        } else {
          console.error('L\'enchère n\'est pas active ou n\'existe pas');
        }
      } catch (error) {
        console.error('Erreur lors de la fin de l\'enchère:', error);
      }
    },
    checkCustomerConnection() {
      const customer = localStorage.getItem('customer');
      if (customer) {
        console.log(customer + " MARCHE")
        const parsedCustomer = JSON.parse(customer);
        this.customerId = parsedCustomer.id;
        console.log(parsedCustomer.id);
      } else {
        console.error('No customer found in localStorage');
      }
    }
  },
};
</script>

<style scoped>
.proposed-lots {
  padding: 20px;
}

.proposed-lots-header {
  text-align: center;
  margin-bottom: 40px;
}

.proposed-lots-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
