<template>
  <div id="app">
    <nav>
      <div class="left-section">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="logo-img">
        </div>
        <div class="site-name">
          <h1>ENCHERINO</h1>
        </div>
      </div>
      <div class="right-section">
        <div class="menu">
          <router-link to="/" class="menu-item">Home</router-link>
          <router-link to="/about" class="menu-item">About</router-link>
          <router-link to="/lots" class="menu-item">Lots</router-link>
          <router-link to="/ajout-items" class="menu-item">Ajout de Lots</router-link>
          <div class="customer-dropdown ">
            <CustomerList :customers="customers" :selectedCustomer="selectedCustomer" @update:selectedCustomer="updateSelectedCustomer" />
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import CustomerList from "@/components/CustomerList.vue";
import CustomerService from "@/services/CustomerService.js";

export default {
  name: "App",
  components: {
    CustomerList,
  },
  data() {
    return {
      customers: [],
      selectedCustomer: null,
    };
  },
  async created() {
    try {
      this.customers = await CustomerService.getCustomer();
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error.message);
    }
  },
};
</script>

<style>
nav {
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-img {
  height: 40px;
  width: auto;
}

.site-name {
  font-size: 24px;
  color: #fff;
  margin-left: 10px;
}

.left-section {
  display: flex;
  align-items: center;
}

.right-section {
  display: flex;
  align-items: center;
}

.menu {
  display: flex;
  align-items: center;
}

.menu-item {
  margin: 0 20px;
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.menu-item:hover {
  color: #42b983;
}

.customer-dropdown {
  display: flex;
  align-items: center;
  margin-left: 20px; /* Ajouter un espace entre les liens du menu et la liste déroulante */
  margin-bottom: 20px;
}

.custom-select {
  padding: 5px 10px; /* Réduire le padding pour mieux aligner */
  font-size: 16px;
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
