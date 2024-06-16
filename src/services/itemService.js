import axios from "axios";
const API_URL = "http://localhost:8080/api/items";

class ItemService {
  async getItems(page = 1, itemsPerPage = 6) {
    try {
      const response = await axios.get(`${API_URL}?_page=${page}&_limit=${itemsPerPage}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Erreur HTTP ${error.response.status}: ${error.response.data}`
      );
    }
  }

  async getItemById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Erreur HTTP ${error.response.status}: ${error.response.data}`
      );
    }
  }

  async getAuctionByItemId(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}/auction`);

      if (response.status === 204) {
        return null;
      }

      if (response.data && response.data.length > 0) {
        return response.data[0];
      } else {
        throw new Error('Aucune enchère trouvée pour cet item');
      }
    } catch (error) {
      if (error.response && error.response.status === 204) {
        return null;
      }
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
