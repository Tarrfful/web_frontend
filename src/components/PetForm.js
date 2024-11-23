import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PetService from '../services/PetService';

function PetForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const initialPetState = {
        id: null,
        name: "",
        species: "",
        breed: "",
        owner: { id: null },
    };

    const [pet, setPet] = useState(initialPetState);
    const [submitted, setSubmitted] = useState(false);
    const [owners, setOwners] = useState([]); // Инициализация как пустого массива

    const handleInputChange = event => {
        const { name, value } = event.target;

        if (name === "owner") {
            setPet({ ...pet, owner: { id: parseInt(value, 10) } });
        } else {
            setPet({ ...pet, [name]: value });
        }
    };

    useEffect(() => {
        if (id) {
            PetService.getPetById(id)
                .then(response => {
                    setPet(response.data);
                })
                .catch(e => console.error("Error fetching pet by ID:", e));
        }
    }, [id]);

    useEffect(() => {
        retrieveOwners();
    }, []);

    const retrieveOwners = () => {
        PetService.getOwners()
            .then(response => {
                // Логируем ответ от сервера для анализа данных
                console.log("Owners response:", response.data); // Логируем данные
                console.table(response.data); // Логируем в виде таблицы
    
                // Проверяем, что данные — это массив
                if (Array.isArray(response.data)) {
                    setOwners(response.data); // Устанавливаем массив владельцев
                } else {
                    console.error("Expected an array of owners, but got:", response.data);
                    setOwners([]); // Если данные не массив — устанавливаем пустой массив
                }
            })
            .catch(e => {
                console.error("Error fetching owners:", e);
            });
    };
    

    const savePet = () => {
        const data = {
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            owner: { id: pet.owner.id },
        };

        if (id) {
            PetService.updatePet(data, id)
                .then(response => {
                    setPet(response.data);
                    setSubmitted(true);
                    navigate("/");
                })
                .catch(e => console.error("Error updating pet:", e));
        } else {
            PetService.createPet(data)
                .then(response => {
                    setPet(response.data);
                    setSubmitted(true);
                    navigate("/");
                })
                .catch(e => console.error("Error creating pet:", e));
        }
    };

    const newPet = () => {
        setPet(initialPetState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newPet}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={pet.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="species">Species</label>
                        <input
                            type="text"
                            className="form-control"
                            id="species"
                            required
                            value={pet.species}
                            onChange={handleInputChange}
                            name="species"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="breed">Breed</label>
                        <input
                            type="text"
                            className="form-control"
                            id="breed"
                            required
                            value={pet.breed}
                            onChange={handleInputChange}
                            name="breed"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="owner">Owner</label>
                        <select
                            name="owner"
                            value={pet.owner?.id || ""}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="" disabled>
                                Select an owner
                            </option>
                            {Array.isArray(owners) &&
                                owners.map(owner => (
                                    <option key={owner.id} value={owner.id}>
                                        {owner.firstName}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <button onClick={savePet} className="btn btn-success mt-3">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default PetForm;
