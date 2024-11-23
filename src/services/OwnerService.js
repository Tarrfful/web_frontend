// src/services/OwnerService.js
import axios from 'axios';

const API_BASE_URL = '/api/owners';

class OwnerService {
    getAllOwners() {
        return axios.get(API_BASE_URL);
    }

    createOwner(owner) {
        return axios.post(API_BASE_URL, owner);
    }

    getOwnerById(ownerId) {
        return axios.get(`${API_BASE_URL}/${ownerId}`);
    }

    updateOwner(owner, ownerId) {
        return axios.put(`${API_BASE_URL}/${ownerId}`, owner);
    }

    deleteOwner(ownerId) {
        return axios.delete(`${API_BASE_URL}/${ownerId}`);
    }
}

const ownerService = new OwnerService();
export default ownerService;