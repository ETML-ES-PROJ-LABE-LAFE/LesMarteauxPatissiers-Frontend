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
import { useToast } from 'vue-toastification';

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
      const toast = useToast();
      try {
        if (this.customerId) {
          const response = await CustomerService.getUserPurchases(this.customerId);
          this.items = response;
          this.initializeLastBids();
        } else {
          toast.error('Customer ID is not available');
        }
      } catch (error) {
        toast.error('Aucune enchères de l’utilisateur: ' + error.message);
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
