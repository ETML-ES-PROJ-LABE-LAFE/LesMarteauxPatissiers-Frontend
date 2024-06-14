<template>
  <div>
    <select v-if="customers.length" :value="selectedCustomer?.id" @change="updateCustomer" class="custom-select">
      <option v-for="customer in customers" :key="customer.id" :value="customer.id">
        {{ customer.nom }} {{ customer.prenom }} [Solde : {{ customer.credit }}]
      </option>
      <option :value="null">Disconnect</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "CustomerList",
  props: {
    customers: {
      type: Array,
      required: true
    },
    selectedCustomer: {
      type: Object,
      default: null
    }
  },
  methods: {
    updateCustomer(event) {
      const selectedId = event.target.value;
      if (selectedId === "null") {
        this.$emit('update:selectedCustomer', null);
        this.$emit('customerChanged');
      } else {
        const selected = this.customers.find(customer => customer.id === +selectedId);
        this.$emit('update:selectedCustomer', selected);
        this.$emit('customerChanged');
      }
    }
  }
};
</script>

<style scoped>
.custom-select {
  padding: 10px;
  font-size: 16px;
  margin-top: 20px;
  background-color: #333;
  color: #fff;
  border: 1px solid #42b983;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.custom-select:hover {
  background-color: #42b983;
  color: #333;
}
</style>
