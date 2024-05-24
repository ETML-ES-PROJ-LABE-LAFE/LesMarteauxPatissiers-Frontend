<template>
  <div class="subcategories" v-if="subCategories.length">
    <div v-for="subCategory in subCategories" :key="subCategory.id">
      <button
        class="btn btn-subcategory"
        @click="selectSubCategory(subCategory)"
      >
        {{ subCategory.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubCategoryButton",
  props: {
    subCategories: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectSubCategory(subCategory) {
      this.$emit('subcategory-selected', subCategory);
    }
  }
};
</script>

<style scoped>
.subcategories {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
.btn-subcategory {
  background-color: #66cdaa;
  color: #fff;
  border: none;
  padding: 8px 12px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  min-width: 120px;
  text-align: center;
  font-size: 0.9em;
}
.btn-subcategory:hover {
  background-color: #5bb298;
}
</style>
