import axios from 'axios';
const API_URL = "http://localhost:8080/api/categories";

class CategoryService {
	async getCategory() {
		try {
			const response = await axios.get(API_URL);
			return response.data;
		} catch (error) {
			throw new Error(
				`Erreur HTTP ${error.response.status}: ${error.response.data}`
			);
		}
	}

	async getParentCategories() {
		try {
			const categories = await this.getCategory();
			console.log(categories);
			return categories.filter(category => category.parentCategoryId === null);
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération des catégories parentes: ${error.message}`
			);
		}
	}

	async getSubCategories(categoryId) {
		try {
			const response = await axios.get(
				`${API_URL}/${categoryId}/subcategories`
			);
			return response.data;
		} catch (error) {
			throw new Error(
				`Erreur HTTP ${error.response.status}: ${error.response.data}`
			);
		}
	}

	async getCategoryById(categoryId) {
		try {
		const response = await axios.get(`${API_URL}/${categoryId}`);
		return response.data;
		} catch (error) {
		throw new Error(
			`Erreur HTTP ${error.response.status}: ${error.response.data}`
		);
		}
	}
}

export default new CategoryService();

