<template>
  <div class="container">
    <div v-if="paginatedItems.length === 0" class="no-items-message">
      Aucun lot à afficher.
    </div>
    <div v-else>
      <div class="items-list">
        <MyBid 
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
  </div>
</template>

<script>
import MyBid from './MyBid.vue';

export default {
  name: "MyBidList",
  components: {
    MyBid
  },
  props: {
    items: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    paginatedItems() {
      if (!Array.isArray(this.items)) {
        return [];
      }
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
.no-items-message {
  text-align: center;
  font-size: 1.2em;
  color: #999;
  margin-top: 20px;
}
.items-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
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
