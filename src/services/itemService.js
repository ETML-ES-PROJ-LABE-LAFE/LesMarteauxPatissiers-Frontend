import axios from "axios";
//const API_URL = "http://localhost:3000/items";
const API_URL = "http://localhost:8080/items";

class itemService {
	async getItems(page = 1, itemsPerPage = 50) {
		try {
			// Envoi de la requête avec pagination
			const response = await axios.get(`${API_URL}?_page=${page}&_limit=${itemsPerPage}`);

			console.log(response.data);
			console.log(response.status);

			// Renvoi des données en format JSON
			return response.data;
		} catch (error) {
			throw new Error(
				`Erreur HTTP ${error.response.status}: ${error.response.data}`
			);
		}
	}

	async getItemsByCategory(category, page = 1, itemsPerPage = 50) {
		try {
			// Envoi de la requête avec pagination et catégorie
			const response = await axios.get(`${API_URL}?category=${category}&_page=${page}&_limit=${itemsPerPage}`);

			console.log(response.data);
			console.log(response.status);

			// Renvoi des données en format JSON
			return response.data;
		} catch (error) {
			throw new Error(
				`Erreur HTTP ${error.response.status}: ${error.response.data}`
			);
		}
	}

	async addItem(item) {
		try {
			const response = await axios.post(API_URL, item);
			return response.data;
		} catch (error) {
			throw new Error(
				`Erreur HTTP ${error.response.status}: ${error.response.data}`
			);
		}
	}
}

export default new itemService();
