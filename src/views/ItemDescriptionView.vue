<template>
  <div class="container">
    <h1 class="text-center">Détails de l'item</h1>
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="item" class="item-container">
      <ItemDetails :item="item" :isCustomerConnected="isCustomerConnected" :lastBid="lastBid" @open-bid-form="showBidForm = true" />
    </div>
    <div v-else class="error">Erreur lors du chargement de l'item.</div>

    <BidPopup 
      :show="showBidForm" 
      :item="item" 
      @onSubmit="placeBid" 
      @onClose="closeBidForm" 
    />
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import ItemService from '@/services/ItemService';
import ItemDetails from '@/components/ItemDetails.vue';
import BidPopup from '@/components/BidPopup.vue';
import BidService from '@/services/BidService';

export default {
  name: 'ItemDescriptionView',
  components: {
    ItemDetails,
    BidPopup
  },
  data() {
    return {
      item: null,
      loading: true,
      error: null,
      isCustomerConnected: false,
      showBidForm: false,
      customerId: null,
      lastBid: null,
    };
  },
  methods: {
    async fetchItem() {
      const itemId = this.$route.params.id;
      try {
        const response = await ItemService.getItemById(itemId);
        this.item = response;
        this.lastBid = localStorage.getItem(`lastBid_${itemId}`) || response.initialPrice;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    checkCustomerConnection() {
      const customer = localStorage.getItem('customer');
      if (customer) {
        const parsedCustomer = JSON.parse(customer);
        this.customerId = parsedCustomer.id;
        this.isCustomerConnected = true;
      } else {
        this.isCustomerConnected = false;
      }
    },
    shortenReference(reference) {
      return reference.substring(0, 8);
    },
    openBidForm() {
      this.showBidForm = true;
    },
    closeBidForm() {
      this.showBidForm = false;
    },
    reloadPage() {
      this.$router.go(0); // Recharger la page actuelle
    },
    async placeBid(bidAmount) {
      const toast = useToast();
      if (bidAmount <= 0) {
        toast.error('Le montant de la mise doit être supérieur à zéro.');
        return;
      }
      try {
        const bidTime = new Date().toISOString(); // Obtenir la date/heure actuelle
        const dataAuction = await ItemService.getAuctionByItemId(this.item.id);
        const dataBid = await BidService.addBid({
          itemId: this.item.id,
          appUserId: this.customerId,
          auctionId: dataAuction.id,
          amount: bidAmount,
          bidTime: bidTime
        });

        this.lastBid = dataBid.amount;
        localStorage.setItem(`lastBid_${this.item.id}`, this.lastBid);
        toast.success('Votre mise a été placée avec succès.');
        this.closeBidForm();
        setTimeout(this.reloadPage, 1600); // Recharger la page après 1600 ms
      } catch (error) {
        toast.error('Erreur lors de la mise: ' + error.message);
      }
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
