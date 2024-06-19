<template>
    <div class="won-lots">
      <div class="won-lots-header">
        <h1>Mes lots gagnés</h1>
      </div>
      <div class="won-lots-content">
        <WonLotsList :items="items"/>
      </div>
    </div>
  </template>
  
  <script>
  import WonLotsList from '../components/WonLotsList.vue';
  import CustomerService from '@/services/CustomerService.js';
  
  export default {
    name: "WonLotsView",
    components: {
      WonLotsList
    },
    data() {
      return {
        items: [],
        customerId: null,
      };
    },
    created() {
      this.checkCustomerConnection();
      this.fetchUserWonLots();
    },
    methods: {
      async fetchUserWonLots() {
        try {
          if (this.customerId) {
            const response = await CustomerService.getUserWon(this.customerId);
            console.log('Données reçues de l\'API:', response);
            this.items = response;
            this.initializeLastBids();
          } else {
            console.error('Customer ID is not available');
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des lots gagnés de l’utilisateur:', error);
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
      },
      initializeLastBids() {
        this.items.forEach(item => {
          const lastBid = localStorage.getItem(`lastBid_${item.id}`);
          if (lastBid) {
            localStorage.setItem(`lastBid_${item.id}`, Number(lastBid));
          } else {
            localStorage.setItem(`lastBid_${item.id}`, item.initialPrice);
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .won-lots {
    padding: 20px;
  }
  
  .won-lots-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .won-lots-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  </style>
  