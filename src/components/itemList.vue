<template>
	<div class="container">
		<h1 class="text-center">Lots</h1>
		<table class="table table-striped">
			<thead>
				<th>Nom</th>
				<th>Catégorie</th>
				<th>Description</th>
				<th>Prix initial</th>
				<th>Prix actuel</th>
			</thead>
			<tbody>
				<tr v-for="item in items" v-bind:key="item.id">
					<td>{{ item.name }}</td>
					<td>{{ item.category }}</td>
					<td>{{ item.description }}</td>
					<td>{{ item.initial_price }}</td>
					<td>{{ item.last_bid }}</td>
				</tr>
			</tbody>
		</table>
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
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
