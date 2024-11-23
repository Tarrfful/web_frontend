// src/components/SpecializationForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SpecializationService from '../services/SpecializationService';

function SpecializationForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialSpecializationState = {
    id: null,
    name: ""
  };

  const [specialization, setSpecialization] = useState(initialSpecializationState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      SpecializationService.getSpecializationById(id)
        .then(response => {
          setSpecialization(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSpecialization({ ...specialization, [name]: value });
  };

  const saveSpecialization = () => {
    var data = {
      name: specialization.name
    };

    if (id) {
      SpecializationService.updateSpecialization(data, id)
        .then(response => {
          setSpecialization({ ...specialization, ...response.data });
          setSubmitted(true);
          navigate("/specializations");
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      SpecializationService.createSpecialization(data)
        .then(response => {
          setSpecialization({ ...specialization, ...response.data });
          setSubmitted(true);
          navigate("/specializations");
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const newSpecialization = () => {
    setSpecialization(initialSpecializationState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newSpecialization}>
            Add
          </button>
        </div>
      ) : (
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={specialization.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={saveSpecialization}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default SpecializationForm;