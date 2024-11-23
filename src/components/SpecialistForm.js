import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SpecialistService from '../services/SpecialistService';

function SpecialistForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const initialSpecialistState = {
        id: null,
        firstName: "",
        lastName: "",
        specializations: []
    };

    const [specialist, setSpecialist] = useState(initialSpecialistState);
    const [submitted, setSubmitted] = useState(false);
    const [allSpecializations, setAllSpecializations] = useState([]);

    useEffect(() => {
        if (id) {
            SpecialistService.getSpecialistById(id)
                .then(response => {
                    setSpecialist(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        SpecialistService.getSpecializations()
            .then(response => {
                setAllSpecializations(response.data);
            })
            .catch(error => {
                console.error("Error fetching specializations:", error);
            });
    }, [id]);


    const handleInputChange = event => {
        const { name, value } = event.target;
        setSpecialist({ ...specialist, [name]: value });
    };

    const handleSpecializationChange = (event) => {
        const { value, checked } = event.target;
        const specializationId = parseInt(value, 10);
        let updatedSpecializations = []; // Start with an empty array
        
        console.log(allSpecializations);

        if (checked) {
            // Add only if checked
            const specialization = allSpecializations.find(spec => spec.id === specializationId);
            updatedSpecializations = [...specialist.specializations, specialization]; 
        } else {
            // Remove if unchecked
            updatedSpecializations = specialist.specializations.filter(spec => spec.id !== specializationId);
        }
    
        setSpecialist({ ...specialist, specializations: updatedSpecializations });
    };


    const saveSpecialist = () => {
        var data = {
            firstName: specialist.firstName,
            lastName: specialist.lastName,
            specializations: specialist.specializations.map(s => ({id: s.id})) 
        };
        console.log(data)
        console.log(data.specializations[0].id)
        console.log(data.specializations[0].id != null)

        if (id) {
            console.log("Ya zdesya")
            SpecialistService.updateSpecialist(data, id)
                .then(response => {
                    setSpecialist({ ...specialist, ...response.data });
                    setSubmitted(true);
                    navigate("/specialists");
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            console.log("Ya tyta")
            SpecialistService.createSpecialist(data)
                .then(response => {
                    setSpecialist({ ...specialist, ...response.data });
                    setSubmitted(true);
                    navigate("/specialists");
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const newSpecialist = () => {
        setSpecialist(initialSpecialistState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newSpecialist}>
                        Add
                    </button>
                </div>
            ) : (
                <Form>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            name="firstName"
                            value={specialist.firstName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            name="lastName"
                            value={specialist.lastName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="specializations">
                        <Form.Label>Specializations</Form.Label>
                        {allSpecializations.map(specialization => (
                            <Form.Check
                                key={specialization.id}
                                type="checkbox"
                                label={specialization.name}
                                value={specialization.id}
                                checked={specialist.specializations.some(s => s.id === specialization.id)}
                                onChange={handleSpecializationChange}
                            />
                        ))}


                    </Form.Group>

                    <Button variant="primary" onClick={saveSpecialist}>
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    );
}


export default SpecialistForm;