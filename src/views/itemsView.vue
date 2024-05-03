<template>
	<div class="home">
		<CategoryButton v-bind:categories="categories"></CategoryButton>
		<itemList v-bind:items="items"></itemList>
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
			categories: []
		};
	},
	methods: {
		async getItems() {
			try {
				const items = await itemServices.getItems(); // Assurez-vous que la méthode est async et utilise await
				this.items = items; // Stockez les données récupérées dans la data du composant
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des items: ",
					error
				); // Utilisez console.error pour les erreurs
			}
		},
		async getCategory() {
			try {
				const categories = await CategoryService.getCategory(); // Assurez-vous que la méthode est async et utilise await
				this.categories = categories; // Stockez les données récupérées dans la data du composant
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des items: ",
					error
				); // Utilisez console.error pour les erreurs
			}
		},
	},
	created() {
		this.getItems();
		this.getCategory();
	},
	
};
</script>
