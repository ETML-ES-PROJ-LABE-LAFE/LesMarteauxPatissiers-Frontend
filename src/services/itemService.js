import axios from "axios";
const API_URL = "http://localhost:8080/api/items";

class ItemService {
  async getItems(page = 1, itemsPerPage = 6) {
    try {
      // Envoi de la requête avec pagination
      const response = await axios.get(`${API_URL}?_page=${page}&_limit=${itemsPerPage}`);

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


      // Renvoi des données en format JSON
      return response.data;
    } catch (error) {
      throw new Error(
        `Erreur HTTP ${error.response.status}: ${error.response.data}`
      );
    }
  }

  async getAuctionByItemId(id) {
    try {
      // Envoi de la requête avec pagination
      const response = await axios.get(`${API_URL}/${id}/auction`);

      //permet de récupérer le premier élément du array retourné par le backend ..
      if (response.data && response.data.length > 0) {
        return response.data[0];
      } else {
        throw new Error('Aucune enchère trouvée pour cet item');
      }
      } catch (error) {
        throw new Error(
        `Erreur HTTP ${error.response.status}: ${error.response.data}`
      );
    }
  }

  async addItem(item) {
    try {
      const response = await axios.post(API_URL, item);
      console.log("PITIE" + response.data.id);
      return response.data;
     
    } catch (error) {
      throw new Error(
        `Erreur HTTP ${error.response.status}: ${error.response.data}`
      );
    }
  }
}

export default new ItemService();
