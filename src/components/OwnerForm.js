import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import OwnerService from '../services/OwnerService';

function OwnerForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialOwnerState = {
    id: null,
    firstName: "",
    lastName: "",
    phone: "",
    address: ""
  };

  const [owner, setOwner] = useState(initialOwnerState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      OwnerService.getOwnerById(id)
        .then(response => {
          setOwner(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setOwner({ ...owner, [name]: value });
  };

  const saveOwner = () => {
    var data = {
      firstName: owner.firstName,
      lastName: owner.lastName,
      phone: owner.phone,
      address: owner.address
    };

    if (id) {
      OwnerService.updateOwner(data, id)
        .then(response => {
          setOwner({ ...owner, ...response.data });
          setSubmitted(true);
          navigate("/owners");
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      OwnerService.createOwner(data)
        .then(response => {
          setOwner({ ...owner, ...response.data });
          setSubmitted(true);
          navigate("/owners");
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const newOwner = () => {
    setOwner(initialOwnerState);
    setSubmitted(false);
  };


  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newOwner}>
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
                value={owner.firstName}
                onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={owner.lastName}
                onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter phone"
                name="phone"
                value={owner.phone}
                onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={owner.address}
                onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={saveOwner}>  {/* Изменено на onClick */}
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default OwnerForm;