<template>
  <div class="add-item">
    <h1>Ajout d'un nouveau lot</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group" :class="{ 'has-error': errors.name }">
        <label for="name">Nom: <span class="required">*</span></label>
        <input type="text" id="name" v-model="localForm.name" required>
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.categoryId }">
        <label for="category">Catégorie: <span class="required">*</span></label>
        <select id="category" v-model="localForm.categoryId" @change="handleCategoryChange" required>
          <option disabled value="">Sélectionnez une catégorie</option>
          <option v-for="cat in parentCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <span v-if="errors.categoryId" class="error-message">{{ errors.categoryId }}</span>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.subCategoryId }">
        <label for="subCategory">Sous-Catégorie: <span class="required">*</span></label>
        <select id="subCategory" v-model="localForm.subCategoryId" required>
          <option disabled value="">Sélectionnez une sous-catégorie</option>
          <option v-for="subCat in subCategories" :key="subCat.id" :value="subCat.id">{{ subCat.name }}</option>
        </select>
        <span v-if="errors.subCategoryId" class="error-message">{{ errors.subCategoryId }}</span>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.description }">
        <label for="description">Description: <span class="required">*</span></label>
        <input type="text" id="description" v-model="localForm.description" required>
        <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.initialPrice }">
        <label for="initialPrice">Prix initial: <span class="required">*</span></label>
        <input type="number" id="initialPrice" v-model="localForm.initialPrice" min="0" required>
        <span v-if="errors.initialPrice" class="error-message">{{ errors.initialPrice }}</span>
      </div>
      <div class="form-group">
        <button type="submit" :disabled="!isCustomerConnected" class="action-button" :class="{ 'disabled-button': !isCustomerConnected }">Ajouter</button>
      </div>
      <input type="hidden" v-model="localForm.appUserId">
    </form>
  </div>
</template>


<script>
export default {
  name: 'AddItem',
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
      localForm: { ...this.form },
      errors: {}
    };
  },
  methods: {
    handleSubmit() {
      this.errors = this.validateForm();

      if (Object.keys(this.errors).length > 0) {
        console.error('Formulaire invalide', this.errors);
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
    },
    validateForm() {
      const errors = {};
      if (!this.localForm.name) errors.name = 'Le nom est requis.';
      if (!this.localForm.categoryId) errors.categoryId = 'La catégorie est requise.';
      if (!this.localForm.subCategoryId) errors.subCategoryId = 'La sous-catégorie est requise.';
      if (!this.localForm.description) errors.description = 'La description est requise.';
      if (this.localForm.initialPrice === '' || this.localForm.initialPrice < 0) errors.initialPrice = 'Le prix initial doit être un nombre positif.';
      return errors;
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
.action-button.disabled-button {
  background-color: #ddd;
  color: #aaa;
  cursor: not-allowed;
}
.required {
  color: red;
}
.has-error input,
.has-error select {
  border-color: red;
}
.error-message {
  color: red;
  font-size: 0.875em;
}
</style>

