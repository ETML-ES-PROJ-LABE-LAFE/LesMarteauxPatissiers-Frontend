<template>
    <div class="item-card" @click="handleItemClick">
      <div class="item-details">
        <div class="item-field">
          <strong>Numéro:</strong> {{ shortenReference(item.reference) }}
          <strong>Nom:</strong> {{ item.name }}
          <strong>Description:</strong> <span>{{ item.description }}</span>
          <strong>Prix initial:</strong> {{ getInitialPriceCHF }}
          <strong>Prix de vente:</strong> {{ getSoldPriceCHF }}
        </div>
      </div>
      <div class="click-icon">
        <font-awesome-icon icon="hand-pointer" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SoldLot',
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
    methods: {
      shortenReference(reference) {
        return reference.substring(0, 8);
      },
      handleItemClick() {
        this.$emit('item-clicked', this.item.id);
      }
    },
    computed: {
      getInitialPriceCHF() {
        return this.item.initialPrice + " CHF";
      },
      getSoldPriceCHF() {
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
    transition: transform 0.2s, border 0.2s, box-shadow 0.2s;
    cursor: pointer;
    position: relative;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
  .item-card:hover {
    transform: scale(1.07);
    border: 3px solid #42b983;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
  .click-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 24px;
    color: #42b983;
  }
  </style>
  