<template>
  <div class="bid-lots">
    <div class="bid-lots-header">
      <h1>Mes lots enchéris</h1>
    </div>
    <div class="bid-lots-content">
      <MyBidList :items="items"/>
    </div>
  </div>
</template>

<script>
import MyBidList from '../components/MyBidList.vue';
import CustomerService from '@/services/CustomerService.js';

export default {
  name: "MyBidLots",
  components: {
    MyBidList
  },
  data() {
    return {
      items: [],
      customerId: null,
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
          const response = await CustomerService.getUserPurchases(this.customerId);
          console.log('Données reçues de l\'API:', response);
          this.items = response;
          this.initializeLastBids();
        } else {
          console.error('Customer ID is not available');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des enchères de l’utilisateur:', error);
      }
    },
    checkCustomerConnection() {
      const customer = localStorage.getItem('customer');
      if (customer) {
        const parsedCustomer = JSON.parse(customer);
        this.customerId = parsedCustomer.id;
      } else {
        console.error('No customer found in localStorage');
      }
    }
  }
};
</script>

<style scoped>
.bid-lots {
  padding: 20px;
}

.bid-lots-header {
  text-align: center;
  margin-bottom: 40px;
}

.bid-lots-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
