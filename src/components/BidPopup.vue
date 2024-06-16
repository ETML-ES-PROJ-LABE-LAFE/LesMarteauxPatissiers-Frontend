<template>
  <transition name="fade">
    <div v-if="show" class="popup-overlay" @click="closePopup">
      <div class="popup-card" @click.stop>
        <h3 class="popup-title">
          <span>Mise sur {{ item.name }}</span>
          <span>N° {{ shortenReference(item.reference) }}</span>
        </h3>
        <form @submit.prevent="submitBid">
          <input type="number" v-model="bidAmount" min="1" placeholder="Entrez votre montant" required>
          <div class="form-buttons">
            <button type="submit">Confirmer</button>
            <button type="button" @click="closePopup">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BidPopup',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      bidAmount: 0
    };
  },
  methods: {
    shortenReference(reference) {
      return reference.substring(0, 8);
    },
    submitBid() {
      this.$emit('onSubmit', this.bidAmount);
    },
    closePopup() {
      this.$emit('onClose');
    }
  }
};
</script>

<style scoped>
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
  padding: 40px 50px;
  border-radius: 12px;
  width: 600px;
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
</style>
