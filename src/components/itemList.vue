<template>
  <div class="container">
    <h1 class="text-center">Lots</h1>
    <p>Filtrer par : {{ categoryNameInFiltrer }}</p>
    <table class="table table-striped">
      <thead>
        <th>Nom</th>
        <th>Catégorie</th>
        <th>Description</th>
        <th>Prix initial</th>
        <th>Prix actuel</th>
      </thead>
      <tbody>
        <tr v-for="item in paginatedItems" v-bind:key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.categoryName }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.initialPrice }}</td>
          <td>{{ item.lastBid }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "itemList",
  props: {
    items: {
      type: Array,
      required: true,
    },
    categoryNameInFiltrer: String
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 50
    };
  },
  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    resetPagination() {
      this.currentPage = 1;
    }
  },
  watch: {
    items() {
      this.resetPagination();
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.pagination button {
  margin: 0 10px;
}
</style>
