import axios from 'axios';
const API_URL = "http://localhost:8080/api/auctions";

class AuctionsService {
    
    async addAuction(auction) {
        try {
            const response = await axios.post(API_URL, auction);
            return response.data;
        } catch (error) {
            throw new Error(
                `Erreur HTTP ${error.response.status}: ${error.response.data}`
            );
        }
    }
}

export default new AuctionsService();
