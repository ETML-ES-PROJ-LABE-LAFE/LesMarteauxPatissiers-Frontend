<template>
  <div class="item-card">
    <div class="item-image">
      Image
    </div>
    <div class="item-details">
      <div class="item-field">
        <strong>Nom:</strong> {{ item.name }}
      </div>
      <div class="item-field">
        <strong>Numéro:</strong> {{ shortenReference(item.reference) }}
      </div>
      <div class="item-field">
        <strong>Prix initial:</strong> {{ getInitialPriceCHF }}
      </div>
      <div class="item-field item-description">
        <strong>Description:</strong> <span>{{ item.description }}</span>
      </div>
      <div class="item-field">
        <strong>Prix actuel:</strong> {{ getActualPriceCHF }}
      </div>
        <button :disabled="!isCustomerConnected || !auctionExists" class="action-button" @click="$emit('open-bid-form')">
          <template v-if="isCustomerConnected">
            <template v-if="auctionExists">Miser</template>
            <template v-else>Il n'y a pas d'enchère actuellement</template>
          </template>
          <template v-else>Connectez-vous pour Miser</template>
        </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemDetails',
  props: {
    item: {
      type: Object,
      required: true
    },
    isCustomerConnected: {
      type: Boolean,
      required: true
    },
    lastBid: {
      type: Number,
      required: true
    },
    auctionExists: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    shortenReference(reference) {
      return reference.substring(0, 8);
    }
  },
  computed: {
    getInitialPriceCHF() {
      return this.item.initialPrice + " CHF";
    },
    getActualPriceCHF() {
      return this.lastBid + " CHF";
    }
  }
};
</script>

<style scoped>
.item-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #f3f3f3;
  display: flex;
  gap: 24px;
  position: relative;
}
.item-image {
  width: 150px;
  height: 150px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}
.item-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.item-field {
  display: flex;
  gap: 16px;
}
.item-field strong {
  color: #333;
}
.action-button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  align-self: flex-start;
}
.action-button:disabled {
  background-color: #ddd;
  color: #aaa;
  cursor: not-allowed;
}
.action-button:hover:not(:disabled) {
  background-color: #36a572;
}
</style>
