<template>
  <div class="categories">
    <div
      v-for="category in categories"
      :key="category.id"
      class="category"
      v-show="!activeCategory || activeCategory === category.id"
    >
      <button @click="toggleCategory(category)" class="btn btn-category">
        {{ category.name }}
      </button>
    </div>
    <div class="category">
      <button class="btn btn-category btn-reset" @click="resetCategoryButtons">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryButton",
  props: {
    categories: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      activeCategory: null
    };
  },
  methods: {
    toggleCategory(category) {
      if (this.activeCategory === category.id) {
        this.activeCategory = null;
        this.$emit('reset-filter-items');
      } else {
        this.activeCategory = category.id;
        this.$emit('category-clicked', category);
      }
    },
    resetCategoryButtons() {
      this.activeCategory = null;
      this.$emit('reset-filter-items');
    }
  }
};
</script>

<style scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}
.category {
  margin: 10px;
  text-align: center;
}
.btn-category {
  background-color: #42b983;
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  min-width: 150px;
  text-align: center;
  box-sizing: border-box;
}
.btn-category:hover {
  background-color: #36a572;
}
.btn-reset {
  background-color: #ff6347;
}
.btn-reset:hover {
  background-color: #e5533d;
}
</style>
