<template>
    <div class="container">
      <h1 class="text-center">Détails de l'item</h1>
      <div v-if="loading" class="loading">Chargement...</div>
      <div v-else-if="item" class="item-container">
        <ItemDetails :item="item" :isCustomerConnected="isCustomerConnected" @open-bid-modal="openBidModal" />
      </div>
      <div v-else class="error">Erreur lors du chargement de l'item.</div>
  
      <div v-if="showBidModal" class="modal-overlay" @click="closeBidModal">
        <div class="modal" @click.stop>
          <h3>Mise sur {{ item.name }}</h3>
          <form @submit.prevent="placeBid">
            <input type="number" v-model="bidAmount" min="1" placeholder="Entrez votre montant" required>
            <div class="modal-buttons">
              <button type="submit">Confirmer</button>
              <button type="button" @click="closeBidModal">Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import itemService from '@/services/itemService';
  import ItemDetails from '@/components/ItemDetails.vue';
  import bidService from '@/services/BidService'; // Assurez-vous d'importer le bon service
  
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
        isCustomerConnected: false, // Simuler l'état de connexion du customer
        showBidModal: false,
        bidAmount: 0
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
      },
      openBidModal() {
        this.showBidModal = true;
      },
      closeBidModal() {
        this.showBidModal = false;
      },
      async placeBid() {
        if (this.bidAmount <= 0) {
          alert('Le montant de la mise doit être supérieur à zéro.');
          return;
        }
        try {
          await bidService.addBid({ itemId: this.item.id, amount: this.bidAmount });
          alert('Votre mise a été placée avec succès.');
          this.closeBidModal();
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
  .modal-overlay {
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
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    max-width: 80%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .modal h3 {
    margin-top: 0;
  }
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .modal input {
    width: 100%;
    padding: 8px;
    margin-top: 10px;
    box-sizing: border-box;
  }
  </style>
  