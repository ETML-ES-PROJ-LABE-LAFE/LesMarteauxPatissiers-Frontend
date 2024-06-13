<template>
  <div class="container">
    <h1 class="text-center">Détails de l'item</h1>
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="item" class="item-container">
      <ItemDetails :item="item" :isCustomerConnected="isCustomerConnected" :lastBid="lastBid" @open-bid-form="showBidForm = true" />
    </div>
    <div v-else class="error">Erreur lors du chargement de l'item.</div>

    <transition name="fade">
      <div v-if="showBidForm" class="popup-overlay" @click="closeBidForm">
        <div class="popup-card" @click.stop>
          <h3 class="popup-title">
            <span>Mise sur {{ item.name }}</span>
            <span>N° {{shortenReference(item.reference)}}</span>
          </h3>
          <form @submit.prevent="placeBid">
            <input type="number" v-model="bidAmount" min="1" placeholder="Entrez votre montant" required>
            <div class="form-buttons">
              <button type="submit">Confirmer</button>
              <button type="button" @click="closeBidForm">Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ItemService from '@/services/ItemService';
import ItemDetails from '@/components/ItemDetails.vue';
import BidService from '@/services/BidService';

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
      isCustomerConnected: false,
      showBidForm: false,
      bidAmount: 0,
      customerId: null, // Ajouter pour stocker l'ID du client
      lastBid: null
    };
  },
  methods: {
    async fetchItem() {
      const itemId = this.$route.params.id;
      try {
        const response = await ItemService.getItemById(itemId);
        this.item = response;
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
    async placeBid() {
      if (this.bidAmount <= 0) {
        alert('Le montant de la mise doit être supérieur à zéro.');
        return;
      }
      try {
        const bidTime = new Date().toISOString(); // Obtenir la date/heure actuelle

        const data = await ItemService.getAuctionByItemId(this.item.id);
        console.log(" ---" + this.item.id )
        console.log(" ---" + data.id )
        await BidService.addBid({
          itemId: this.item.id,
          appUserId: this.customerId,
          auctionId: data.id,
          amount: this.bidAmount,
          bidTime: bidTime
        });
        alert('Votre mise a été placée avec succès.');
        this.closeBidForm();
      } catch (error) {
        alert('Erreur lors de la mise: ' + error.message);
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
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-card {
  background: white;
  padding: 40px 50px; /* Augmenter la taille de la popup */
  border-radius: 12px; /* Réduire l'arrondi des coins */
  width: 600px; /* Augmenter la largeur */
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.popup-card h3 {
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
}
.popup-card h3 span {
  display: block;
}
.popup-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.popup-card form {
  display: flex;
  flex-direction: column;
}
.popup-card input {
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
.form-buttons {
  display: flex;
  justify-content: space-between;
}
.form-buttons button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.form-buttons button[type="submit"] {
  background-color: #42b983;
  color: white;
}
.form-buttons button[type="button"] {
  background-color: #ddd;
  color: #333;
}
.form-buttons button:hover:not(:disabled) {
  background-color: #36a572;
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
