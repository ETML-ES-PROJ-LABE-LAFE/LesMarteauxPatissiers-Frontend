import axios from 'axios'
const API_URL = "http://localhost:3000/Category";

class CategoryService {
	async getCategory() {
		try {
			// Envoi de la requête
			const response = await axios.get(API_URL);

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
}
export default new CategoryService();