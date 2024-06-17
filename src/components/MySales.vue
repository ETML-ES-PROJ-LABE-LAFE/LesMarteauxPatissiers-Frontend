<template>
  <div class="item-card">
    <div class="item-details" @click="handleItemClick">
      <div class="item-field">
        <strong>Numéro:</strong> {{ shortenReference(item.reference) }}
      </div>
      <div class="item-field">
        <strong>Nom:</strong> {{ item.name }}
      </div>
      <div class="item-field">
        <strong>Description:</strong> <span class="description">{{ item.description }}</span>
      </div>
      <div class="item-field">
        <strong>Prix initial:</strong> {{ initialPriceCHF }}
      </div>
      <div class="item-field">
        <strong>Prix actuel:</strong> {{ actualPriceCHF }}
      </div>
    </div>
    <button @click.stop="endAuction" class="end-auction-button">Terminer l'enchère</button>
    <div class="click-icon" @click="handleItemClick">
      <font-awesome-icon icon="hand-pointer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySales',
  props: {
    item: {
      type: Object,
      required: true
    },
    lastBid: {
      type: Number,
      required: true
    }
  },
  computed: {
    initialPriceCHF() {
      return this.item.initialPrice + " CHF";
    },
    actualPriceCHF() {
      return this.lastBid + " CHF";
    }
  },
  methods: {
    shortenReference(reference) {
      return reference.substring(0, 8);
    },
    handleItemClick() {
      this.$emit('item-clicked', this.item.id);
    },
    endAuction() {
      this.$emit('end-auction', this.item.id);
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
  justify-content: space-between;
  gap: 24px;
  transition: transform 0.2s, border 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  align-items: center;
  flex-wrap: wrap;
}
.item-card:hover {
  transform: scale(1.07);
  border: 3px solid #42b983;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.item-details {
  display: flex;
  gap: 16px;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  cursor: pointer;
}
.item-field {
  display: flex;
  gap: 8px;
}
.item-field strong {
  color: #333;
}
.description {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.click-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 24px;
  color: #42b983;
  cursor: pointer;
}
.end-auction-button {
  padding: 10px;
  margin-left: auto;
  margin-right: 35px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
}
.end-auction-button:hover {
  background-color: #ff1a1a;
}
</style>
