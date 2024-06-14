<template>
  <div class="proposed-lots">
    <div class="proposed-lots-header">
      <h1>Mes lots proposés</h1>
    </div>
    <div class="proposed-lots-content">
      <MySalesList :items="items"/>
    </div>
  </div>
</template>

<script>
import MySalesList from '../components/MySalesList.vue'; // Assurez-vous que le chemin est correct
import CustomerService from '@/services/CustomerService.js'; // Importer le service

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
