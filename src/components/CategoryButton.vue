<!--<template>
    <div class="button-container">
      <button class="category-button" v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">
        {{ category }}
      </button>
      <button class="category-button" @click="resetFilterItems()">
        Reset
      </button>
    </div>
</template>
-->
<template>
  <div>
    <div class="categories">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category"
        v-show="!activeCategory || activeCategory === category.id"
      >
        <button @click="toggleSubCategories(category)" class="btn btn-category">
          {{ category.name }}
        </button>
      </div>
      <button class="btn btn-reset" @click="resetFilterItems">Reset</button>
    </div>
    <div class="subcategories" v-if="activeCategory && subCategories.length">
      <div v-for="subCategory in subCategories" :key="subCategory.id">
        <button
          class="btn btn-subcategory"
          @click="selectCategory(subCategory)"
        >
          {{ subCategory.name }}
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>

export default {
    name: "CategoryButton",
    props: {
      categories: {
        type: Array,
        required: false,
        default: () => []
      }
    },
    data() {
      return {
        activeCategory: null,
        subCategories: []
      };
    },
    methods: {
      toggleSubCategories(category) {
        if (this.activeCategory === category.id) {
          this.activeCategory = null;
          this.subCategories = [];
        } else {
          this.activeCategory = category.id;
          this.$emit('category-clicked', category);
        }
      },
      selectCategory(category) {
        this.$emit('category-selected', category);
      },
      resetFilterItems() {
        this.activeCategory = null;
        this.subCategories = [];
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
    background-color: #42b983; /* Couleur de fond pour les boutons de catégorie */
    color: #fff;
    border: none;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    min-width: 150px;
    text-align: center;
  }
  .btn-category:hover {
    background-color: #36a572; /* Couleur de fond au survol pour les boutons de catégorie */
  }
  .btn-subcategory {
    background-color: #66cdaa; /* Couleur de fond plus clair pour les boutons de sous-catégorie */
    color: #fff;
    border: none;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    min-width: 120px;
    text-align: center;
    font-size: 0.9em; /* Taille de police plus petite pour les sous-catégories */
  }
  .btn-subcategory:hover {
    background-color: #5bb298; /* Couleur de fond au survol pour les boutons de sous-catégorie */
  }
  .subcategories {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
  }
  </style>
  