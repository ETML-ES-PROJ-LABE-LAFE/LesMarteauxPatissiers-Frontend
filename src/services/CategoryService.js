import axios from 'axios';
const API_URL = "http://localhost:8080/api/categories";

class CategoryService {
  async getCategory() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur HTTP ${error.response.status}: ${error.response.data}`);
    }
  }

  async getSubCategories(categoryId) {
    try {
      const response = await axios.get(`${API_URL}/${categoryId}/subcategories`);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur HTTP ${error.response.status}: ${error.response.data}`);
    }
  }
}

export default new CategoryService();
