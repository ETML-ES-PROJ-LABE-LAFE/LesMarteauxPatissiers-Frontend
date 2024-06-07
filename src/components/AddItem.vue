<template>
  <div class="add-item">
    <h1>Ajout d'un nouveau lot</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nom:</label>
        <input type="text" id="name" v-model="localForm.name" required>
      </div>
      <div class="form-group">
        <label for="category">Catégorie:</label>
        <select id="category" v-model="localForm.categoryId" @change="handleCategoryChange" required>
          <option disabled value="">Sélectionnez une catégorie</option>
          <option v-for="cat in parentCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="subCategory">Sous-Catégorie:</label>
        <select id="subCategory" v-model="localForm.subCategoryId" required>
          <option disabled value="">Sélectionnez une sous-catégorie</option>
          <option v-for="subCat in subCategories" :key="subCat.id" :value="subCat.id">{{ subCat.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="localForm.description" required>
      </div>
      <div class="form-group">
        <label for="initialPrice">Prix initial:</label>
        <input type="number" id="initialPrice" v-model="localForm.initialPrice" required>
      </div>
      <div class="form-group">
        <button type="submit" :disabled="!isCustomerConnected" class="action-button">Ajouter</button>
      </div>
      <input type="hidden" v-model="localForm.appUserId">
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddItemComponent',
  props: {
    parentCategories: {
      type: Array,
      required: true
    },
    subCategories: {
      type: Array,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    isCustomerConnected: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      localForm: { ...this.form }
    };
  },
  methods: {
    handleSubmit() {
      if (!this.localForm.categoryId || !this.localForm.subCategoryId) {
        console.error('Catégorie ou sous-catégorie non sélectionnée');
        return;
      }

      const newItem = {
        name: this.localForm.name,
        categoryId: this.localForm.subCategoryId,
        description: this.localForm.description,
        initialPrice: this.localForm.initialPrice,
        appUserId: this.localForm.appUserId,
        lastBid : 0
      };

      this.$emit('add-item', newItem);
    },
    handleCategoryChange() {
      this.$emit('category-changed', this.localForm.categoryId);
    }
  },
  watch: {
    form: {
      handler(newForm) {
        this.localForm = { ...newForm };
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style scoped>
.add-item {
max-width: 600px;
margin: 50px auto 0;
padding: 20px;
background-color: #333;
color: #fff;
border-radius: 8px;
}
.add-item h1 {
text-align: center;
margin-bottom: 20px;
color: #42b983;
}
.form-group {
margin-bottom: 20px;
}
.form-group label {
display: block;
margin-bottom: 5px;
color: #42b983;
}
.form-group input,
.form-group select {
width: 100%;
padding: 8px;
box-sizing: border-box;
border-radius: 4px;
border: 1px solid #ccc;
background-color: #444;
color: #fff;
}
.form-group button {
display: block;
width: 100%;
padding: 10px;
background-color: #42b983;
color: #000;
border: none;
border-radius: 4px;
cursor: pointer;
}
.form-group button:hover {
background-color: #36a572;
}
.form-group button:disabled {
background-color: #ddd;
color: #aaa;
cursor: not-allowed;
}
</style>