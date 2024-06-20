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
import { useToast } from 'vue-toastification';

export default {
  name: "MyProposedLots",
  components: {
    MySalesList
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
      const toast = useToast();
      try {
        if (this.customerId) {
          const response = await CustomerService.getUserSales(this.customerId);
          console.log('Données reçues de l\'API:', response);
          this.items = response;
        } else {
          toast.error('Customer ID is not available');
        }
      } catch (error) {
        toast.error('Aucune ventes de l’utilisateur: ' + error.message);
      }
    },
    async handleEndAuction(itemId) {
      const toast = useToast();
      try {
        const auction = await ItemService.getAuctionByItemId(itemId);
        if (auction && auction.active) {
          await AuctionsService.endAuction(auction.id);
          const item = this.items.find(item => item.id === itemId);
          if (item) {
            const lastBid = Number(localStorage.getItem(`lastBid_${item.id}`)) || item.initialPrice;
            localStorage.setItem(`finalBid_${item.id}`, lastBid);
            Number(localStorage.setItem(`lastBid_${item.id}`, item.initialPrice));
          }
          this.fetchUserSales();
        } else {
          toast.error('L\'enchère n\'est pas active ou n\'existe pas');
        }
        this.$router.go();
      } catch (error) {
        toast.error('Erreur lors de la fin de l\'enchère: ' + error.message);
      }
    },
    checkCustomerConnection() {
      const toast = useToast();
      const customer = localStorage.getItem('customer');
      if (customer) {
        const parsedCustomer = JSON.parse(customer);
        this.customerId = parsedCustomer.id;
      } else {
        toast.error('No customer found in localStorage');
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
