import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PetService from '../services/PetService';
import { Table, Button } from 'react-bootstrap';

function PetList() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        retrievePets();
    }, []);


    const retrievePets = () => {
        PetService.getAllPets()
            .then(response => {
                setPets(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const deletePet = (petId) => {
        PetService.deletePet(petId)
            .then(response => {
                console.log(response.data);
                retrievePets(); // Обновляем список после удаления
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <Link to="/add-pet">
                <Button variant="primary" className="mb-3">
                    Add Pet
                </Button>
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Breed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map(pet => (
                        <tr key={pet.id}>
                            <td>{pet.name}</td>
                            <td>{pet.species}</td>
                            <td>{pet.breed}</td>
                            <td>
                                <Link to={`/pets/${pet.id}`}>
                                    <Button variant="info" size="sm" className="me-2">
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="danger" size="sm" onClick={() => deletePet(pet.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default PetList;