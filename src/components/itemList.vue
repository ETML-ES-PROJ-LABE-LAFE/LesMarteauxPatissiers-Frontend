<template>
  <div class="container">
    <h1 class="text-center">Lots</h1>
    <p>Filtrer par : {{ categoryNameInFiltrer }}</p>
    <div class="items-list">
      <ItemObj 
        v-for="item in paginatedItems" 
        :key="item.id" 
        :item="item" 
        @item-clicked="handleItemClicked" 
      />
    </div>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage" :class="{ disabled: currentPage === 1 }">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage" :class="{ disabled: currentPage === totalPages }">Next</button>
    </div>
  </div>
</template>

<script>
import ItemObj from './ItemObj.vue';

export default {
  name: "ItemList",
  components: {
    ItemObj
  },
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
      itemsPerPage: 8,
    };
  },
  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end).map(item => {
        return { ...item, showImage: item.showImage || false };
      });
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
    },
    handleItemClicked(itemId) {
      this.$router.push({ name: 'item-description-view', params: { id: itemId } });
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
.container {
  padding: 20px;
}
.items-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Deux éléments par ligne */
  gap: 24px;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.pagination button {
  margin: 0 10px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.pagination button:hover {
  background-color: #36a572;
}
.pagination button.disabled {
  background-color: #ddd;
  color: #aaa;
  cursor: not-allowed;
}
</style>
