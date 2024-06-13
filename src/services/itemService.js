import axios from "axios";
const API_URL = "http://localhost:8080/api/items";

class ItemService {
  async getItems(page = 1, itemsPerPage = 6) {
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

  async getItemById(id) {
    try {
      // Envoi de la requête avec pagination
      const response = await axios.get(`${API_URL}/${id}`);

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

export default new ItemService();
