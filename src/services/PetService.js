import axios from 'axios';

const API_BASE_URL = '/api/pets'; // Базовый URL для запросов к backend'у
const OWNERS_API_BASE_URL = '/api/owners'

class PetService {
    getAllPets() {
        return axios.get(API_BASE_URL);
    }

    createPet(pet) {
        return axios.post(API_BASE_URL, pet);
    }

    getPetById(petId) {
        return axios.get(`${API_BASE_URL}/${petId}`);
    }

    updatePet(pet, petId) {
        return axios.put(`${API_BASE_URL}/${petId}`, pet);
    }

    deletePet(petId) {
        return axios.delete(`${API_BASE_URL}/${petId}`);
    }
    getOwners(){
        return axios.get(OWNERS_API_BASE_URL)
    }

}


const petService = new PetService(); // Создание экземпляра сервиса

export default petService;