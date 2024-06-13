import axios from 'axios';
const API_URL = "http://localhost:8080/api/bids";

class BidService {
    
    async addBid(bid) {
        try {
            const response = await axios.post(API_URL, bid); // Utiliser POST au lieu de GET
            return response.data;
        } catch (error) {
            throw new Error(
                `Erreur HTTP ${error.response.status}: ${error.response.data}`
            );
        }
    }
}

export default new BidService();
