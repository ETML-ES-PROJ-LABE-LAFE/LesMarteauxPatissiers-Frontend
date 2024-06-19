<template>
    <div class="sold-lots">
      <div class="sold-lots-header">
        <h1>Mes lots vendus</h1>
      </div>
      <div class="sold-lots-content">
        <SoldLotsList :items="items"/>
      </div>
    </div>
  </template>
  
  <script>
  import SoldLotsList from '../components/SoldLotsList.vue';
  import CustomerService from '@/services/CustomerService.js';
  
  export default {
    name: "MySoldLotsView",
    components: {
      SoldLotsList
    },
    data() {
      return {
        items: [],
        customerId: null,
      };
    },
    created() {
      this.checkCustomerConnection();
      this.fetchUserSoldLots();
    },
    methods: {
      async fetchUserSoldLots() {
        try {
          if (this.customerId) {
            const response = await CustomerService.getUserSold(this.customerId);
            console.log('Données reçues de l\'API:', response);
            this.items = response;
            this.initializeLastBids();
          } else {
            console.error('Customer ID is not available');
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des lots vendus de l’utilisateur:', error);
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
  .sold-lots {
    padding: 20px;
  }
  
  .sold-lots-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .sold-lots-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  </style>
  