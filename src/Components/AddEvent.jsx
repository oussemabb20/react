import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useEventStore from '../ZustandStores/useEventStore';

function AddEvent() {
  const navigate = useNavigate();
  const { addEventAPI } = useEventStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    img: 'placeholder.jpg',
    price: 0,
    nbTickets: 0,
    nbParticipants: 0,
    like: false
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.name || !formData.description) {
      setError('Le nom et la description sont obligatoires');
      return;
    }

    try {
      setIsSubmitting(true);
      await addEventAPI({
        ...formData,
        price: Number(formData.price),
        nbTickets: Number(formData.nbTickets),
        nbParticipants: Number(formData.nbParticipants)
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'événement');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add a new Event to your Event List</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Événement ajouté avec succès ! Redirection...</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter a Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control
            type="number"
            name="nbTickets"
            value={formData.nbTickets}
            onChange={handleChange}
            min="0"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <div className="d-flex align-items-center gap-2">
            <Button variant="outline-secondary" size="sm">
              Browse...
            </Button>
            <span className="text-muted">No file selected.</span>
          </div>
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Ajout en cours...' : 'Add an Event'}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddEvent;
