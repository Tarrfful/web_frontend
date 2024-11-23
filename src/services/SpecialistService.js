// src/services/SpecialistService.js
import axios from 'axios';

const API_BASE_URL = '/api/specialists';

class SpecialistService {
    getAllSpecialists() {
        return axios.get(API_BASE_URL);
    }

    createSpecialist(specialist) {
        return axios.post(API_BASE_URL, specialist);
    }

    getSpecialistById(specialistId) {
        return axios.get(`${API_BASE_URL}/${specialistId}`);
    }

    updateSpecialist(specialist, specialistId) {
        return axios.put(`${API_BASE_URL}/${specialistId}`, specialist);
    }

    deleteSpecialist(specialistId) {
        return axios.delete(`${API_BASE_URL}/${specialistId}`);
    }

    getSpecializations() {
        return axios.get('/api/specializations');
    }
}

const specialistService = new SpecialistService();
export default specialistService;