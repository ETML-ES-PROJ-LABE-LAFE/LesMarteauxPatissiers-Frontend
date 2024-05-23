<template>
	<div class="home">
		<CategoryButton v-bind:categories="categories" @category-selected="onCategorySelected" @reset-Filter-Items="getItems"></CategoryButton>
		<itemList
			v-bind:categoryNameInFiltrer="categoryNameInFiltrer"
			v-bind:items="items"
			:currentPage="currentPage"
			:totalPages="totalPages"
			@page-changed="onPageChanged"
		></itemList>
	</div>
</template>

<script>
// @ is an alias to /src
import itemList from "@/components/itemList.vue";
import itemServices from "@/services/itemService.js";
import CategoryButton from "@/components/CategoryButton.vue";
import CategoryService from "@/services/CategoryService";

export default {
	name: "ItemView",
	components: {
		itemList,
		CategoryButton,
	},
	data() {
		return {
			items: [],
			categories: [],
			categoryNameInFiltrer: "",
			currentPage: 1,
			itemsPerPage: 50,
			totalPages: 1
		};
	},
	methods: {
		async getItems() {
			try {
				const response = await itemServices.getItems(this.currentPage, this.itemsPerPage);
				this.items = response; // Stockez les données récupérées dans la data du composant
				this.totalPages = Math.ceil(response.length / this.itemsPerPage);
				this.categoryNameInFiltrer = "";
			} catch (error) {
				console.error("Erreur lors de la récupération des items: ", error);
			}
		},
		async getCategory() {
			try {
				const categories = await CategoryService.getCategory();
				this.categories = categories;
			} catch (error) {
				console.error("Erreur lors de la récupération des catégories: ", error);
			}
		},
		async onCategorySelected(category) {
			try {
				const response = await itemServices.getItemsByCategory(category, this.currentPage, this.itemsPerPage);
				this.items = response; // Stockez les données récupérées dans la data du composant
				this.totalPages = Math.ceil(response.length / this.itemsPerPage);
				this.categoryNameInFiltrer = category;
			} catch (error) {
				console.error("Erreur lors de la récupération des items: ", error);
			}
		},
		onPageChanged(page) {
			this.currentPage = page;
			if (this.categoryNameInFiltrer) {
				this.onCategorySelected(this.categoryNameInFiltrer);
			} else {
				this.getItems();
			}
		}
	},
	created() {
		this.getItems();
		this.getCategory();
	},
};
</script>
